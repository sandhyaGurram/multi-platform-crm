import express from "express";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";


import {
    getUsers,
    deleteUser,
    approveUser,
    changeRole,
} from "../controllers/userController.js";

const router = express.Router();


router.get("/", protect, admin, getUsers);


router.delete("/:id", protect, admin, deleteUser);

router.put("/approve/:id", protect, admin, approveUser);

router.put("/role/:id", protect, admin, changeRole);


export default router;