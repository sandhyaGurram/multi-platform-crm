import User from "../models/User.js";

export const getUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password");

        res.json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        await User.findByIdAndDelete(req.params.id);

        res.json({
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


export const approveUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        user.isApproved = true;
        user.status = "Active";

        await user.save();

        res.json({
            message: "User approved successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const changeRole = async (req, res) => {
    try {
        const { role } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }


        if (user.email === "gurramsandhya2013@gmail.com") {
            return res.status(400).json({
                message: "Default admin role cannot be changed."
            });
        }


        user.role = role;

        await user.save();

        res.json({
            message: "Role updated successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};