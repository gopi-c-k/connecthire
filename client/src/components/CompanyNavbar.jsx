// src/components/CompanyNavbar.jsx
import { useState, useEffect, useRef } from "react";
import { Bell, Menu, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import api from "../secureApi";

export default function CompanyNavbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Fetch notifications count (no async directly in useEffect)
  useEffect(() => {
    const fetchNotificationsCount = async () => {
      try {
        const res = await api.get("/company/notifications/count");
        setNotificationsCount(
          res.data.data || 0
        );
      } catch (error) {
        console.error("Error fetching notifications count:", error);
      }
    };
    fetchNotificationsCount();
  }, []);

  // ✅ Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `/api/company/search?q=${encodeURIComponent(searchQuery)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      console.log("Search results:", data);
      // TODO: Navigate to search results page
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    logout();
    navigate("/company/login", { replace: true });
  };

  return (
    <header className="backdrop-blur-md bg-slate-900/70 border-b border-slate-800 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Mobile menu button */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-md mx-4 hidden md:flex"
        >
          <input
            type="text"
            placeholder="Search jobs, applicants, messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-sm bg-slate-800 border border-slate-700 rounded-full focus:outline-none focus:border-sky-500 text-white placeholder-slate-400"
          />
        </form>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Messages Icon */}
          <button
            onClick={() => navigate("/company/messages")}
            className="relative text-slate-300 hover:text-white"
            aria-label="Open messages"
            title="Messages"
          >
            <MessageSquare size={20} />
          </button>

          {/* Notification Bell */}
          <button
            onClick={() => navigate("/company/notifications")}
            className="relative"
            aria-label="Open notifications"
            title="Notifications"
          >
            <Bell
              className="text-slate-300 cursor-pointer hover:text-white"
              size={22}
            />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {notificationsCount}
              </span>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <img
              src="https://ui-avatars.com/api/?name=Company"
              alt="Profile"
              className="w-8 h-8 rounded-full border border-slate-700 cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
                <button
                  onClick={() => navigate("/company/profile")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-700"
                >
                  Profile
                </button>
                <button
                  onClick={() => navigate("/company/settings")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-700"
                >
                  Account Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="px-4 pb-3 md:hidden">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-sm bg-slate-800 border border-slate-700 rounded-full focus:outline-none focus:border-sky-500 text-white placeholder-slate-400"
          />
        </form>
      </div>
    </header>
  );
}
