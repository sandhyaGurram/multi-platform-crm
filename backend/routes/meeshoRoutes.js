import express from "express";
import multer from "multer";
import { uploadMeeshoOrders } from "../controllers/meeshoController.js";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

router.post(
    "/import",
    upload.single("file"),
    uploadMeeshoOrders
);

export default router;