import { Home, FilePlus, Briefcase, Users, MessageSquare, Settings, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/authService"; // adjust path if needed

const links = [
  { name: "Dashboard", icon: Home, path: "/company-dashboard" },
  { name: "Post Job", icon: FilePlus, path: "/company/job-post" },
  { name: "Manage Jobs", icon: Briefcase, path: "/company/jobs" },
  { name: "Applicants", icon: Users, path: "/company/jobs/applicants" },
  
  { name: "Settings", icon: Settings, path: "/company/settings" },
];

export default function CompanySidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clear token from localStorage
    navigate("/company/login", { replace: true }); // redirect to login
  };

  return (
    <div className="flex flex-col w-64 h-screen fixed top-0 left-0 bg-slate-900 border-r border-slate-800 ">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center  border-b border-slate-800 text-xl font-bold text-green-400">
        ConnectHire
      </div>

      {/* Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 transition ${
                isActive ? "bg-slate-800 text-green-400" : "text-gray-300"
              }`
            }
          >
            <link.icon size={18} />
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 transition border-t border-slate-800"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
