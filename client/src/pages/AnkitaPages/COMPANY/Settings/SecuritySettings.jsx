// src/pages/AnkitaPages/COMPANY/settings/SecuritySettings.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const SecuritySettings = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">🔐 Security</h2>
      <div className="space-y-4">
        {/* ✅ Change Password Button */}
        <button
          onClick={() => navigate("/company/change-password")}
          className="px-4 py-2 mx-2 bg-primary text-white rounded-lg shadow-soft hover:bg-primaryDark transition"
        >
          Change Password
        </button>

        {/* Future features */}
        <button className="px-4 py-2 mx-2 bg-mediumGray/30 text-lightText rounded-lg hover:bg-mediumGray/50 transition">
          Enable 2FA
        </button>
        <button className="px-4 py-2 mx-2 bg-mediumGray/30 text-lightText rounded-lg hover:bg-mediumGray/50 transition">
          Manage Sessions
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;
