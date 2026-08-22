import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
             unique: true,
  index: true,
        },

        platform: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
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


        // SHIPPING / DELIVERY DETAILS

        fulfillmentStatus: {
            type: String,
            default: null,
        },

        deliveryStatus: {
            type: String,
            default: null,
        },

        trackingId: {
            type: String,
            default: null,
        },

        courierPartner: {
            type: String,
            default: null,
        },

        awbNumber: {
            type: String,
            default: null,
        },

        trackingUrl: {
            type: String,
            default: null,
        },


        // PRODUCT DETAILS

        productName: String,

        sku: String,

        variant: String,

        unitPrice: Number,


        // ANALYTICS

        taxAmount: Number,

        shippingCharge: Number,

        discountAmount: Number,

        profit: Number,


        // DATES

        orderDate: Date,

        deliveryDate: Date,


        // MULTIPLE PRODUCTS

        items: [
            {
                productName: String,
                sku: String,
                variant: String,
                quantity: Number,
                unitPrice: Number,
            }
        ],


        category: String,

        brand: String,
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







// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(

//     {

//         orderId: {
//             type: String,
//             required: true,
//         },

//         platform: {
//             type: String,
//             required: true,
//         },

//         amount: {
//             type: Number,
//             required: true,
//         },

       


//         // CUSTOMER DETAILS

//         customerName: String,

//         customerPhone: String,

//         customerEmail: String,

//         customerAddress: String,

//         city: String,

//         state: String,

//         pincode: String,

//         country: String,

//         // ORDER DETAILS

//         quantity: Number,

//         paymentMethod: String,

//         paymentStatus: String,

//         orderStatus: String,

//         // SHIPPING DETAILS

//        // SHIPPING / DELIVERY DETAILS

// fulfillmentStatus: {
//     type: String,
//     default: null,
// },

// deliveryStatus: {
//     type: String,
//     default: null,
// },

// trackingId: {
//     type: String,
//     default: null,
// },

// courierPartner: {
//     type: String,
//     default: null,
// },

// awbNumber: {
//     type: String,
//     default: null,
// },

// trackingUrl: {
//     type: String,
//     default: null,
// },

//         // PRODUCT DETAILS

//         productName: String,

//         sku: String,

//         variant: String,

//         unitPrice: Number,

//         // ANALYTICS

//         taxAmount: Number,

//         shippingCharge: Number,

//         discountAmount: Number,

//         profit: Number,

//         // DATES

//         orderDate: Date,

//     items: [
//     {
//         productName: String,
//         sku: String,
//         variant: String,
//         quantity: Number,
//         unitPrice: Number,
//     }
// ],

//         deliveryDate: Date,
//         category: String,
//         brand: String,

//     },

//     {
//         timestamps: true,
//     }

// );

// const Order = mongoose.model(
//     "Order",
//     orderSchema
// );

// export default Order;
