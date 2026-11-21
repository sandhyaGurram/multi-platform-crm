

import axios from "axios";
import Product from "../models/Product.js";

export const fetchShopifyProducts = async () => {
  try {
    const SHOP = process.env.SHOPIFY_STORE;
    const TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
    const API_VERSION = "2025-07";

    const GRAPHQL_URL = `https://${SHOP}/admin/api/${API_VERSION}/graphql.json`;

    let products = [];
    let hasNextPage = true;
    let cursor = null;

    console.log("====================================");
    console.log("Starting Shopify Product Import");
    console.log("====================================");

    // FETCH ALL PRODUCTS USING GRAPHQL

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

                variants(first: 1) {
                  edges {
                    node {
                      id
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
        `Fetched ${fetchedProducts.length} products. Total: ${products.length}`
      );

      hasNextPage = result.pageInfo.hasNextPage;
      cursor = result.pageInfo.endCursor;
    }

    console.log("====================================");
    console.log(`Total Shopify Products: ${products.length}`);
    console.log("====================================");

    // SAVE / UPDATE PRODUCTS IN MONGODB

    // SAVE / UPDATE PRODUCTS IN MONGODB

    let updatedCount = 0;
    let importedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    // Normalize product titles
    const normalizeTitle = (title) =>
      title?.trim().toLowerCase().replace(/\s+/g, " ") || "";

    // Escape special regex characters
    const escapeRegex = (value) =>
      value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    for (const product of products) {
      try {
        const variant = product.variants?.edges?.[0]?.node;

        const sku =
          variant?.sku?.trim() ||
          `SHOPIFY-${variant?.id || product.id}`;

        const status = product.status?.toLowerCase() || "unknown";

        const category =
          product.category?.name || "Uncategorized";

        const productData = {
          productName: product.title,
          sku,
          status,
          category,
          vendor: product.vendor || "",
          price: Number(variant?.price || 0),
          comparePrice: Number(variant?.compareAtPrice || 0),
        };

        // 1. Find product by normalized title
        const normalizedTitle = normalizeTitle(product.title);

        const titlePattern = normalizedTitle
          .split(" ")
          .map(escapeRegex)
          .join("\\s+");

        const matchingProducts = await Product.find({
          productName: {
            $regex: `^\\s*${titlePattern}\\s*$`,
            $options: "i",
          },
        });

        // 2. Find document that currently owns this SKU
        const skuOwner = await Product.findOne({ sku });

        // 3. More than one title match: skip safely
        if (matchingProducts.length > 1) {
          console.log(
            `SKIPPED: Multiple products have the title "${product.title}"`
          );

          skippedCount++;
          continue;
        }

        let existingProduct = null;

        if (matchingProducts.length === 1) {
          existingProduct = matchingProducts[0];

          // SKU belongs to a different document
          if (
            skuOwner &&
            skuOwner._id.toString() !== existingProduct._id.toString()
          ) {
            console.error(
              `SKU CONFLICT: ${sku} already belongs to "${skuOwner.productName}". ` +
              `Skipping "${product.title}".`
            );

            skippedCount++;
            continue;
          }
        } else if (skuOwner) {
          // Title may have changed, but SKU identifies an existing document
          existingProduct = skuOwner;
        }

        // 4. Update existing product
        if (existingProduct) {
          await Product.updateOne(
            { _id: existingProduct._id },
            {
              $set: productData,
            },
            {
              runValidators: true,
            }
          );

          updatedCount++;

          console.log(
            `UPDATED: ${product.title} | SKU: ${sku} | Status: ${status} | Category: ${category}`
          );
        }

        // 5. Import only if neither title nor SKU exists
        else {
          await Product.create({
            ...productData,
            warehouseStock: {
              shopify: 0,
              hyderabad: 0,
              nalgonda: 0,
              warehouseOne: 0,
              warehouseTwo: 0,
            },
          });

          importedCount++;

          console.log(
            `IMPORTED: ${product.title} | SKU: ${sku} | Status: ${status} | Category: ${category}`
          );
        }
      } catch (productError) {
        errorCount++;

        console.error(
          `PRODUCT ERROR: ${product.title} | ${productError.message}`
        );

        // Continue processing the next Shopify product
        continue;
      }
    }

    console.log("====================================");
    console.log("SHOPIFY PRODUCT SYNC COMPLETED");
    console.log(`Total Products: ${products.length}`);
    console.log(`Updated Products: ${updatedCount}`);
    console.log(`New Products: ${importedCount}`);
    console.log(`Skipped Products: ${skippedCount}`);
    console.log(`Failed Products: ${errorCount}`);
    console.log("====================================");


    return products;

  } catch (error) {
    console.log("========== PRODUCT SYNC ERROR ==========");

    console.log(
      error.response?.data || error.message
    );

    console.log("========================================");

    throw error;
  }
};


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