import axios from "axios";
import Order from "../models/Order.js";

export const fetchShopifyOrders = async () => {
  try {
    const SHOP = process.env.SHOPIFY_STORE;
    const TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
    const API_VERSION = "2025-07";

    console.log("SHOP:", SHOP);

    const url = `https://${SHOP}/admin/api/${API_VERSION}/orders.json`;

    console.log("URL:", url);

    const response = await axios.get(url, {
      headers: {
        "X-Shopify-Access-Token": TOKEN,
        "Content-Type": "application/json",
      },
      params: {
        limit: 5,
        status: "any",
      },
    });

    console.log("========== ORDERS ==========");

    response.data.orders.forEach((order) => {
      console.log(
        order.name,
        order.customer?.first_name,
        order.total_price
      );
    });

    return response.data.orders;

  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};