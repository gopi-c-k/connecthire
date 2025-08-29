// src/pages/AnkitaPages/COMPANY/settings/TeamSettings.jsx
import React from "react";

const TeamSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">👥 Account & Team</h2>
      <p className="text-muted mb-4">Manage your team members, roles, and permissions.</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-lightText mb-2">
            Invite Team Member (Email)
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter email"
              className="border border-mediumGray bg-darkGray text-lightText rounded-lg px-3 py-2 flex-1 placeholder-muted focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary hover:bg-primaryDark transition text-white px-4 py-2 rounded-lg shadow-soft">
              Invite
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Team Members</h3>
          <ul className="divide-y divide-mediumGray/30">
            <li className="flex items-center justify-between py-3">
              <span className="text-lightText">John Doe – Admin</span>
              <div className="flex gap-3 text-sm">
                <button className="text-primary hover:underline">Change Role</button>
                <button className="text-errorText hover:underline">Remove</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamSettings;
