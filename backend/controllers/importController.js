
import xlsx from "xlsx";

import Order from "../models/Order.js";

export const importOrders = async (
    req,
    res
) => {

    try {

        const workbook = xlsx.readFile(
            req.file.path
        );

        const sheetName =
            workbook.SheetNames[0];

        const sheet =
            workbook.Sheets[sheetName];

        const data =
            xlsx.utils.sheet_to_json(sheet);

        for (const row of data) {

            console.log(row);

            // DATE FORMAT FIX

            let formattedDate = new Date();

            if (row["Order Date"]) {

                const parts =
                    row["Order Date"]
                        .toString()
                        .split("-");

                if (parts.length === 3) {

                    formattedDate = new Date(

                        `${parts[2]}-${parts[1]}-${parts[0]}`

                    );

                }

            }

            // PLATFORM FORMAT FIX

            const formattedPlatform =
                row["Platform"]

                    ? row["Platform"]
                        .trim()
                        .toLowerCase()
                        .replace(
                            /^./,
                            (char) =>
                                char.toUpperCase()
                        )

                    : "Shopify";

            await Order.create({

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

                amount:
                    Number(row["Amount"]) || 0,

                platform:
                    formattedPlatform,

                paymentMethod:
                    row["Payment Method"] || "",

                trackingId:
                    row["Tracking ID"] || "",

                status:
                    row["Status"] || "Pending",

                orderDate:
                    formattedDate,

            });

        }

        res.json({
            message:
                "Orders imported successfully",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message,
        });

    }

};

