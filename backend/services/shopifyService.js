import axios from "axios";
import Order from "../models/Order.js";

export const fetchShopifyOrders = async () => {
  try {
    const SHOP = process.env.SHOPIFY_STORE;
    const TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
    const API_VERSION = "2025-07";

    let url = `https://${SHOP}/admin/api/${API_VERSION}/orders.json`;

    let allShopifyOrders = [];
    let pageNumber = 1;

    while (url) {
      console.log("====================================");
      console.log(`Fetching Shopify Orders - Page ${pageNumber}`);
      console.log("====================================");

      const response = await axios.get(url, {
        headers: {
          "X-Shopify-Access-Token": TOKEN,
          "Content-Type": "application/json",
        },

        // IMPORTANT:
        // These parameters are used only for the first request.
        ...(pageNumber === 1 && {
          params: {
            status: "any",
            limit: 250,
          },
        }),
      });

      const shopifyOrders = response.data.orders || [];

      console.log(
        `Page ${pageNumber}: Fetched ${shopifyOrders.length} orders`
      );

      allShopifyOrders.push(...shopifyOrders);

      // -----------------------------------------
      // GET NEXT PAGE FROM SHOPIFY LINK HEADER
      // -----------------------------------------

      const linkHeader = response.headers.link;

      let nextUrl = null;

      if (linkHeader) {
        const links = linkHeader.split(",");

        const nextLink = links.find((link) =>
          link.includes('rel="next"')
        );

        if (nextLink) {
          nextUrl = nextLink
            .split(";")[0]
            .trim()
            .replace(/^<|>$/g, "");
        }
      }

      url = nextUrl;
      pageNumber++;
    }

    console.log("====================================");
    console.log(
      `TOTAL SHOPIFY ORDERS FETCHED: ${allShopifyOrders.length}`
    );
    console.log("====================================");

    // =========================================
    // SAVE ALL ORDERS TO MONGODB
    // =========================================

    for (const order of allShopifyOrders) {
      const fulfillment = order.fulfillments?.[0];

      const trackingNumber =
        fulfillment?.tracking_number ||
        fulfillment?.tracking_numbers?.[0] ||
        null;

      const trackingUrl =
        fulfillment?.tracking_url ||
        fulfillment?.tracking_urls?.[0] ||
        null;

      const courierPartner =
        fulfillment?.tracking_company ||
        null;

      const customerName = order.customer
        ? `${order.customer.first_name || ""} ${order.customer.last_name || ""
          }`.trim()
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
            : fulfillment?.shipment_status === "delivered"
              ? "Delivered"
              : fulfillment?.shipment_status === "in_transit"
                ? "In Transit"
                : fulfillment?.shipment_status === "out_for_delivery"
                  ? "Out for Delivery"
                  : order.fulfillment_status === "fulfilled"
                    ? "Fulfilled"
                    : order.fulfillment_status === "partial"
                      ? "Partially Fulfilled"
                      : "Unfulfilled",

        fulfillmentStatus:
          order.fulfillment_status || null,

        deliveryStatus:
          fulfillment?.shipment_status || null,

        courierPartner,

        awbNumber: trackingNumber,

        trackingId: trackingNumber,

        trackingUrl,

        deliveryDate: null,

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

      // =========================================
      // SAVE / UPDATE MONGODB
      // =========================================

      await Order.findOneAndUpdate(
        {
          orderId: order.name,
          platform: "Shopify",
        },
        orderData,
        {
          upsert: true,
          returnDocument: "after",
        }
      );

      console.log(`${order.name} synced to MongoDB`);
    }

    console.log("====================================");
    console.log("SHOPIFY ORDER SYNC COMPLETED");
    console.log(`Total Orders: ${allShopifyOrders.length}`);
    console.log("====================================");

    return allShopifyOrders;

  } catch (error) {
    console.error(
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

//     const url = `https://${SHOP}/admin/api/${API_VERSION}/orders.json`;

//     const response = await axios.get(url, {
//       headers: {
//         "X-Shopify-Access-Token": TOKEN,
//         "Content-Type": "application/json",
//       },
//       params: {
//         status: "any",
//         limit: 250,
//       },
//     });

//     const shopifyOrders = response.data.orders;

//     console.log("========== SHOPIFY ORDERS ==========");
//     console.log(`Fetched ${shopifyOrders.length} orders`);

//     for (const order of shopifyOrders) {

//       const fulfillment = order.fulfillments?.[0];

// const trackingNumber =
//   fulfillment?.tracking_number ||
//   fulfillment?.tracking_numbers?.[0] ||
//   null;

// const trackingUrl =
//   fulfillment?.tracking_url ||
//   fulfillment?.tracking_urls?.[0] ||
//   null;

// const courierPartner =
//   fulfillment?.tracking_company ||
//   null;

//       const customerName = order.customer
//         ? `${order.customer.first_name || ""} ${order.customer.last_name || ""}`.trim()
//         : "";

//       const shippingAddress = order.shipping_address;

//       const items = (order.line_items || []).map((item) => ({
//         productName: item.title || "",
//         sku: item.sku || "",
//         variant: item.variant_title || "",
//         quantity: Number(item.quantity || 0),
//         unitPrice: Number(item.price || 0),
//       }));

//       const firstItem = items[0];

//       const orderData = {

//         orderId: order.name,

//         platform: "Shopify",

//         amount: Number(order.total_price || 0),

//         customerName,

//         customerPhone:
//           shippingAddress?.phone ||
//           order.phone ||
//           order.customer?.phone ||
//           "",

//         customerEmail:
//           order.email ||
//           order.customer?.email ||
//           "",

//         customerAddress:
//           shippingAddress?.address1 || "",

//         city:
//           shippingAddress?.city || "",

//         state:
//           shippingAddress?.province || "",

//         pincode:
//           shippingAddress?.zip || "",

//         country:
//           shippingAddress?.country || "",

//         quantity: items.reduce(
//           (total, item) => total + item.quantity,
//           0
//         ),

//         paymentMethod:
//           order.payment_gateway_names?.join(", ") || "",

//         paymentStatus:
//           order.financial_status || "",


//          orderStatus:
//   order.cancelled_at
//     ? "Cancelled"
//     : fulfillment?.shipment_status === "delivered"
//       ? "Delivered"
//       : fulfillment?.shipment_status === "in_transit"
//         ? "In Transit"
//         : fulfillment?.shipment_status === "out_for_delivery"
//           ? "Out for Delivery"
//           : order.fulfillment_status === "fulfilled"
//             ? "Fulfilled"
//             : order.fulfillment_status === "partial"
//               ? "Partially Fulfilled"
//               : "Unfulfilled",

// fulfillmentStatus:
//   order.fulfillment_status || null,

// deliveryStatus:
//   fulfillment?.shipment_status || null,

// courierPartner,

// awbNumber: trackingNumber,

// trackingId: trackingNumber,

// trackingUrl,

// deliveryDate: null,

//         // orderStatus:
//         //   order.cancelled_at
//         //     ? "Cancelled"
//         //     : "Active",

//         // fulfillmentStatus:
//         //   order.display_fulfillment_status || null,

//         // deliveryStatus:
//         //   fulfillment?.displayStatus || null,

//         // courierPartner:
//         //   tracking?.company || null,

//         // awbNumber:
//         //   tracking?.number || null,

//         // trackingId:
//         //   tracking?.number || null,

//         // trackingUrl:
//         //   tracking?.url || null,

//         // deliveryDate:
//         //   fulfillment?.deliveredAt || null,

//         productName:
//           firstItem?.productName || "",

//         sku:
//           firstItem?.sku || "",

//         variant:
//           firstItem?.variant || "",

//         unitPrice:
//           firstItem?.unitPrice || 0,

//         taxAmount:
//           Number(order.total_tax || 0),

//         shippingCharge:
//           Number(
//             order.shipping_lines?.reduce(
//               (total, shipping) =>
//                 total + Number(shipping.price || 0),
//               0
//             ) || 0
//           ),

//         discountAmount:
//           Number(order.current_total_discounts || 0),

//         orderDate:
//           order.created_at,

//         items,
//       };

//       // SAVE TO MONGODB
//       await Order.findOneAndUpdate(
//         {
//           orderId: order.name,
//           platform: "Shopify",
//         },
//         orderData,
//         {
//           returnDocument: "after",
//           upsert: true,
//         }
//       );

//       console.log(`${order.name} synced to MongoDB`);
//     }

//     console.log("====================================");

//     return shopifyOrders;

//   } catch (error) {

//     console.log(
//       "SHOPIFY ORDER SYNC ERROR:",
//       error.response?.data || error.message
//     );

//     throw error;
//   }
// };






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