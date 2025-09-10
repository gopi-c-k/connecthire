import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobseekerLayout from "../layouts/JobseekerLayout";
import api from "../../../secureApiForUser";
import { MessageSquare, Bell, Briefcase } from "lucide-react"; // icons for types

export default function UserNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // fetch notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/jobseeker/notifications");
        // API returns {message, data: [...]}
        setNotifications(res.data.data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const handleClick = async (id, link) => {
    // optimistic UI update
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    );

    try {
      await api.put("/jobseeker/notifications/mark-read", {
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
      await api.put("/jobseeker/notifications/mark-read", {
        notificationIds: ids,
      });
    } catch (err) {
      console.error("Error marking all read", err);
    }
  };

  const handleClearAll = async () => {
    const ids = notifications.map((n) => n._id);
    setNotifications([]);

    try {
      await api.post("/jobseeker/notifications/delete", {
        notificationIds: ids,
      });
    } catch (err) {
      console.error("Error clearing notifications", err);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return "";
    }
  };

  // pick icon based on type
  const getIcon = (type) => {
    switch (type) {
      case "message":
        return <MessageSquare className="text-primary" size={16} />;
      case "application":
        return <Briefcase className="text-primary" size={16} />;
      case "status":
        return <Bell className="text-primary" size={16} />;
      default:
        return <Bell className="text-primary" size={16} />;
    }
  };

  return (
    <JobseekerLayout>
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
                  <div className="flex items-center gap-2">
                    {getIcon(n.type)}
                    <p
                      className={`text-sm font-medium ${
                        !n.isRead
                          ? "text-white font-bold"
                          : "text-lightText"
                      }`}
                    >
                      {n.type.charAt(0).toUpperCase() + n.type.slice(1)}
                    </p>
                  </div>
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
    </JobseekerLayout>
  );
}
