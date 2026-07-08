import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
    getUsers,
    deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);

router.delete("/:id", protect, deleteUser);

export default router;