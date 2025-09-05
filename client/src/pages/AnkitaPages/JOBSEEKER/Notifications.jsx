import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobseekerLayout from "../layouts/JobseekerLayout";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Replace with API
    const dummyNotifications = [
      {
        id: 1,
        title: "New Job Posted",
        message: "Google posted a new Frontend role",
        time: "10:45 AM",
        seen: false,
        link: "/user/jobs", // redirect to jobs
      },
      {
        id: 2,
        title: "Interview Update",
        message: "Microsoft scheduled your interview",
        time: "Yesterday",
        seen: false,
        link: "/user/applications", // redirect to applications
      },
      {
        id: 3,
        title: "Profile Viewed",
        message: "Amazon recruiter viewed your profile",
        time: "2 days ago",
        seen: true,
        link: "/user/profile",
      },
    ];
    setNotifications(dummyNotifications);
  }, []);

  const handleClick = (id, link) => {
    // Mark this notification as seen
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, seen: true } : n))
    );

    // Navigate if link available
    if (link) {
      navigate(link);
    }
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, seen: true })));
  };

  return (
    <JobseekerLayout>
      <div className="p-6 bg-bg text-lightText min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Notifications</h2>
          {notifications.some((n) => !n.seen) && (
            <button
              onClick={handleMarkAllRead}
              className="text-sm text-primary hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="bg-surface rounded-xl shadow-md divide-y divide-slate-700">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 cursor-pointer transition ${
                  n.seen ? "opacity-70" : "bg-darkGray"
                } hover:bg-mediumGray`}
                onClick={() => handleClick(n.id, n.link)}
              >
                <div className="flex justify-between items-center">
                  <p
                    className={`text-sm font-medium ${
                      !n.seen ? "text-white font-bold" : "text-lightText"
                    }`}
                  >
                    {n.title}
                  </p>
                  {!n.seen && (
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                  )}
                </div>
                <p className="text-xs text-muted">{n.message}</p>
                <span className="text-[10px] text-slate-500">{n.time}</span>
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
