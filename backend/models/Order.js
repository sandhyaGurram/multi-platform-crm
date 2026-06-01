// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(

//     {

//         orderId: {
//             type: String,
//             required: true,
//         },

//         customer: {
//             type: String,
//             required: true,
//         },

//         amount: {
//             type: Number,
//             required: true,
//         },

//         status: {
//             type: String,
//             required: true,
//         },

//         platform: {
//             type: String,
//             required: true,
//         },

//         date: {
//             type: Date,
//             default: Date.now,
//         },

//     },

//     {
//         timestamps: true,
//     }

// );

// const Order = mongoose.model("Order", orderSchema);

// export default Order;








import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(

    {

        orderId: {
            type: String,
            required: true,
        },

        platform: {
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

        date: {
            type: Date,
            default: Date.now,
        },

        // CUSTOMER DETAILS

        customerName: String,

        customerPhone: String,

        customerEmail: String,

        customerAddress: String,

        city: String,

        state: String,

        pincode: String,

        country: String,

        // ORDER DETAILS

        quantity: Number,

        paymentMethod: String,

        paymentStatus: String,

        orderStatus: String,

        // SHIPPING DETAILS

        trackingId: String,

        courierPartner: String,

        awbNumber: String,

        // PRODUCT DETAILS

        productName: String,

        sku: String,

        variant: String,

        // ANALYTICS

        taxAmount: Number,

        shippingCharge: Number,

        discountAmount: Number,

        profit: Number,

        // DATES

        orderDate: Date,

        deliveryDate: Date,

    },

    {
        timestamps: true,
    }

);

const Order = mongoose.model(
    "Order",
    orderSchema
);

export default Order;
