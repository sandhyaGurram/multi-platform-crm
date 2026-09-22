import { useEffect, useState } from "react";
import { FaBell, FaBoxOpen, FaCheck, FaCheckDouble } from "react-icons/fa";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../services/notificationService";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "ARM - Notifications";
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();

      setNotifications(res.data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRead = async (id) => {
    try {
      await markNotificationAsRead(id);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification,
        ),
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsAsRead();

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="p-1">
      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <FaBell className="text-[#a51e27] text-2xl" />

            <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
          </div>

          <p className="text-gray-500 mt-1">
            Track changes and activities in your CRM
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 bg-[#a51e27] text-white px-4 py-2 rounded-lg hover:opacity-90"
          >
            <FaCheckDouble />
            Mark all as read
          </button>
        )}
      </div>

      {/* Summary */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Notifications</p>

          <h2 className="text-2xl font-bold mt-1">{notifications.length}</h2>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Unread</p>

          <h2 className="text-2xl font-bold text-[#a51e27] mt-1">
            {unreadCount}
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Read</p>

          <h2 className="text-2xl font-bold text-green-600 mt-1">
            {notifications.length - unreadCount}
          </h2>
        </div>
      </div>

      {/* Notifications */}

      <div className="bg-white border rounded-xl overflow-hidden">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <FaBell className="text-4xl text-gray-300 mb-3" />

            <h3 className="text-lg font-semibold text-gray-600">
              No notifications
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              Product and inventory changes will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`p-5 flex gap-4 transition ${
                  !notification.isRead ? "bg-red-50" : "bg-white"
                }`}
              >
                {/* Icon */}

                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                    notification.type === "inventory"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <FaBoxOpen />
                </div>

                {/* Content */}

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {notification.action === "WAREHOUSE_STOCK_UPDATED"
                          ? "Warehouse Stock Updated"
                          : notification.action}
                      </h3>

                      <p className="text-gray-600 mt-1">
                        {notification.message}
                      </p>
                    </div>

                    {!notification.isRead && (
                      <span className="text-xs bg-[#a51e27] text-white px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>

                  {/* Details */}

                  <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-sm text-gray-500">
                    <span>
                      <strong>Product:</strong>{" "}
                      {notification.productName || "-"}
                    </span>

                    {notification.warehouse && (
                      <span>
                        <strong>Warehouse:</strong> {notification.warehouse}
                      </span>
                    )}

                    <span>
                      <strong>Changed by:</strong> {notification.userEmail}
                    </span>

                    <span>
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Read button */}

                {!notification.isRead && (
                  <button
                    onClick={() => handleRead(notification._id)}
                    title="Mark as read"
                    className="text-gray-400 hover:text-green-600"
                  >
                    <FaCheck />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
