import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  CalendarCheck,
  Bookmark,
  MessageSquare,
  Briefcase,
  Building2,
} from "lucide-react";

import JobseekerLayout from "../layouts/JobseekerLayout";

export default function Dashboard() {
  // Static demo data (replace with real API later)
  const [stats] = useState({
    applications: 12,
    interviews: 3,
    savedJobs: 8,
    messages: 5,
  });

  const [recentActivity] = useState([
    { action: "Applied", job: "Frontend Developer", company: "PixelWorks", date: "2025-08-20", status: "Pending" },
    { action: "Viewed", job: "React Developer", company: "SkyTech", date: "2025-08-18", status: "Viewed" },
    { action: "Interview", job: "Backend Engineer", company: "BrightSoft", date: "2025-08-15", status: "Scheduled" },
  ]);

  const [recommended] = useState([
    { id: "101", title: "Frontend Developer", company: "Nova Labs", type: "Full-time", location: "Remote" },
    { id: "102", title: "React Native Engineer", company: "SkyTech", type: "Contract", location: "Bengaluru" },
    { id: "103", title: "UI Engineer", company: "BrightSoft", type: "Hybrid", location: "Pune" },
  ]);

  return (
    <JobseekerLayout>
      <div className="p-6 text-lightText space-y-6">
        {/* Heading */}
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Applications" value={stats.applications} icon={<FileText size={18} />} color="primary" />
          <StatCard title="Interviews" value={stats.interviews} icon={<CalendarCheck size={18} />} color="accent" />
          <StatCard title="Saved Jobs" value={stats.savedJobs} icon={<Bookmark size={18} />} color="success" />
          <StatCard title="Messages" value={stats.messages} icon={<MessageSquare size={18} />} color="primary" />
        </div>

        {/* Recent Activity */}
        <div className="bg-surface rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          {recentActivity.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="pb-2">Action</th>
                  <th className="pb-2">Job</th>
                  <th className="pb-2">Company</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((item, index) => (
                  <tr key={index} className="border-t border-slate-700">
                    <td className="py-2">{item.action}</td>
                    <td>{item.job}</td>
                    <td>{item.company}</td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          item.status === "Scheduled"
                            ? "bg-success text-white"
                            : item.status === "Viewed"
                            ? "bg-info text-white"
                            : "bg-primary text-white"
                        }`}
                      >
                        {item.status}
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

        {/* Recommended Jobs */}
        <div className="bg-surface rounded-xl shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recommended Jobs</h2>
            <Link to="/user/jobs" className="text-info hover:underline text-sm">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recommended.map((job) => (
              <div
                key={job.id}
                className="rounded-xl border border-slate-700 bg-darkGray/60 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-bg border border-slate-700">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <div className="font-medium">{job.title}</div>
                    <div className="text-sm text-muted flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Building2 size={14} /> {job.company}
                      </span>
                      <span>•</span>
                      <span>{job.type}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/user/jobs/${job.id}`}
                  className="px-3 py-2 rounded-lg bg-accent text-white hover:shadow-glowAccent text-sm text-center"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-surface rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <QuickActionButton label="Update Profile" href="/user/profile" />
            <QuickActionButton label="Browse Jobs" href="/user/jobs" />
            <QuickActionButton label="Saved Jobs" href="/user/saved" />

            <QuickActionButton label="Check Applications" href="/user/applications" />
          </div>
        </div>
      </div>
    </JobseekerLayout>
  );
}

const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-surface rounded-xl p-4 shadow border-l-4 border-${color} flex flex-col`}>
    <span className="text-muted text-sm flex items-center gap-2">{icon} {title}</span>
    <span className="text-2xl font-bold">{value}</span>
  </div>
);

const QuickActionButton = ({ label, href }) => (
  <Link
    to={href}
    className="bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg shadow transition"
  >
    {label}
  </Link>
);
