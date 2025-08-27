import React, { useState } from "react";
import CompanyLayout from "../layouts/CompanyLayout";

const CompanyDashboard = () => {
  // Static demo data (replace with real API data later via companyService)
  const [stats] = useState({
    activeJobs: 8,
    totalApplicants: 124,
    shortlisted: 15,
    interviews: 6,
  });

  const [recentActivity] = useState([
    { name: "John Doe", role: "Frontend Developer", date: "2025-08-12", status: "Shortlisted" },
    { name: "Jane Smith", role: "Backend Developer", date: "2025-08-10", status: "Pending" },
    { name: "Rahul Mehta", role: "UI Designer", date: "2025-08-08", status: "Hired" },
  ]);

  return (
    <CompanyLayout>
      <div className="p-6 text-lightText">
        {/* Heading */}
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="Active Jobs" value={stats.activeJobs} color="primary" />
          <StatCard title="Applicants" value={stats.totalApplicants} color="accent" />
          <StatCard title="Shortlisted" value={stats.shortlisted} color="success" />
          <StatCard title="Interviews" value={stats.interviews} color="primary" />
        </div>

        {/* Recent Activity */}
        <div className="bg-surface rounded-xl shadow p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          {recentActivity.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Role</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity, index) => (
                  <tr key={index} className="border-t border-slate-700">
                    <td className="py-2">{activity.name}</td>
                    <td>{activity.role}</td>
                    <td>{new Date(activity.date).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          activity.status === "Shortlisted"
                            ? "bg-success text-white"
                            : activity.status === "Pending"
                            ? "bg-yellow-500 text-white"
                            : "bg-primary text-white"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted">No recent activity.</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-surface rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <QuickActionButton label="Post a Job" href="/company/job-post" />
            <QuickActionButton label="View Applicants" href="/company/applicants" />
            <QuickActionButton label="Company Profile" href="/company/profile" />
          </div>
        </div>
      </div>
    </CompanyLayout>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`bg-surface rounded-xl p-4 shadow border-l-4 border-${color} flex flex-col`}>
    <span className="text-muted text-sm">{title}</span>
    <span className="text-2xl font-bold">{value}</span>
  </div>
);

const QuickActionButton = ({ label, href }) => (
  <a
    href={href}
    className="bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg shadow transition"
  >
    {label}
  </a>
);

export default CompanyDashboard;
