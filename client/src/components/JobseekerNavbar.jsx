import { useState, useEffect, useRef } from "react";
import { Menu, Bell, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService"; // adjust if needed

export default function JobseekerNavbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dummy notification simulation
  useEffect(() => {
    // TODO: Replace with websocket or API
    setNotificationsCount(2);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/user/login", { replace: true });
  };

  return (
    <header className="backdrop-blur-md bg-slate-900/70 border-b border-slate-800 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Mobile menu button */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>

        {/* Branding */}
        <Link
          to="/user/dashboard"
          className="font-semibold text-white text-lg"
        >
           <span className="text-green-400">Jobseeker Dashboard</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Messages */}
          <Link
            to="/user/messages"
            className="text-slate-300 hover:text-white relative"
          >
            <MessageSquare size={22} />
          </Link>

          {/* Notifications */}
          <div className="relative">
            <Bell
              className="text-slate-300 cursor-pointer hover:text-white"
              size={22}
            />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {notificationsCount}
              </span>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <img
              src="https://ui-avatars.com/api/?name=User"
              alt="Profile"
              className="w-8 h-8 rounded-full border border-slate-700 cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
                <button
                  onClick={() => navigate("/user/profile")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-700"
                >
                  Profile
                </button>
                <button
                  onClick={() => navigate("/user/settings")}
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
    </header>
  );
}
