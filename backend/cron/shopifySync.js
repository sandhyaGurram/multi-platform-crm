import cron from "node-cron";

const startShopifySync = () => {

    // Runs every day at 9:00 AM and 6:00 PM
    cron.schedule("0 9,18 * * *", async () => {

        console.log("====================================");
        console.log("Starting Shopify Sync...");
        console.log("====================================");

        // Products
        console.log("Sync Products...");

        // Orders
        console.log("Sync Orders...");

        // Customers
        console.log("Sync Customers...");

        console.log("====================================");
        console.log("Shopify Sync Completed");
        console.log("====================================");

    });

};

export default startShopifySync;