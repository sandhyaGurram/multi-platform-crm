import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getNotifications = () => {
    return axios.get(`${API_URL}/api/notifications`);
};

export const markNotificationAsRead = (id) => {
    return axios.patch(
        `${API_URL}/api/notifications/${id}/read`
    );
};

export const markAllNotificationsAsRead = () => {
    return axios.patch(
        `${API_URL}/api/notifications/read-all`
    );
};