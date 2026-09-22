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

const syncOrders = async () => {

  console.log("====================================");
  console.log("Starting Shopify Order Sync...");
  console.log("====================================");

  try {

    // await fetchShopifyOrders();

    console.log("Shopify Order Sync Completed");

  } catch (error) {

    console.error(
      "Shopify Order Sync Failed:",
      error
    );

  }
};

const startShopifySync = () => {

  // TEMPORARY: run immediately when server starts
  syncOrders();

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