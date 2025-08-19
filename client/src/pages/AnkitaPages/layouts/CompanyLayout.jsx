import { useState } from "react";
import CompanySidebar from "../../../components/CompanySidebar";
import CompanyNavbar from "../../../components/CompanyNavbar";

export default function CompanyLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-64 bg-slate-950 border-r border-slate-800">
        <CompanySidebar />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="relative w-64 bg-slate-950 border-r border-slate-800">
            <CompanySidebar />
          </div>
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main area */}
      <div className="flex flex-col flex-1 min-h-screen">
        <CompanyNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
