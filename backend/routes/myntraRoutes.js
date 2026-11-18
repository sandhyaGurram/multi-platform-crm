import express from "express";
import { myntraAuth } from "../middleware/myntraAuth.js";

const router = express.Router();

// Protect Myntra integration endpoints
router.use(myntraAuth);

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Myntra CRM authentication successful",
    });
});

export default router;