import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(

    {

        orderId: {
            type: String,
            required: true,
        },

        customer: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            required: true,
        },

        platform: {
            type: String,
            required: true,
        },

        date: {
            type: Date,
            default: Date.now,
        },

    },

    {
        timestamps: true,
    }

);

const Order = mongoose.model("Order", orderSchema);

export default Order;