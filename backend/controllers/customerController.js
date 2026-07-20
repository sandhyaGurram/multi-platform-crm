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


export const getCustomerDetails = async (req, res) => {
    try {

        const { email } = req.params;

        // Fetch all orders for this customer
        const orders = await Order.find({
            customerEmail: email
        }).sort({ orderDate: -1 });

        if (!orders.length) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        // Customer basic info
        const customer = {
            name: orders[0].customerName,
            email: orders[0].customerEmail,
            phone: orders[0].customerPhone,
            address: orders[0].customerAddress,
            platform: orders[0].platform,
        };

        // Total Orders
        const totalOrders = orders.length;

        // Lifetime Value
        const lifetimeValue = orders.reduce(
            (sum, order) => sum + (order.amount || 0),
            0
        );

        // Total Quantity Purchased
        let totalQuantity = 0;

        // Product Summary
        const productMap = {};

        orders.forEach(order => {

            order.items?.forEach(item => {

                totalQuantity += item.quantity;

                if (!productMap[item.productName]) {
                    productMap[item.productName] = 0;
                }

                productMap[item.productName] += item.quantity;

            });

        });

        // Top Products
        const topProducts = Object.entries(productMap)
            .map(([name, qty]) => ({
                name,
                qty
            }))
            .sort((a, b) => b.qty - a.qty)
            .slice(0, 4);

        // Latest Order
        const latestOrder = orders[0];

        res.json({
            customer,
            totalOrders,
            lifetimeValue,
            totalQuantity,
            latestOrder,
            topProducts
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};