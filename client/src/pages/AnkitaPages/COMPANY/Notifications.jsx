// src/pages/COMPANY/Notifications.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CompanyLayout from "../layouts/CompanyLayout";
import api from "../../../secureApi";

export default function CompanyNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/company/notifications");
        setNotifications(res.data.data || []);
      } catch (err) {
        console.error("Error fetching notifications", err);
      }
    };
    fetchNotifications();
  }, []);

  // mark one notification as read
  const handleClick = async (id, link) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    );

    try {
      await api.put("/company/notifications/mark-read", {
        notificationIds: [id],
      });
    } catch (err) {
      console.error("Error marking notification read", err);
    }

    if (link) navigate(link);
  };

  const handleMarkAllRead = async () => {
    const ids = notifications.filter((n) => !n.isRead).map((n) => n._id);
    if (ids.length === 0) return;

    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));

    try {
      await api.put("/company/notifications/mark-read", {
        notificationIds: ids,
      });
    } catch (err) {
      console.error("Error marking all read", err);
    }
  };

  const handleClearAll = async () => {
    const notificationIds = notifications.map((n) => n._id);
    setNotifications([]);

    try {
      await api.post("/company/notifications/delete", {
        notificationIds
      });
    } catch (err) {
      console.error("Error clearing notifications", err);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch {
      return "";
    }
  };

  return (
    <CompanyLayout>
      <div className="p-6 bg-bg text-lightText min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Notifications</h2>

          <div className="flex items-center gap-3">
            {notifications.some((n) => !n.isRead) && (
              <button
                onClick={handleMarkAllRead}
                className="text-sm text-primary hover:underline"
              >
                Mark all as read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-sm text-muted hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        <div className="bg-surface rounded-xl shadow-md divide-y divide-slate-700">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`p-4 cursor-pointer transition ${
                  n.isRead ? "opacity-70" : "bg-darkGray"
                } hover:bg-mediumGray`}
                onClick={() => handleClick(n._id, n.link)}
              >
                <div className="flex justify-between items-center">
                  <p
                    className={`text-sm font-medium ${
                      !n.isRead
                        ? "text-white font-bold"
                        : "text-lightText"
                    }`}
                  >
                    {n.type.charAt(0).toUpperCase() + n.type.slice(1)}
                  </p>
                  {!n.isRead && (
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                  )}
                </div>
                <p className="text-xs text-muted">{n.content}</p>
                <span className="text-[10px] text-slate-500">
                  {formatDate(n.createdAt)}
                </span>
              </div>
            ))
          ) : (
            <p className="p-4 text-sm text-muted text-center">
              No notifications
            </p>
          )}
        </div>
      </div>
    </CompanyLayout>
  );
}
