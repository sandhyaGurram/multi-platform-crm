import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
    getUsers,
    deleteUser,
    approveUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);

router.delete("/:id", protect, deleteUser);

router.put(
    "/approve/:id",
    protect,
    approveUser
);

export default router;