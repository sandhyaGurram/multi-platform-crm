
import express from "express";

import multer from "multer";

import {
    importOrders,
} from "../controllers/importController.js";

const router = express.Router();

const upload = multer({
    dest: "uploads/",
});

router.post(
    "/orders",
    upload.single("file"),
    importOrders
);

export default router;

