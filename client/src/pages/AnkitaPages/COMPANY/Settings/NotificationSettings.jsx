// src/pages/AnkitaPages/COMPANY/settings/NotificationSettings.jsx
import React from "react";

const NotificationSettings = () => {
  const items = [
    "New applicant",
    "Candidate moves stage",
    "Interview scheduled/cancelled",
    "Comment/mention on candidate",
  ];
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">🔔 Notifications</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-primary" />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;
