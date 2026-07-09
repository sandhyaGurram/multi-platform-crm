import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ["Pending", "Active"],
        default: "Pending",
    },

    lastLogin: {
        type: Date,
    },

    lastLogout: {
        type: Date,
    },

}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;