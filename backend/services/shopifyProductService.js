
import axios from "axios";
import Product from "../models/Product.js";

export const fetchShopifyProducts = async () => {
  try {
    const SHOP = process.env.SHOPIFY_STORE;
    const TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
    const API_VERSION = "2025-07";

    if (!SHOP || !TOKEN) {
      throw new Error("Shopify store or access token is missing.");
    }

    const GRAPHQL_URL =
      `https://${SHOP}/admin/api/${API_VERSION}/graphql.json`;

    let products = [];
    let hasNextPage = true;
    let cursor = null;

    console.log("====================================");
    console.log("STARTING SHOPIFY PRODUCT SYNC");
    console.log("====================================");

    // ==========================================
    // 1. FETCH ALL SHOPIFY PRODUCTS
    // ==========================================

    while (hasNextPage) {
      const query = `
        query GetProducts($first: Int!, $after: String) {
          products(first: $first, after: $after) {
            edges {
              node {
                id
                title
                status
                vendor

                category {
                  id
                  name
                  fullName
                }

                variants(first: 250) {
                  edges {
                    node {
                      id
                      title
                      sku
                      price
                      compareAtPrice
                    }
                  }
                }
              }
            }

            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;

      const response = await axios.post(
        GRAPHQL_URL,
        {
          query,
          variables: {
            first: 250,
            after: cursor,
          },
        },
        {
          headers: {
            "X-Shopify-Access-Token": TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.errors?.length) {
        throw new Error(
          JSON.stringify(response.data.errors)
        );
      }

      const result = response.data.data.products;

      const fetchedProducts = result.edges.map(
        (edge) => edge.node
      );

      products = [...products, ...fetchedProducts];

      console.log(
        `Fetched Shopify products: ${products.length}`
      );

      hasNextPage = result.pageInfo.hasNextPage;
      cursor = result.pageInfo.endCursor;
    }

    // ==========================================
    // 2. INITIALIZE COUNTERS
    // ==========================================

    let updatedCount = 0;
    let importedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    let totalVariants = 0;

    // Prevent one old MongoDB record from being
    // assigned to multiple Shopify variants.
    const claimedLegacyIds = new Set();

    const normalizeTitle = (title) =>
      title?.trim().toLowerCase().replace(/\s+/g, " ") || "";

    const escapeRegex = (value) =>
      value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // ==========================================
    // 3. PROCESS EVERY PRODUCT AND EVERY VARIANT
    // ==========================================

    for (const product of products) {
      const variants = product.variants?.edges || [];

      if (variants.length === 0) {
        console.log(
          `SKIPPED: No variants found for ${product.title}`
        );
        skippedCount++;
        continue;
      }

      for (const variantEdge of variants) {
        const variant = variantEdge.node;

        totalVariants++;

        try {
          const shopifyProductId = product.id;
          const shopifyVariantId = variant.id;

          const sku =
            variant.sku?.trim() ||
            `SHOPIFY-${shopifyVariantId}`;

          const status =
            product.status?.toLowerCase() || "unknown";

          const category =
            product.category?.name || "Uncategorized";

          // ======================================
          // 4. PREPARE VARIANT DATA
          // ======================================

          const productData = {
            productName: product.title,
            sku,
            status,
            category,
            vendor: product.vendor || "",
            price: Number(variant.price || 0),
            comparePrice: Number(
              variant.compareAtPrice || 0
            ),

            shopifyProductId,
            shopifyVariantId,
            variantTitle: variant.title || "",
            source: "Shopify",
          };

          // ======================================
          // 5. MATCH USING SHOPIFY VARIANT ID
          // ======================================

          let existingProduct = await Product.findOne({
            shopifyVariantId,
          });

          let isLegacyMatch = false;

          // ======================================
          // 6. MIGRATE OLD MONGODB RECORDS
          // ======================================

          if (!existingProduct) {
            const normalizedTitle =
              normalizeTitle(product.title);

            const titlePattern = normalizedTitle
              .split(" ")
              .map(escapeRegex)
              .join("\\s+");

            const legacyMatches = await Product.find({
              productName: {
                $regex: `^\\s*${titlePattern}\\s*$`,
                $options: "i",
              },

              sku,

              $or: [
                { shopifyVariantId: { $exists: false } },
                { shopifyVariantId: null },
                { shopifyVariantId: "" },
              ],
            }).limit(2);

            if (legacyMatches.length > 1) {
              console.error(
                `AMBIGUOUS LEGACY MATCH: ${product.title} | SKU: ${sku}`
              );

              skippedCount++;
              continue;
            }

            if (legacyMatches.length === 1) {
              existingProduct = legacyMatches[0];
              isLegacyMatch = true;
            }
          }

          // ======================================
          // 7. UPDATE EXISTING VARIANT
          // ======================================

          if (existingProduct) {
            const mongoId =
              existingProduct._id.toString();

            // Only apply this check to old records
            // that have not yet been assigned a variant ID.
            if (isLegacyMatch) {
              if (claimedLegacyIds.has(mongoId)) {
                console.error(
                  `LEGACY RECORD ALREADY MATCHED: ${product.title} | ${sku}`
                );

                skippedCount++;
                continue;
              }

              claimedLegacyIds.add(mongoId);
            }

            await Product.updateOne(
              {
                _id: existingProduct._id,
              },
              {
                $set: productData,
              },
              {
                runValidators: true,
              }
            );

            updatedCount++;

            console.log(
              `UPDATED: ${product.title} | Variant: ${variant.title} | SKU: ${sku}`
            );

          } else {
            // ======================================
            // 8. IMPORT NEW VARIANT OR FREE GIFT
            // ======================================

            await Product.findOneAndUpdate(
              {
                shopifyVariantId,
              },
              {
                $set: productData,

                $setOnInsert: {
                  warehouseStock: {
                    shopify: 0,
                    hyderabad: 0,
                    nalgonda: 0,
                    warehouseOne: 0,
                    warehouseTwo: 0,
                  },
                },
              },
              {
                upsert: true,
                new: true,
                runValidators: true,
                setDefaultsOnInsert: true,
              }
            );

            importedCount++;

            console.log(
              `IMPORTED: ${product.title} | Variant: ${variant.title} | SKU: ${sku}`
            );
          }

        } catch (variantError) {
          errorCount++;

          console.error(
            "========== VARIANT SYNC ERROR =========="
          );

          console.error(`Product: ${product.title}`);
          console.error(`Variant: ${variant.title}`);
          console.error(variantError.message);

          console.error(
            "========================================="
          );

          continue;
        }
      }
    }

    // ==========================================
    // 9. FINAL DATABASE COUNTS
    // ==========================================

    const totalShopifyRecords =
      await Product.countDocuments({
        source: "Shopify",
      });

    const totalMongoProducts =
      await Product.countDocuments();

    // ==========================================
    // 10. FINAL SYNC SUMMARY
    // ==========================================

    console.log("====================================");
    console.log("SHOPIFY PRODUCT SYNC COMPLETED");
    console.log("====================================");

    console.log(`Shopify Products: ${products.length}`);
    console.log(`Shopify Variants: ${totalVariants}`);

    console.log("------------------------------------");

    console.log(`Updated Records: ${updatedCount}`);
    console.log(`New Records: ${importedCount}`);
    console.log(`Skipped Records: ${skippedCount}`);
    console.log(`Failed Records: ${errorCount}`);

    console.log("------------------------------------");

    console.log(
      `Shopify Records in MongoDB: ${totalShopifyRecords}`
    );

    console.log(
      `Total MongoDB Product Records: ${totalMongoProducts}`
    );

    console.log("====================================");

    return products;

  } catch (error) {
    console.error(
      "========== SHOPIFY PRODUCT SYNC ERROR =========="
    );

    console.error(
      error.response?.data || error.message
    );

    console.error(
      "================================================="
    );

    throw error;
  }
};




















// import axios from "axios";
// import Product from "../models/Product.js";

// export const fetchShopifyProducts = async () => {
//   try {
//     const SHOP = process.env.SHOPIFY_STORE;
//     const TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
//     const API_VERSION = "2025-07";

//     const GRAPHQL_URL = `https://${SHOP}/admin/api/${API_VERSION}/graphql.json`;

//     let products = [];
//     let hasNextPage = true;
//     let cursor = null;

//     console.log("====================================");
//     console.log("Starting Shopify Product Import");
//     console.log("====================================");

//     // 1. FETCH ALL SHOPIFY PRODUCTS

//     while (hasNextPage) {
//       const query = `
//         query GetProducts($first: Int!, $after: String) {
//           products(first: $first, after: $after) {
//             edges {
//               node {
//                 id
//                 title
//                 status
//                 vendor

//                 category {
//                   id
//                   name
//                   fullName
//                 }

//                 variants(first: 250) {
//                   edges {
//                     node {
//                       id
//                       sku
//                       price
//                       compareAtPrice
//                     }
//                   }
//                 }
//               }
//             }

//             pageInfo {
//               hasNextPage
//               endCursor
//             }
//           }
//         }
//       `;

//       const response = await axios.post(
//         GRAPHQL_URL,
//         {
//           query,
//           variables: {
//             first: 250,
//             after: cursor,
//           },
//         },
//         {
//           headers: {
//             "X-Shopify-Access-Token": TOKEN,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.errors?.length) {
//         throw new Error(JSON.stringify(response.data.errors));
//       }

//       const result = response.data.data.products;

//       const fetchedProducts = result.edges.map(
//         (edge) => edge.node
//       );

//       products = [...products, ...fetchedProducts];

//       console.log(
//         `Fetched ${fetchedProducts.length} products. Total: ${products.length}`
//       );

//       hasNextPage = result.pageInfo.hasNextPage;
//       cursor = result.pageInfo.endCursor;
//     }

//     console.log("====================================");
//     console.log(`Total Shopify Products: ${products.length}`);
//     console.log("====================================");

//     // 2. SAVE / UPDATE PRODUCTS IN MONGODB

//     let updatedCount = 0;
//     let importedCount = 0;
//     let skippedCount = 0;
//     let errorCount = 0;

//     // Tracks distinct MongoDB documents matched
//     const processedMongoIds = new Map();

//     // Normalize product titles
//     const normalizeTitle = (title) =>
//       title?.trim().toLowerCase().replace(/\s+/g, " ") || "";

//     // Escape special regex characters
//     const escapeRegex = (value) =>
//       value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

//     // 3. PROCESS EACH SHOPIFY PRODUCT

//     for (const product of products) {
//       try {
//         const variant = product.variants?.edges?.[0]?.node;

//         const sku =
//           variant?.sku?.trim() ||
//           `SHOPIFY-${variant?.id || product.id}`;

//         const status = product.status?.toLowerCase() || "unknown";

//         const category =
//           product.category?.name || "Uncategorized";

//         const productData = {
//           productName: product.title,
//           sku,
//           status,
//           category,
//           vendor: product.vendor || "",
//           price: Number(variant?.price || 0),
//           comparePrice: Number(variant?.compareAtPrice || 0),
//         };

//         // 4. FIND PRODUCT BY TITLE

//         const normalizedTitle = normalizeTitle(product.title);

//         const titlePattern = normalizedTitle
//           .split(" ")
//           .map(escapeRegex)
//           .join("\\s+");

//         const matchingProducts = await Product.find({
//           productName: {
//             $regex: `^\\s*${titlePattern}\\s*$`,
//             $options: "i",
//           },
//         });

//         // 5. FIND PRODUCT BY SKU

//         const skuOwner = await Product.findOne({ sku });

//         // 6. CHECK DUPLICATE TITLES

//         if (matchingProducts.length > 1) {
//           console.error(
//             `SKIPPED: Multiple MongoDB products found with title "${product.title}"`
//           );

//           skippedCount++;
//           continue;
//         }

//         let existingProduct = null;

//         if (matchingProducts.length === 1) {
//           existingProduct = matchingProducts[0];

//           // Check whether SKU belongs to another document
//           if (
//             skuOwner &&
//             skuOwner._id.toString() !== existingProduct._id.toString()
//           ) {
//             console.error("====================================");
//             console.error("SKU CONFLICT!");
//             console.error(`Shopify Product: ${product.title}`);
//             console.error(`Shopify SKU: ${sku}`);
//             console.error(`Existing SKU Owner: ${skuOwner.productName}`);
//             console.error(`MongoDB ID: ${skuOwner._id}`);
//             console.error("====================================");

//             skippedCount++;
//             continue;
//           }
//         } else if (skuOwner) {
//           // Title may have changed, but SKU identifies the existing document
//           existingProduct = skuOwner;
//         }

//         // 7. UPDATE EXISTING PRODUCT

//         if (existingProduct) {
//           const mongoId = existingProduct._id.toString();

//           // Detect if another Shopify product matched the same MongoDB document
//           if (processedMongoIds.has(mongoId)) {
//             console.error("====================================");
//             console.error("DUPLICATE MONGODB DOCUMENT MATCH!");
//             console.error(`Current Shopify Product: ${product.title}`);
//             console.error(`Current Shopify SKU: ${sku}`);

//             console.error(
//               `Previous Shopify Product: ${processedMongoIds.get(mongoId).title}`
//             );

//             console.error(
//               `Previous Shopify SKU: ${processedMongoIds.get(mongoId).sku}`
//             );

//             console.error(`MongoDB Document ID: ${mongoId}`);
//             console.error("====================================");

//             skippedCount++;
//             continue;
//           }

//           processedMongoIds.set(mongoId, {
//             title: product.title,
//             sku,
//           });

//           await Product.updateOne(
//             { _id: existingProduct._id },
//             {
//               $set: productData,
//             },
//             {
//               runValidators: true,
//             }
//           );

//           updatedCount++;

//           console.log(
//             `UPDATED: ${product.title} | SKU: ${sku} | Status: ${status} | Category: ${category}`
//           );

//         } else {
//           // 8. IMPORT NEW PRODUCT

//           await Product.create({
//             ...productData,

//             warehouseStock: {
//               shopify: 0,
//               hyderabad: 0,
//               nalgonda: 0,
//               warehouseOne: 0,
//               warehouseTwo: 0,
//             },
//           });

//           importedCount++;

//           console.log(
//             `IMPORTED: ${product.title} | SKU: ${sku} | Status: ${status} | Category: ${category}`
//           );
//         }

//       } catch (productError) {
//         errorCount++;

//         console.error("========== PRODUCT ERROR ==========");
//         console.error(`Product: ${product.title}`);
//         console.error(productError.message);
//         console.error("====================================");

//         // Continue with the next product
//         continue;
//       }
//     }

//     // 9. FINAL SYNC SUMMARY

//     const totalMongoProducts = await Product.countDocuments();

//     console.log("====================================");
//     console.log("SHOPIFY PRODUCT SYNC COMPLETED");
//     console.log("====================================");

//     console.log(`Shopify Products Fetched: ${products.length}`);
//     console.log(`Updated Products: ${updatedCount}`);
//     console.log(`New Products: ${importedCount}`);
//     console.log(`Skipped Products: ${skippedCount}`);
//     console.log(`Failed Products: ${errorCount}`);

//     console.log("------------------------------------");

//     console.log(
//       `Unique MongoDB Documents Matched: ${processedMongoIds.size}`
//     );

//     console.log(
//       `Total MongoDB Documents: ${totalMongoProducts}`
//     );

//     console.log("====================================");

//     return products;

//   } catch (error) {
//     console.log("========== SHOPIFY PRODUCT SYNC ERROR ==========");

//     console.log(
//       error.response?.data || error.message
//     );

//     console.log("=================================================");

//     throw error;
//   }
// };






























// import axios from "axios";
// import Product from "../models/Product.js";

// export const fetchShopifyProducts = async () => {
//   try {
//     const SHOP = process.env.SHOPIFY_STORE;
//     const TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
//     const API_VERSION = "2025-07";

//     const GRAPHQL_URL = `https://${SHOP}/admin/api/${API_VERSION}/graphql.json`;

//     let products = [];
//     let hasNextPage = true;
//     let cursor = null;

//     console.log("====================================");
//     console.log("Starting Shopify Product Import");
//     console.log("====================================");

//     // FETCH ALL PRODUCTS USING GRAPHQL

//     while (hasNextPage) {
//       const query = `
//         query GetProducts($first: Int!, $after: String) {
//           products(first: $first, after: $after) {
//             edges {
//               node {
//                 id
//                 title
//                 status
//                 vendor

//                 category {
//                   id
//                   name
//                   fullName
//                 }

//                 variants(first: 1) {
//                   edges {
//                     node {
//                       id
//                       sku
//                       price
//                       compareAtPrice
//                     }
//                   }
//                 }
//               }
//             }

//             pageInfo {
//               hasNextPage
//               endCursor
//             }
//           }
//         }
//       `;

//       const response = await axios.post(
//         GRAPHQL_URL,
//         {
//           query,
//           variables: {
//             first: 250,
//             after: cursor,
//           },
//         },
//         {
//           headers: {
//             "X-Shopify-Access-Token": TOKEN,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.errors?.length) {
//         throw new Error(
//           JSON.stringify(response.data.errors)
//         );
//       }

//       const result = response.data.data.products;

//       const fetchedProducts = result.edges.map(
//         (edge) => edge.node
//       );

//       products = [...products, ...fetchedProducts];

//       console.log(
//         `Fetched ${fetchedProducts.length} products. Total: ${products.length}`
//       );

//       hasNextPage = result.pageInfo.hasNextPage;
//       cursor = result.pageInfo.endCursor;
//     }

//     console.log("====================================");
//     console.log(`Total Shopify Products: ${products.length}`);
//     console.log("====================================");

//     // SAVE / UPDATE PRODUCTS IN MONGODB

//     // SAVE / UPDATE PRODUCTS IN MONGODB

//     let updatedCount = 0;
//     let importedCount = 0;
//     let skippedCount = 0;
//     let errorCount = 0;
//     const processedMongoIds = new Map();
//     // Normalize product titles
//     const normalizeTitle = (title) =>
//       title?.trim().toLowerCase().replace(/\s+/g, " ") || "";

//     // Escape special regex characters
//     const escapeRegex = (value) =>
//       value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

//     for (const product of products) {
//       try {
//         const variant = product.variants?.edges?.[0]?.node;

//         const sku =
//           variant?.sku?.trim() ||
//           `SHOPIFY-${variant?.id || product.id}`;

//         const status = product.status?.toLowerCase() || "unknown";

//         const category =
//           product.category?.name || "Uncategorized";

//         const productData = {
//           productName: product.title,
//           sku,
//           status,
//           category,
//           vendor: product.vendor || "",
//           price: Number(variant?.price || 0),
//           comparePrice: Number(variant?.compareAtPrice || 0),
//         };

//         // 1. Find product by normalized title
//         const normalizedTitle = normalizeTitle(product.title);

//         const titlePattern = normalizedTitle
//           .split(" ")
//           .map(escapeRegex)
//           .join("\\s+");

//         const matchingProducts = await Product.find({
//           productName: {
//             $regex: `^\\s*${titlePattern}\\s*$`,
//             $options: "i",
//           },
//         });

//         // 2. Find document that currently owns this SKU
//         const skuOwner = await Product.findOne({ sku });

//         // 3. More than one title match: skip safely
//         if (matchingProducts.length > 1) {
//           console.log(
//             `SKIPPED: Multiple products have the title "${product.title}"`
//           );

//           skippedCount++;
//           continue;
//         }

//         let existingProduct = null;

//         if (matchingProducts.length === 1) {
//           existingProduct = matchingProducts[0];

//           // SKU belongs to a different document
//           if (
//             skuOwner &&
//             skuOwner._id.toString() !== existingProduct._id.toString()
//           ) {
//             console.error(
//               `SKU CONFLICT: ${sku} already belongs to "${skuOwner.productName}". ` +
//               `Skipping "${product.title}".`
//             );

//             skippedCount++;
//             continue;
//           }
//         } else if (skuOwner) {
//           // Title may have changed, but SKU identifies an existing document
//           existingProduct = skuOwner;
//         }

//         // 4. Update existing product
//         // 4. Update existing product

//         // 4. Update existing product
//         if (existingProduct) {
//           const mongoId = existingProduct._id.toString();

//           // Detect multiple Shopify products matching one MongoDB document
//           if (processedMongoIds.has(mongoId)) {
//             console.error("====================================");
//             console.error("DUPLICATE MONGODB DOCUMENT MATCH!");
//             console.error(`Current Shopify Product: ${product.title}`);
//             console.error(`Current Shopify SKU: ${sku}`);
//             console.error(
//               `Previous Shopify Product: ${processedMongoIds.get(mongoId).title}`
//             );
//             console.error(
//               `Previous Shopify SKU: ${processedMongoIds.get(mongoId).sku}`
//             );
//             console.error(`MongoDB Document ID: ${mongoId}`);
//             console.error("====================================");

//             skippedCount++;
//             continue;
//           }

//           processedMongoIds.set(mongoId, {
//             title: product.title,
//             sku,
//           });

//           // Update existing MongoDB product
//           await Product.updateOne(
//             { _id: existingProduct._id },
//             {
//               $set: productData,
//             },
//             {
//               runValidators: true,
//             }
//           );

//           updatedCount++;

//           console.log(
//             `UPDATED: ${product.title} | SKU: ${sku} | Status: ${status}`
//           );

//         } else {
//           // 5. Import only if neither title nor SKU exists
//           await Product.create({
//             ...productData,
//             warehouseStock: {
//               shopify: 0,
//               hyderabad: 0,
//               nalgonda: 0,
//               warehouseOne: 0,
//               warehouseTwo: 0,
//             },
//           });

//           importedCount++;

//           console.log(
//             `IMPORTED: ${product.title} | SKU: ${sku} | Status: ${status}`
//           );
//         }


//         console.log("====================================");
//         console.log("SHOPIFY PRODUCT SYNC COMPLETED");
//         console.log(`Total Products: ${products.length}`);
//         console.log(`Updated Products: ${updatedCount}`);
//         console.log(`New Products: ${importedCount}`);
//         console.log(`Skipped Products: ${skippedCount}`);
//         console.log(`Failed Products: ${errorCount}`);
//         console.log("====================================");


//         return products;

//       } catch (error) {
//         console.log("========== PRODUCT SYNC ERROR ==========");

//         console.log(
//           error.response?.data || error.message
//         );

//         console.log("========================================");

//         throw error;
//       }
//     };


// export const fetchShopifyProducts = async () => {
//   try {
//     const SHOP = process.env.SHOPIFY_STORE;
//     const TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
//     const API_VERSION = "2025-07";

//     let products = [];
//     let pageInfo = null;

//     console.log("====================================");
//     console.log("Starting Shopify Product Import");
//     console.log("====================================");

//     do {
//       const params = {
//         limit: 250,
//       };

//       if (pageInfo) {
//         params.page_info = pageInfo;
//       }

//       const response = await axios.get(
//         `https://${SHOP}/admin/api/${API_VERSION}/products.json`,
//         {
//           headers: {
//             "X-Shopify-Access-Token": TOKEN,
//             "Content-Type": "application/json",
//           },
//           params,
//         }
//       );

//       const fetchedProducts = response.data.products;

//       products = [...products, ...fetchedProducts];

//       console.log(
//         `Fetched ${fetchedProducts.length} products. Total: ${products.length}`
//       );

//       // Check Shopify pagination
//       const linkHeader = response.headers.link;

//       pageInfo = null;

//       if (linkHeader) {
//         const nextLink = linkHeader
//           .split(",")
//           .find((link) => link.includes('rel="next"'));

//         if (nextLink) {
//           const match = nextLink.match(/page_info=([^&>]+)/);

//           if (match) {
//             pageInfo = match[1];
//           }
//         }
//       }

//     } while (pageInfo);

//     console.log("====================================");
//     console.log(`Total Shopify Products: ${products.length}`);
//     console.log("====================================");


//     // Save products into MongoDB

//     for (const product of products) {

//       const variant = product.variants?.[0];

//       const sku =
//         variant?.sku || `SHOPIFY-${variant?.id || product.id}`;

//       const existingProduct = await Product.findOne({ sku });

//       if (existingProduct) {
//         await Product.findByIdAndUpdate(existingProduct._id, {
//           status: product.status || "active",
//         });

//         console.log(
//           `${product.title} status updated: ${product.status}`
//         );

//         continue;
//       }

//       await Product.create({
//         productName: product.title,

//         sku,

//         category: product.product_type || "General",

//         vendor: product.vendor || "",

//         price: Number(variant?.price || 0),



//         comparePrice: Number(
//           variant?.compare_at_price || 0
//         ),

//         status: product.status || "active",

//         warehouseStock: {
//           shopify: variant?.inventory_quantity || 0,
//           hyderabad: 0,
//           nalgonda: 0,
//           warehouseOne: 0,
//           warehouseTwo: 0,
//         },
//       });

//       console.log(`${product.title} Imported`);
//     }

//     console.log("====================================");
//     console.log("Shopify Product Import Completed");
//     console.log("====================================");

//     return products;

//   } catch (error) {

//     console.log("========== PRODUCT SYNC ERROR ==========");

//     console.log(
//       error.response?.data || error.message
//     );

//     console.log("========================================");

//   }
// };








// import axios from "axios";
// import Product from "../models/Product.js";

// export const fetchShopifyProducts = async () => {
//   try {
//     const SHOP = process.env.SHOPIFY_STORE;
//     const TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
//     const API_VERSION = "2025-07";

//     const response = await axios.get(
//       `https://${SHOP}/admin/api/${API_VERSION}/products.json`,
//       {
//         headers: {
//           "X-Shopify-Access-Token": TOKEN,
//         },
//         params: {
//           limit: 80,
//         },
//       }
//     );

//     console.log("========== PRODUCTS ==========");

// for (const product of response.data.products) {

//   const variant = product.variants[0];

//   // Generate SKU if Shopify SKU is missing
//   const sku =
//     variant?.sku || `SHOPIFY-${variant?.id || product.id}`;

//   // Check if product already exists
//   const existingProduct = await Product.findOne({
//     sku,
//   });

//   if (existingProduct) {
//     console.log(`${product.title} already exists`);
//     continue;
//   }

//   await Product.create({
//     productName: product.title,

//     sku,

//     category: product.product_type || "General",

//     vendor: product.vendor || "",

//     price: Number(variant?.price || 0),

//     comparePrice: Number(variant?.compare_at_price || 0),

//     warehouseStock: {
//       shopify: variant?.inventory_quantity || 0,
//       hyderabad: 0,
//       nalgonda: 0,
//     },

//     status: "In Stock",
//   });

//   console.log(`${product.title} Imported`);
// }

//     return response.data.products;

//   } catch (error) {
//     console.log(error.response?.data || error.message);
//   }
// };