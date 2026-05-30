import express from "express";


import {
    createOrder,
    getOrders,
    updateOrder,
} from "../controllers/orderController.js";

const router = express.Router();


// GET ALL ORDERS

router.get("/", getOrders);


// CREATE ORDER

router.post("/", createOrder);

router.put("/:id", updateOrder);

export default router;