import axios from "axios";
import Product from "../models/Product.js";

export const fetchShopifyProducts = async () => {
  try {
    const SHOP = process.env.SHOPIFY_STORE;
    const TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
    const API_VERSION = "2025-07";

    let products = [];
    let pageInfo = null;

    console.log("====================================");
    console.log("Starting Shopify Product Import");
    console.log("====================================");

    do {
      const params = {
        limit: 250,
      };

      if (pageInfo) {
        params.page_info = pageInfo;
      }

      const response = await axios.get(
        `https://${SHOP}/admin/api/${API_VERSION}/products.json`,
        {
          headers: {
            "X-Shopify-Access-Token": TOKEN,
            "Content-Type": "application/json",
          },
          params,
        }
      );

      const fetchedProducts = response.data.products;

      products = [...products, ...fetchedProducts];

      console.log(
        `Fetched ${fetchedProducts.length} products. Total: ${products.length}`
      );

      // Check Shopify pagination
      const linkHeader = response.headers.link;

      pageInfo = null;

      if (linkHeader) {
        const nextLink = linkHeader
          .split(",")
          .find((link) => link.includes('rel="next"'));

        if (nextLink) {
          const match = nextLink.match(/page_info=([^&>]+)/);

          if (match) {
            pageInfo = match[1];
          }
        }
      }

    } while (pageInfo);

    console.log("====================================");
    console.log(`Total Shopify Products: ${products.length}`);
    console.log("====================================");


    // Save products into MongoDB

    for (const product of products) {

      const variant = product.variants?.[0];

      const sku =
        variant?.sku || `SHOPIFY-${variant?.id || product.id}`;

      const existingProduct = await Product.findOne({
        sku,
      });

      if (existingProduct) {
        console.log(`${product.title} already exists`);
        continue;
      }

      await Product.create({
        productName: product.title,

        sku,

        category: product.product_type || "General",

        vendor: product.vendor || "",

        price: Number(variant?.price || 0),

        comparePrice: Number(
          variant?.compare_at_price || 0
        ),

        warehouseStock: {
          shopify: variant?.inventory_quantity || 0,
          hyderabad: 0,
          nalgonda: 0,
        },
      });

      console.log(`${product.title} Imported`);
    }

    console.log("====================================");
    console.log("Shopify Product Import Completed");
    console.log("====================================");

    return products;

  } catch (error) {

    console.log("========== PRODUCT SYNC ERROR ==========");

    console.log(
      error.response?.data || error.message
    );

    console.log("========================================");

  }
};








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