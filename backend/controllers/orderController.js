import Order from "../models/Order.js";
import Notification from "../models/Notification.js";


// CREATE ORDER

// export const createOrder = async (req, res) => {

//     try {

//         const {
//             orderId,
//             customerName,
//             productName,
//             amount,
//             status,
//             platform,

//             sku,
//             variant,
//             quantity,

//             category,
//             customerPhone,
//             customerEmail,
//             brand,

//         } = req.body;

//         const order = await Order.create({

//             orderId,

//             customerName,

//             amount: Number(amount),

//             status,

//             platform,

//             sku,

//             category,

//             productName,

//             customerPhone,

//             customerEmail,


//         });

//         res.status(201).json(order);

//     } catch (error) {

//         res.status(500).json({
//             message: error.message,
//         });

//     }

// };


export const createOrder = async (req, res) => {

    try {

        console.log(req.body); // <-- ADD HERE

        const {
            orderId,
            customerName,
            productName,
            amount,
            status,
            platform,
            sku,
            variant,
            quantity,
            category,
            customerPhone,
            customerEmail,
            trackingId,
            orderDate,
            customerAddress,
            paymentMethod,
            pincode,

        } = req.body;

        const order = await Order.create({
            orderId,
            customerName,
            amount: Number(amount),
            status,
            platform,
            sku,
            category,
            productName,
            customerPhone,
            customerEmail,
            trackingId,
            orderDate,
            customerAddress,
            paymentMethod,
            pincode,
        });

        await Notification.create({
    title: "New Order",
    message: `Order ${order.orderId} has been added.`,
    type: "order",
});

        res.status(201).json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};


// GET ORDERS

export const getOrders = async (req, res) => {

    try {

        const orders = await Order.find().sort({ orderDate: -1 });

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

export const updateOrder = async (req, res) => {

    try {

        const updatedOrder = await Order.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
            }

        );

        await Notification.create({
    title: "Order Updated",
    message: `Order ${updatedOrder.orderId} has been updated.`,
    type: "order",
});

        res.json(updatedOrder);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};


export const deleteOrder = async (req, res) => {

    try {

        await Order.findByIdAndDelete(req.params.id);

        res.json({
            message: "Order deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};