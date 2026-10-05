import xlsx from "xlsx";
import Order from "../models/Order.js";

export const importOrders = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload an Excel or CSV file",
            });
        }

        // ==========================================
        // READ EXCEL / CSV
        // ==========================================

        const workbook = xlsx.readFile(req.file.path, {
            cellDates: true,
        });

        const sheetName = workbook.SheetNames[0];

        const sheet = workbook.Sheets[sheetName];

        const data = xlsx.utils.sheet_to_json(sheet, {
            raw: false,
            defval: "",
        });

        if (!data.length) {
            return res.status(400).json({
                message: "Uploaded file contains no orders",
            });
        }

        // ==========================================
        // DETECT PLATFORM
        // ==========================================

        const firstRow = data[0];

        const isMeesho =
            Object.prototype.hasOwnProperty.call(
                firstRow,
                "Sub Order No"
            );

        const isShopify =
            Object.prototype.hasOwnProperty.call(
                firstRow,
                "Order ID"
            );

        console.log("Detected platform:", {
            isMeesho,
            isShopify,
        });

        let platform = "Unknown";

        if (isMeesho) {
            platform = "Meesho";
        } else if (isShopify) {
            platform = "Shopify";
        }

        console.log("IMPORT PLATFORM:", platform);

        // ==========================================
        // COUNTERS
        // ==========================================

        let created = 0;
        let updated = 0;
        let skipped = 0;

        const errors = [];

        // ==========================================
        // PROCESS EACH ROW
        // ==========================================

        for (const row of data) {
            try {
                let orderData;

                // ======================================
                // MEESHO
                // ======================================

                if (platform === "Meesho") {
                    const orderId =
                        String(row["Sub Order No"] || "").trim();

                    if (!orderId) {
                        skipped++;

                        errors.push({
                            reason: "Sub Order No is missing",
                            row,
                        });

                        continue;
                    }

                    const quantity =
                        Number(row["Quantity"]) || 0;

                    const amount =
                        Number(
                            row["Supplier Discounted Price"]
                        ) ||
                        Number(
                            row["Supplier Listed Price"]
                        ) ||
                        0;

                    const orderDate = row["Order Date"]
                        ? new Date(row["Order Date"])
                        : null;

                    const orderStatus =
                        String(
                            row["Reason for Credit Entry"] || ""
                        ).trim() || "Pending";

                    const productName =
                        String(
                            row["Product Name"] || ""
                        ).trim();

                    const sku =
                        String(
                            row["SKU"] || ""
                        ).trim();

                    const variant =
                        String(
                            row["Size"] || ""
                        ).trim();

                    const customerState =
                        String(
                            row["Customer State"] || ""
                        ).trim();

                    const catalogId =
                        String(
                            row["Catalog ID"] || ""
                        ).trim();

                    const packetId =
                        String(
                            row["Packet Id"] || ""
                        ).trim();

                    orderData = {
                        orderId,

                        platform: "Meesho",

                        amount,

                        customerName: "",
                        customerPhone: "",
                        customerEmail: "",
                        customerAddress: customerState,

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
                }

                // ======================================
                // EXISTING / OTHER PLATFORM IMPORT
                // ======================================

                else {
                    let formattedDate = row["Order Date"]
                        ? new Date(row["Order Date"])
                        : null;

                    const formattedPlatform =
                        row["Platform"]
                            ? String(row["Platform"])
                                .trim()
                                .toLowerCase()
                                .replace(
                                    /^./,
                                    (char) =>
                                        char.toUpperCase()
                                )
                            : "Shopify";

                    orderData = {
                        orderId:
                            row["Order ID"] || "N/A",

                        customerName:
                            row["Customer Name"] || "",

                        customerPhone:
                            row["Phone"] || "",

                        customerEmail:
                            row["Email"] || "",

                        customerAddress:
                            row["Address"] || "",

                        productName:
                            row["Product Name"] || "",

                        quantity:
                            Number(row["Quantity"]) || 0,

                        pincode:
                            row["Pincode"] || "",

                        amount:
                            Number(row["Amount"]) || 0,

                        platform:
                            formattedPlatform,

                        paymentMethod:
                            row["Payment Method"] || "",

                        trackingId:
                            row["Tracking ID"] || "",

                        orderStatus:
                            row["Status"] || "Pending",

                        orderDate:
                            formattedDate,
                    };
                }

                // ======================================
                // DUPLICATE CHECK
                // ======================================

                const existingOrder =
                    await Order.findOne({
                        orderId: orderData.orderId,
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
            } catch (rowError) {
                console.error(
                    "ROW IMPORT ERROR:",
                    rowError
                );

                errors.push({
                    reason: rowError.message,
                    row,
                });
            }
        }

        // ==========================================
        // RESPONSE
        // ==========================================

        return res.status(200).json({
            message: `${platform} orders imported successfully`,

            platform,

            totalRows: data.length,

            created,

            updated,

            skipped,

            errors,
        });
    } catch (error) {
        console.error(
            "IMPORT ORDERS ERROR:",
            error
        );

        return res.status(500).json({
            message: "Failed to import orders",

            error: error.message,
        });
    }
};
























// import xlsx from "xlsx";

// import Order from "../models/Order.js";

// export const importOrders = async (
//     req,
//     res
// ) => {

//     try {

//         const workbook = xlsx.readFile(req.file.path, {
//             cellDates: true,
//         });

//         const sheetName =
//             workbook.SheetNames[0];

//         const sheet =
//             workbook.Sheets[sheetName];

//         const data = xlsx.utils.sheet_to_json(sheet, {
//             raw: false,
//         });

//         for (const row of data) {

//             console.log(row);

//             // DATE FORMAT FIX

//             let formattedDate = row["Order Date"]
//                 ? new Date(row["Order Date"])
//                 : null;

//             // let formattedDate = new Date();

//             // if (row["Order Date"]) {

//             //     const parts =
//             //         row["Order Date"]
//             //             .toString()
//             //             .split("-");

//             //     if (parts.length === 3) {

//             //         formattedDate = new Date(

//             //             `${parts[2]}-${parts[1]}-${parts[0]}`

//             //         );

//             //     }

//             // }

//             // PLATFORM FORMAT FIX

//             const formattedPlatform =
//                 row["Platform"]

//                     ? row["Platform"]
//                         .trim()
//                         .toLowerCase()
//                         .replace(
//                             /^./,
//                             (char) =>
//                                 char.toUpperCase()
//                         )

//                     : "Shopify";

//             await Order.create({

//                 orderId:
//                     row["Order ID"] || "N/A",

//                 customerName:
//                     row["Customer Name"] || "",

//                 customerPhone:
//                     row["Phone"] || "",

//                 customerEmail:
//                     row["Email"] || "",

//                 customerAddress:
//                     row["Address"] || "",

//                 productName:
//                     row["Product Name"] || "",

//                 quantity:
//                     row["Quantity"] || "",



//                 pincode:
//                     row["Pincode"] || "",

//                 amount:
//                     Number(row["Amount"]) || 0,

//                 platform:
//                     formattedPlatform,

//                 paymentMethod:
//                     row["Payment Method"] || "",

//                 trackingId:
//                     row["Tracking ID"] || "",

//                 status:
//                     row["Status"] || "Pending",

//                 orderDate:
//                     formattedDate,

//             });

//         }

//         res.json({
//             message:
//                 "Orders imported successfully",
//         });

//     } catch (error) {

//         console.log(error);

//         res.status(500).json({
//             message: error.message,
//         });

//     }

// };

