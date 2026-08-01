import express from "express";
import { getOldOrders } from "../controllers/shopifyController.js";

const router = express.Router();

router.get("/orders", getOldOrders);

export default router;
