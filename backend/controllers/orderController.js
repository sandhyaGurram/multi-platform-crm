import Order from "../models/Order.js";


// CREATE ORDER

export const createOrder = async (req, res) => {

    try {

        const {
            orderId,
            customer,
            amount,
            status,
            platform,
        } = req.body;

        const order = await Order.create({

            orderId,

            customer,

            amount: Number(amount),

            status,

            platform,

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

        const orders = await Order.find();

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