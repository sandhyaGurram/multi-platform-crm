import Order from "../models/Order.js";

export const getDashboardStats = async (req, res) => {

    const filter = req.query.filter;

    let query = {};

    const today = new Date();

    if (filter === "Today") {

        const startOfDay = new Date();

        startOfDay.setHours(0, 0, 0, 0);

        query.createdAt = {
            $gte: startOfDay,
        };

    }

    else if (filter === "Yesterday") {

        const yesterday = new Date();

        yesterday.setDate(yesterday.getDate() - 1);

        yesterday.setHours(0, 0, 0, 0);

        const endYesterday = new Date(yesterday);

        endYesterday.setHours(23, 59, 59, 999);

        query.createdAt = {
            $gte: yesterday,
            $lte: endYesterday,
        };

    }

    else if (filter === "Last 7 Days") {

        const last7 = new Date();

        last7.setDate(last7.getDate() - 7);

        query.createdAt = {
            $gte: last7,
        };

    }

    else if (filter === "Last 30 Days") {

        const last30 = new Date();

        last30.setDate(last30.getDate() - 30);

        query.createdAt = {
            $gte: last30,
        };

    }

    else if (filter === "Last Year") {

        const lastYear = new Date();

        lastYear.setFullYear(
            lastYear.getFullYear() - 1
        );

        query.createdAt = {
            $gte: lastYear,
        };

    }

    const orders = await Order.find(query);

    const totalOrders = orders.length;

    const revenue = orders.reduce(
        (sum, order) =>
            sum + (order.amount || 0),
        0
    );

    const shopifyOrders = orders.filter(
        (order) =>
            order.platform?.toLowerCase() ===
            "shopify"
    ).length;

    const amazonOrders = orders.filter(
        (order) =>
            order.platform?.toLowerCase() ===
            "amazon"
    ).length;

    const flipkartOrders = orders.filter(
        (order) =>
            order.platform?.toLowerCase() ===
            "flipkart"
    ).length;

    const meeshoOrders = orders.filter(
        (order) =>
            order.platform?.toLowerCase() ===
            "meesho"
    ).length;

    res.json({
        totalOrders,
        revenue,
        shopifyOrders,
        amazonOrders,
        flipkartOrders,
        meeshoOrders,
    });

};