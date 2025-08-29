import { LayoutGrid, Briefcase, FileText, MessageSquare, User, Settings, LogOut,  Bookmark  } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/authService"; // adjust if needed



const links = [
  { name: "Dashboard", icon: LayoutGrid, path: "/user/dashboard" },
  { name: "Jobs", icon: Briefcase, path: "/user/jobs" },
  { name: "Saved", icon: Bookmark, path: "/user/saved" },

  { name: "Applications", icon: FileText, path: "/user/applications" },
  { name: "Messages", icon: MessageSquare, path: "/user/messages" },
  { name: "Profile", icon: User, path: "/user/profile" },
  { name: "Settings", icon: Settings, path: "/user/settings" },
];

export default function JobseekerSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/user/login", { replace: true });
  };

  return (
    <div className="flex flex-col w-64 h-screen fixed top-0 left-0 bg-slate-900 border-r border-slate-800">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-slate-800 text-xl font-bold text-green-400">
        ConnectHire
      </div>

      {/* Nav Links */}
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
