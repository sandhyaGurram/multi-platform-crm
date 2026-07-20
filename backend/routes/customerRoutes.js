import express from "express";
import { getCustomers,getCustomerDetails } from "../controllers/customerController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCustomers);

router.get("/:email", getCustomerDetails);

export default router;