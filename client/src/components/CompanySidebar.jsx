import { Home, FilePlus, Briefcase, Users, MessageSquare, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", icon: Home, path: "/company-dashboard" },
  { name: "Post Job", icon: FilePlus, path: "/company/job-post" },
  { name: "Manage Jobs", icon: Briefcase, path: "/company/jobs" },
  { name: "Applicants", icon: Users, path: "/company/jobs/applicants" },
  { name: "Messages", icon: MessageSquare, path: "/company/messages" },
  { name: "Settings", icon: Settings, path: "/company/settings" },
];

export default function CompanySidebar() {
  return (
    <div className="flex flex-col w-64 h-screen fixed top-0 left-0 bg-slate-900 border-r border-slate-800">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-slate-800 text-xl font-bold text-green-400">
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
      <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 transition border-t border-slate-800">
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
