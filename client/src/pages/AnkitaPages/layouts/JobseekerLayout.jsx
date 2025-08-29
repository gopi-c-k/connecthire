import { useState } from "react";
import { Outlet } from "react-router-dom";
import JobseekerSidebar from "../../../components/JobseekerSidebar";
import JobseekerNavbar from "../../../components/JobseekerNavbar";

export default function JobseekerLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-64 bg-slate-950 border-r border-slate-800">
        <JobseekerSidebar />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="relative w-64 bg-slate-950 border-r border-slate-800">
            <JobseekerSidebar />
          </div>
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main area */}
      <div className="flex flex-col flex-1 min-h-screen">
        <JobseekerNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}
