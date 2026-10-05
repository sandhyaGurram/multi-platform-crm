import { importMeeshoOrders } from "../services/meeshoService.js";

export const uploadMeeshoOrders = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a Meesho CSV file",
            });
        }

        const result = await importMeeshoOrders(req.file.buffer);

        return res.status(200).json({
            message: "Meesho orders imported successfully",
            ...result,
        });
    } catch (error) {
        console.error("Meesho import error:", error);

        return res.status(500).json({
            message: "Failed to import Meesho orders",
            error: error.message,
        });
    }
};