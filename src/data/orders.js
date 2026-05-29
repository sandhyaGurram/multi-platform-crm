const orders = [

    {
        id: "#1001",

        customer: "Rahul",

        phone: "9876543210",

        email: "rahul@gmail.com",

        amount: "₹3200",

        status: "Delivered",

        payment: "Paid",

        shipping: "Delivered",

        trackingId: "TRK123456",

        platform: "Shopify",

        date: "2026-05-29",

        address: {
            city: "Hyderabad",
            state: "Telangana",
            pincode: "500001",
        },

        products: [
            {
                name: "Vitamin C Serum",
                quantity: 2,
            },

            {
                name: "Face Wash",
                quantity: 1,
            },
        ],
    },

    {
        id: "#1002",

        customer: "Priya",

        phone: "9123456780",

        email: "priya@gmail.com",

        amount: "₹2100",

        status: "Pending",

        payment: "Pending",

        shipping: "Processing",

        trackingId: "TRK654321",

        platform: "Amazon",

        date: "2026-05-28",

        address: {
            city: "Bangalore",
            state: "Karnataka",
            pincode: "560001",
        },

        products: [
            {
                name: "Face Cream",
                quantity: 1,
            },
        ],
    },

];

export default orders;