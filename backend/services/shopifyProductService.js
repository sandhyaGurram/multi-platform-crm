import axios from "axios";
import Product from "../models/Product.js";

export const fetchShopifyProducts = async () => {
  try {
    const SHOP = process.env.SHOPIFY_STORE;
    const TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
    const API_VERSION = "2025-07";

    const response = await axios.get(
      `https://${SHOP}/admin/api/${API_VERSION}/products.json`,
      {
        headers: {
          "X-Shopify-Access-Token": TOKEN,
        },
        params: {
          limit: 10,
        },
      }
    );

    console.log("========== PRODUCTS ==========");

for (const product of response.data.products) {

  const variant = product.variants[0];

  // Generate SKU if Shopify SKU is missing
  const sku =
    variant?.sku || `SHOPIFY-${variant?.id || product.id}`;

  // Check if product already exists
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

    comparePrice: Number(variant?.compare_at_price || 0),

    warehouseStock: {
      shopify: variant?.inventory_quantity || 0,
      hyderabad: 0,
      nalgonda: 0,
    },

    status: "In Stock",
  });

  console.log(`${product.title} Imported`);
}

    return response.data.products;

  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};