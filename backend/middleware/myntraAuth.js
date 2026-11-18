import crypto from "crypto";

export const myntraAuth = (req, res, next) => {
    const receivedToken = req.headers["x-api-key"];
    const expectedToken = process.env.MYNTRA_AUTH_TOKEN;

    if (!expectedToken) {
        return res.status(500).json({
            success: false,
            message: "Myntra authentication token is not configured",
        });
    }

    if (!receivedToken) {
        return res.status(401).json({
            success: false,
            message: "Authentication token is missing",
        });
    }

    const receivedBuffer = Buffer.from(receivedToken);
    const expectedBuffer = Buffer.from(expectedToken);

    if (
        receivedBuffer.length !== expectedBuffer.length ||
        !crypto.timingSafeEqual(receivedBuffer, expectedBuffer)
    ) {
        return res.status(403).json({
            success: false,
            message: "Invalid authentication token",
        });
    }

    next();
};