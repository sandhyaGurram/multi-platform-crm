import express from "express";


import {
    createOrder,
    getOrders,
    updateOrder,
    deleteOrder,
} from "../controllers/orderController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// GET ALL ORDERS

router.get("/", protect, getOrders);


// CREATE ORDER

router.post("/", protect, createOrder);

router.put("/:id", protect, updateOrder);

router.delete("/:id", protect, deleteOrder);

export default router;