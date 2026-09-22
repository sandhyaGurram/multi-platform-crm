import Notification from "../models/Notification.js";


// Get all notifications
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find()
            .sort({ createdAt: -1 })
            .limit(100);

        res.status(200).json(notifications);
    } catch (error) {
        console.error("Get notifications error:", error);

        res.status(500).json({
            message: "Failed to fetch notifications",
        });
    }
};


// Mark one notification as read
export const markNotificationAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { returnDocument: "after" }
        );

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found",
            });
        }

        res.status(200).json(notification);
    } catch (error) {
        console.error("Mark notification read error:", error);

        res.status(500).json({
            message: "Failed to update notification",
        });
    }
};


// Mark all notifications as read
export const markAllNotificationsAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { isRead: false },
            { $set: { isRead: true } }
        );

        res.status(200).json({
            message: "All notifications marked as read",
        });
    } catch (error) {
        console.error("Mark all notifications read error:", error);

        res.status(500).json({
            message: "Failed to update notifications",
        });
    }
};