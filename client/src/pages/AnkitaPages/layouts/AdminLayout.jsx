// src/pages/AnkitaPages/layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../../components/AdminNavbar"; // <-- corrected path

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AdminNavbar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
