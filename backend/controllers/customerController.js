import Order from "../models/Order.js";

export const getCustomers = async (req, res) => {
    try {

        const customers = await Order.aggregate([
            {
                $group: {
                    _id: {
                        $ifNull: [
                            "$customerEmail",
                            {
                                $ifNull: [
                                    "$customerPhone",
                                    ["$customerName", "$customer"]
                                ]
                            }
                        ]
                    },

                    customerName: {
                        $first: {
                            $ifNull: ["$customerName", "$customer"]
                        }
                    },

                    customerPhone: { $first: "$customerPhone" },

                    customerEmail: { $first: "$customerEmail" },

                    customerAddress: { $first: "$customerAddress" },

                    totalOrders: { $sum: 1 },

                    totalSpent: { $sum: "$amount" },

                    platforms: { $addToSet: "$platform" },
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