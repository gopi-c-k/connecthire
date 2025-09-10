// src/components/AdminNavbar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomSelect from "./CustomSelect"; 
import { Grid,  LogOut } from "lucide-react";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "" },        
    { name: "JobSeeker", path: "jobseeker" },
    { name: "Company", path: "company" },
    { name: "Jobs", path: "jobs" },
    { name: "Reports", path: "reports" },
  ];

  const options = links.map((l) => ({ value: l.path || "", label: l.name }));

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("adminId");
    navigate("/admin/login", { replace: true });
  };

  // current path fragment (for CustomSelect value)
  const currentPath = window.location.pathname.split("/").pop();

  return (
    <nav className="sticky top-0 z-20">
      <div className="backdrop-blur-lg bg-surface/30 border-b border-slate-700 px-4 sm:px-6 py-3 rounded-xl mx-4 mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Left heading */}
        <div className="flex items-center gap-3">
          <Grid className="w-6 h-6 text-sky-400" />
          <div>
            <div className="text-lg font-bold text-lightText">Admin Panel</div>
            <div className="text-xs text-slate-400">Manage platform</div>
          </div>
        </div>

        {/* Desktop nav links (pills) */}
        <div className="hidden sm:flex gap-3 items-center">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path === "" ? "/admin" : `/admin/${link.path}`}
              end={link.path === ""} // Dashboard exact match
              className={({ isActive }) =>
                `px-3 py-1 rounded-lg text-sm transition ${
                  isActive ? "bg-primary text-white" : "text-gray-300 hover:bg-slate-800"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* small Logout button visually matching other items */}
          <button
            onClick={handleLogout}
            className="ml-2 px-3 py-1 rounded-lg text-sm text-red-400 hover:bg-slate-800"
          >
            <span className="inline-flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </span>
          </button>
        </div>

        {/* Mobile select */}
        <div className="sm:hidden w-full">
          <CustomSelect
            value={currentPath}
            onChange={(val) => {
              const path = val ? `/admin/${val}` : "/admin";
              navigate(path);
            }}
            options={options}
          />
        </div>
      </div>
    </nav>
  );
}
