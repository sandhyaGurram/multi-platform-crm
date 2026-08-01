import axios from "axios";

export const getOldOrders = async (req, res) => {
  try {
    const response = await axios.get(
      `https://smz2sd-p0.myshopify.com/admin/api/2025-07/orders.json`,
      {
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
        },
        params: {
          status: "any",
          limit: 5,
          created_at_min: "2025-12-01T00:00:00Z",
          created_at_max: "2025-12-31T23:59:59Z",
        },
      }
    );

    res.json(response.data.orders);
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json(error.response?.data || error.message);
  }
};