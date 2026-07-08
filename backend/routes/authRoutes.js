import express from "express";

import {
    registerUser,
    loginUser,
    logoutUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/registerxyxy", registerUser);

router.post("/loginxyz", loginUser);

router.post("/logout/:id", logoutUser);

export default router;