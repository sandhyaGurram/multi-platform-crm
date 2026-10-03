import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSMongoose from "@adminjs/mongoose";

import Product from "../models/Product.js";

AdminJS.registerAdapter({
    Database: AdminJSMongoose.Database,
    Resource: AdminJSMongoose.Resource,
});

const admin = new AdminJS({
    rootPath: "/admin",

    branding: {
        companyName: "ARM CRM",
        softwareBrothers: false,
    },

    resources: [
        {
            resource: Product,

            options: {
                navigation: {
                    name: "Inventory",
                },

                listProperties: [
                    "productName",
                    "sku",
                    "category",
                    "vendor",
                    "price",
                ],

                showProperties: [
                    "productName",
                    "sku",
                    "category",
                    "vendor",
                    "price",
                    "comparePrice",
                    "warehouseStock",
                    "createdAt",
                    "updatedAt",
                ],

                editProperties: [
                    "productName",
                    "sku",
                    "category",
                    "vendor",
                    "price",
                    "comparePrice",
                    "warehouseStock",
                ],
            },
        },
    ],
});

export default admin;