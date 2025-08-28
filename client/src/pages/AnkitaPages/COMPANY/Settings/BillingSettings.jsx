// src/pages/AnkitaPages/COMPANY/settings/BillingSettings.jsx
import React from "react";
const BillingSettings = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">💳 Billing & Subscription</h2>
    <p className="text-muted">Current Plan: <strong>Starter (Free)</strong></p>
    <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow-soft hover:bg-primaryDark transition">
      Upgrade Plan
    </button>
  </div>
);
export default BillingSettings;
