import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// GENERATE TOKEN

const generateToken = (id, role) => {

    return jwt.sign(

        {
            id,
            role,
        },

        process.env.JWT_SECRET,

        {
            expiresIn: "30d",
        }

    );

};


// REGISTER

export const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {

            return res.status(400).json({
                message: "User already exists",
            });

        }


        const role =
            email === "gurramsandhya2013@gmail.com"
                ? "admin"
                : "user";

        const isApproved =
            email === "gurramsandhya2013@gmail.com";

        const status = isApproved ? "Active" : "Pending";


        const salt = await bcrypt.genSalt(10);

        const hashedPassword =
            await bcrypt.hash(password, salt);



        const user = await User.create({

            name,

            email,

            password: hashedPassword,

            role,

            isApproved,

            status,

        });

        res.status(201).json({

            message: "Registration successful. Please wait for admin approval."

        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};


// LOGIN

export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Please register first.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        if (!user.isApproved) {

            return res.status(403).json({

                message:
                    "Your account is waiting for admin approval."

            });

        }


        // Update last login
        user.lastLogin = new Date();
        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role),
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};


// Logout

export const logoutUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (user) {

            user.lastLogout = new Date();

            await user.save();

            res.json({
                message: "Logout successful",
            });

        }

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};