// src/pages/AnkitaPages/COMPANY/settings/SupportSettings.jsx
import React from "react";
const SupportSettings = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">💡 Support</h2>
    <p className="text-muted mb-4">Need help? Visit our help center or raise a ticket.</p>
    <div className="space-x-3">
      <button className="px-4 py-2 bg-primary text-white rounded-lg shadow-soft hover:bg-primaryDark transition">
        Help Center
      </button>
      <button className="px-4 py-2 bg-mediumGray/30 text-lightText rounded-lg hover:bg-mediumGray/50 transition">
        Raise Ticket
      </button>
    </div>
  </div>
);
export default SupportSettings;
