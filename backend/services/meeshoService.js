import csv from "csv-parser";
import { Readable } from "stream";
import Order from "../models/Order.js";

export const importMeeshoOrders = async (buffer) => {
    const rows = [];

    await new Promise((resolve, reject) => {
        Readable.from(buffer)
            .pipe(csv())
            .on("data", (row) => {
                rows.push(row);
            })
            .on("end", resolve)
            .on("error", reject);
    });

    let created = 0;
    let updated = 0;
    let skipped = 0;

    const errors = [];

    for (const row of rows) {
        try {
            const orderId = row["Sub Order No"]?.trim();

            if (!orderId) {
                skipped++;
                errors.push({
                    reason: "Sub Order No is missing",
                    row,
                });
                continue;
            }

            const productName = row["Product Name"]?.trim() || "";

            const sku = row["SKU"]?.trim() || "";

            const quantity = Number(row["Quantity"]) || 0;

            const amount =
                Number(row["Supplier Discounted Price"]) ||
                Number(row["Supplier Listed Price"]) ||
                0;

            const orderDate = row["Order Date"]
                ? new Date(row["Order Date"])
                : null;

            const orderStatus =
                row["Reason for Credit Entry"]?.trim() || "UNKNOWN";

            const customerState =
                row["Customer State"]?.trim() || "";

            const variant =
                row["Size"]?.trim() || "";

            const catalogId =
                row["Catalog ID"]?.trim() || "";

            const packetId =
                row["Packet Id"]?.trim() || "";

            const orderData = {
                orderId,
                platform: "Meesho",

                amount,

                customerName: "",
                customerPhone: "",
                customerEmail: "",
                customerAddress: "",

                city: "",
                state: customerState,
                pincode: "",
                country: "India",

                quantity,

                paymentMethod: "",
                paymentStatus: "",
                orderStatus,

                fulfillmentStatus: null,
                deliveryStatus: null,

                trackingId: null,
                courierPartner: null,
                awbNumber: null,
                trackingUrl: null,

                productName,
                sku,
                variant,

                unitPrice: amount,

                taxAmount: 0,
                shippingCharge: 0,
                discountAmount: 0,

                profit: 0,

                orderDate,

                deliveryDate: null,

                items: [
                    {
                        productName,
                        sku,
                        variant,
                        quantity,
                        unitPrice: amount,
                    },
                ],

                category: "",
                brand: "Meesho",

                marketplaceData: {
                    catalogId,
                    packetId,
                    subOrderNo: orderId,
                },
            };

            const existingOrder = await Order.findOne({
                orderId,
                platform: "Meesho",
            });

            if (existingOrder) {
                await Order.findByIdAndUpdate(
                    existingOrder._id,
                    orderData,
                    {
                        new: true,
                        runValidators: true,
                    }
                );

                updated++;
            } else {
                await Order.create(orderData);
                created++;
            }
        } catch (error) {
            errors.push({
                reason: error.message,
                row,
            });
        }
    }

    return {
        totalRows: rows.length,
        created,
        updated,
        skipped,
        errors,
    };
};