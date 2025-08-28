// src/pages/AnkitaPages/COMPANY/SettingsLayout.jsx
import React from "react";
import { NavLink, Outlet, useLocation, Navigate } from "react-router-dom";
import CompanyLayout from "../layouts/CompanyLayout";

const TABS = [
  { to: "profile", label: "Profile" },
  { to: "team", label: " Team" },
  { to: "notifications", label: "Notifications" },
  { to: "security", label: "Security" },
  { to: "billing", label: "Billing & Subscription" },
  { to: "compliance", label: "Compliance & Legal" },
  { to: "support", label: "Support" },
];

const SettingsLayout = () => {
  const { pathname } = useLocation();

  // If user hits /company/settings (no child), show /profile
  if (pathname === "/company/settings") {
    return <Navigate to="/company/settings/profile" replace />;
  }

  return (
    <CompanyLayout>
      <div className="max-w-6xl mx-auto px-6 py-8 text-lightText">
        <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-6 border-b border-mediumGray/40 pb-3">
          {TABS.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `px-5 py-2 rounded-t-lg text-sm font-medium transition-colors shadow-soft ${
                  isActive
                    ? "bg-primary text-lightText shadow-glowPrimary"
                    : "bg-surface text-muted hover:bg-mediumGray/30"
                }`
              }
              end
            >
              {tab.label}
            </NavLink>
          ))}
        </div>

        {/* Routed content */}
        <div className="bg-surface rounded-2xl shadow-medium p-6 border border-darkGray">
          <Outlet />
        </div>
      </div>
    </CompanyLayout>
  );
};

export default SettingsLayout;
