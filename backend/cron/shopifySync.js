import cron from "node-cron";
import { fetchShopifyOrders } from "../services/shopifyService.js";

const syncShopify = async () => {
  console.log("====================================");
  console.log("Starting Shopify Sync...");
  console.log("====================================");

//   console.log("Sync Products...");
//   console.log("Sync Orders...");

// await fetchShopifyOrders();
//   console.log("Sync Customers...");

//   console.log("====================================");
//   console.log("Shopify Sync Completed");
//   console.log("====================================");
};

const startShopifySync = () => {

  // Run immediately when server starts
  syncShopify();

  // Then run every day at 9 AM and 6 PM
//   cron.schedule("0 9,18 * * *", syncShopify);
};

export default startShopifySync;