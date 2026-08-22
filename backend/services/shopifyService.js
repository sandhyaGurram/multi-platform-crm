import axios from "axios";
import Order from "../models/Order.js";

export const fetchShopifyOrders = async () => {
  try {
    const SHOP = process.env.SHOPIFY_STORE;
    const TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
    const API_VERSION = "2025-07";

    const url = `https://${SHOP}/admin/api/${API_VERSION}/orders.json`;

    const response = await axios.get(url, {
      headers: {
        "X-Shopify-Access-Token": TOKEN,
        "Content-Type": "application/json",
      },
      params: {
        status: "any",
        limit: 250,
      },
    });

    const shopifyOrders = response.data.orders;

    console.log("========== SHOPIFY ORDERS ==========");
    console.log(`Fetched ${shopifyOrders.length} orders`);

    for (const order of shopifyOrders) {

      const fulfillment = order.fulfillments?.[0];
      const tracking = fulfillment?.trackingInfo?.[0];

      const customerName = order.customer
        ? `${order.customer.first_name || ""} ${order.customer.last_name || ""}`.trim()
        : "";

      const shippingAddress = order.shipping_address;

      const items = (order.line_items || []).map((item) => ({
        productName: item.title || "",
        sku: item.sku || "",
        variant: item.variant_title || "",
        quantity: Number(item.quantity || 0),
        unitPrice: Number(item.price || 0),
      }));

      const firstItem = items[0];

      const orderData = {

        orderId: order.name,

        platform: "Shopify",

        amount: Number(order.total_price || 0),

        customerName,

        customerPhone:
          shippingAddress?.phone ||
          order.phone ||
          order.customer?.phone ||
          "",

        customerEmail:
          order.email ||
          order.customer?.email ||
          "",

        customerAddress:
          shippingAddress?.address1 || "",

        city:
          shippingAddress?.city || "",

        state:
          shippingAddress?.province || "",

        pincode:
          shippingAddress?.zip || "",

        country:
          shippingAddress?.country || "",

        quantity: items.reduce(
          (total, item) => total + item.quantity,
          0
        ),

        paymentMethod:
          order.payment_gateway_names?.join(", ") || "",

        paymentStatus:
          order.financial_status || "",

        orderStatus:
          order.cancelled_at
            ? "Cancelled"
            : "Active",

        fulfillmentStatus:
          order.display_fulfillment_status || null,

        deliveryStatus:
          fulfillment?.displayStatus || null,

        courierPartner:
          tracking?.company || null,

        awbNumber:
          tracking?.number || null,

        trackingId:
          tracking?.number || null,

        trackingUrl:
          tracking?.url || null,

        deliveryDate:
          fulfillment?.deliveredAt || null,

        productName:
          firstItem?.productName || "",

        sku:
          firstItem?.sku || "",

        variant:
          firstItem?.variant || "",

        unitPrice:
          firstItem?.unitPrice || 0,

        taxAmount:
          Number(order.total_tax || 0),

        shippingCharge:
          Number(
            order.shipping_lines?.reduce(
              (total, shipping) =>
                total + Number(shipping.price || 0),
              0
            ) || 0
          ),

        discountAmount:
          Number(order.current_total_discounts || 0),

        orderDate:
          order.created_at,

        items,
      };

      // SAVE TO MONGODB
      await Order.findOneAndUpdate(
        {
          orderId: order.name,
          platform: "Shopify",
        },
        orderData,
        {
          new: true,
          upsert: true,
        }
      );

      console.log(`${order.name} synced to MongoDB`);
    }

    console.log("====================================");

    return shopifyOrders;

  } catch (error) {

    console.log(
      "SHOPIFY ORDER SYNC ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};






// import axios from "axios";
// import Order from "../models/Order.js";

// export const fetchShopifyOrders = async () => {
//   try {
//     const SHOP = process.env.SHOPIFY_STORE;
//     const TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
//     const API_VERSION = "2025-07";

//     console.log("SHOP:", SHOP);

//     const url = `https://${SHOP}/admin/api/${API_VERSION}/orders.json`;

//     console.log("URL:", url);

//     const response = await axios.get(url, {
//       headers: {
//         "X-Shopify-Access-Token": TOKEN,
//         "Content-Type": "application/json",
//       },
//       params: {
//         limit: 5,
//         status: "any",
//       },
//     });

//     console.log("========== ORDERS ==========");

//     response.data.orders.forEach((order) => {
//       console.log(
//         order.name,
//         order.customer?.first_name,
//         order.total_price
//       );
//     });

//     return response.data.orders;

//   } catch (error) {
//     console.log(error.response?.data || error.message);
//   }
// };