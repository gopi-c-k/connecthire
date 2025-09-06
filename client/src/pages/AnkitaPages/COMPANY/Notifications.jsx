// src/pages/COMPANY/Notifications.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CompanyLayout from "../layouts/CompanyLayout";

export default function CompanyNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: replace with real API call: GET /api/company/notifications
    const dummyNotifications = [
      {
        id: 1,
        title: "New Application",
        message: "Ankita Sharma applied for Frontend Developer (Job #234).",
        time: "10:45 AM",
        seen: false,
        link: "/company/jobs/234/applicants", // go to applicants for that job
      },
      {
        id: 2,
        title: "Message Received",
        message: "Rohit Verma sent you a message regarding Backend Engineer.",
        time: "Yesterday",
        seen: false,
        link: "/company/messages", // open messages page
      },
      {
        id: 3,
        title: "Job Expiring",
        message: "Your posting 'UI/UX Designer' will expire in 3 days.",
        time: "2 days ago",
        seen: true,
        link: "/company/jobs", // go to manage jobs
      },
    ];

    setNotifications(dummyNotifications);
  }, []);

  const handleClick = (id, link) => {
    // mark single notification as seen 
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, seen: true } : n)));

    // TODO: call API to mark seen: POST /api/company/notifications/:id/seen

    if (link) {
      navigate(link);
    }
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, seen: true })));
    // TODO: call API to mark all as read
  };

  const handleClearAll = () => {
    setNotifications([]);
    // TODO: call API to clear notifications if desired
  };

  return (
    <CompanyLayout>
      <div className="p-6 bg-bg text-lightText min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Notifications</h2>

          <div className="flex items-center gap-3">
            {notifications.some((n) => !n.seen) && (
              <button onClick={handleMarkAllRead} className="text-sm text-primary hover:underline">
                Mark all as read
              </button>
            )}
            {notifications.length > 0 && (
              <button onClick={handleClearAll} className="text-sm text-muted hover:underline">
                Clear all
              </button>
            )}
          </div>
        </div>

        <div className="bg-surface rounded-xl shadow-md divide-y divide-slate-700">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 cursor-pointer transition ${n.seen ? "opacity-70" : "bg-darkGray"} hover:bg-mediumGray`}
                onClick={() => handleClick(n.id, n.link)}
              >
                <div className="flex justify-between items-center">
                  <p className={`text-sm font-medium ${!n.seen ? "text-white font-bold" : "text-lightText"}`}>
                    {n.title}
                  </p>
                  {!n.seen && <span className="w-2 h-2 bg-primary rounded-full"></span>}
                </div>
                <p className="text-xs text-muted">{n.message}</p>
                <span className="text-[10px] text-slate-500">{n.time}</span>
              </div>
            ))
          ) : (
            <p className="p-4 text-sm text-muted text-center">No notifications</p>
          )}
        </div>
      </div>
    </CompanyLayout>
  );
}
