// import cron from "node-cron";
// import { fetchShopifyProducts } from "../services/shopifyProductService.js";

// const syncShopify = async () => {
//   console.log("====================================");
//   console.log("Starting Shopify Product Sync...");
//   console.log("====================================");

//   try {
//     await fetchShopifyProducts();

//     console.log("====================================");
//     console.log("Shopify Product Sync Completed");
//     console.log("====================================");
//   } catch (error) {
//     console.error("Shopify Product Sync Failed:", error);
//   }
// };

// const startShopifySync = () => {

//   // Run every day at 6:00 PM
//   cron.schedule("0 18 * * *", syncShopify);

//   console.log("Shopify product sync scheduled for 6:00 PM every day.");
// };

// export default startShopifySync;







import cron from "node-cron";

import { fetchShopifyOrders } from "../services/shopifyService.js";
import { fetchShopifyProducts } from "../services/shopifyProductService.js";

let isSyncRunning = false;

const syncShopify = async () => {
  if (isSyncRunning) {
    console.log("Shopify sync already running. Skipping this execution.");
    return;
  }

  isSyncRunning = true;

  console.log("====================================");
  console.log("Starting Shopify Sync...");
  console.log("====================================");

  try {
    // 1. Sync Shopify Products
    console.log("Starting Shopify Product Sync...");

    await fetchShopifyProducts();

    console.log("Shopify Product Sync Completed.");

    // 2. Sync Shopify Orders
    console.log("Starting Shopify Order Sync...");

    await fetchShopifyOrders();

    console.log("Shopify Order Sync Completed.");

    console.log("====================================");
    console.log("Shopify Sync Completed Successfully");
    console.log("====================================");

  } catch (error) {
    console.error("Shopify Sync Failed:", error.message);
  } finally {
    isSyncRunning = false;
  }
};

const startShopifySync = () => {
  // Run once when the backend starts
  syncShopify();

  // Run every day at 6:00 PM
  cron.schedule("0 18 * * *", syncShopify);

  console.log("Shopify Product and Order Sync scheduled.");
};

export default startShopifySync;






// import cron from "node-cron";
// import { fetchShopifyOrders } from "../services/shopifyService.js";

// const syncShopify = async () => {
//   console.log("====================================");
//   console.log("Starting Shopify Sync...");
//   console.log("====================================");

// //   console.log("Sync Products...");
// //   console.log("Sync Orders...");

// // await fetchShopifyOrders();
// //   console.log("Sync Customers...");

// //   console.log("====================================");
// //   console.log("Shopify Sync Completed");
// //   console.log("====================================");
// };

// const startShopifySync = () => {

//   // Run immediately when server starts
//   syncShopify();

//   // Then run every day at 9 AM and 6 PM
// //   cron.schedule("0 9,18 * * *", syncShopify);
// };

// export default startShopifySync;