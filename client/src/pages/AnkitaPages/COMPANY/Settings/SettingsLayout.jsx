// src/pages/AnkitaPages/COMPANY/Settings/SettingsLayout.jsx
import React from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  Navigate,
  Link
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import CustomSelect from "../../../../components/CustomSelect";
import { ArrowLeftIcon } from "lucide-react";

export default function CompanySettingsLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Static links
  const links = [
    { name: "Account", path: "account" },
    { name: "Report", path: "reports" },
    { name: "Security", path: "security" }, // lowercase match
    { name: "Danger Zone", path: "danger" },
  ];

  // Directly map options (no useMemo needed)
  const options = links.map((link) => ({
    value: link.path,
    label: link.name,
  }));

  const currentPath = location.pathname.split("/").pop();

  // If user hits /company/settings (no child), show /company/settings/account
  if (
    location.pathname === "/company/settings" ||
    location.pathname === "/company/settings/"
  ) {
    return <Navigate to="/company/settings/account" replace />;
  }

  return (
    <div className="p-6 text-lightText">
      {/* Navbar Header */}
      <div className="sticky top-0 z-10 mb-6">
        <div className="backdrop-blur-lg bg-surface/30 border-b border-slate-700 px-4 sm:px-6 py-3 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Left side - Heading */}
          <div className="flex items-center gap-2">
            <Link to="/company-dashboard" className="flex items-center gap-2 shrink-0">
              <ArrowLeftIcon size={18} />
            </Link>
            <h1 className="text-xl font-bold text-lightText shrink-0">
              Company Settings
            </h1>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden sm:flex gap-4">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1 rounded-lg transition text-sm ${isActive
                    ? "bg-primary text-white"
                    : "text-gray-300 hover:bg-slate-800"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile CustomSelect */}
          <div className="sm:hidden w-full">
            <CustomSelect
              value={currentPath}
              onChange={(val) => navigate(`/company/settings/${val}`)}
              options={options}
            />
          </div>
        </div>
      </div>

      {/* Content Area with Animation */}
      <div className="flex-1 w-full max-w-5xl mx-auto bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-700/60 p-6 sm:p-8 my-6 shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
