import Order from "../models/Order.js";

export const getCustomers = async (req, res) => {
    try {

        const customers = await Order.aggregate([
            {
                $group: {
                    _id: "$customerEmail",

                    customerName: { $first: "$customerName" },
                    customerEmail: { $first: "$customerEmail" },
                    customerPhone: { $first: "$customerPhone" },

                    city: { $first: "$city" },
                    state: { $first: "$state" },
                    country: { $first: "$country" },
                    pincode: { $first: "$pincode" },

                    customerAddress: { $first: "$customerAddress" },

                    totalOrders: { $sum: 1 },

                    totalSpent: { $sum: "$amount" },

                    totalQuantity: { $sum: "$quantity" },

                    lastOrderDate: { $max: "$orderDate" },

                    firstOrderDate: { $min: "$orderDate" },

                    platforms: { $addToSet: "$platform" }
                }
            },

            {
                $sort: {
                    totalSpent: -1
                }
            }

        ]);

        res.json(customers);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};