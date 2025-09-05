import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../secureApiForUser";
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
  const [userData, setUserData] = useState({});

  useEffect(() => {
    api
      .get("/jobseeker/dashboard")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  // derive stats
  const applications = userData.jobsApplied || 0;
  const interviews = userData.interviewedStatusCount || 0;
  const savedJobs = userData.jobsSaved || 0;
  const messages = userData.totalMessage || 0;

  const recentJobs = userData.recentJobsApplied || [];
  const recommended = userData.recommendedJobs || [];

  return (
    <JobseekerLayout>
      <div className="p-6 text-lightText space-y-6">
        {/* Heading */}
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Applications"
            value={applications}
            icon={<FileText size={18} />}
            color="primary"
          />
          <StatCard
            title="Interviews"
            value={interviews}
            icon={<CalendarCheck size={18} />}
            color="accent"
          />
          <StatCard
            title="Saved Jobs"
            value={savedJobs}
            icon={<Bookmark size={18} />}
            color="success"
          />
          <StatCard
            title="Messages"
            value={messages}
            icon={<MessageSquare size={18} />}
            color="primary"
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-surface rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          {recentJobs.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="pb-2">Job</th>
                  <th className="pb-2">Company</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentJobs.map((item, index) => (
                  <tr key={index} className="border-t border-slate-700">
                    <td className="py-2">{item.job?.title}</td>
                    <td>{item.company?.companyName}</td>
                    <td>
                      {item.recentUpdate
                        ? new Date(item.recentUpdate).toLocaleDateString()
                        : ""}
                    </td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${item.status === "Scheduled"
                            ? "bg-success text-white"
                            : item.status === "Viewed"
                              ? "bg-info text-white"
                              : item.status === "rejected"
                                ? "bg-red-600 text-white"
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
                key={job._id}
                className="rounded-xl border border-slate-700 bg-darkGray/60 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-bg border border-slate-700">
                    <Briefcase size={18} className="text-muted" />
                  </div>
                  <div>
                    <div className="font-medium">{job.title}</div>
                    <div className="text-sm text-muted flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Building2 size={14} />{" "}
                        {job.company.companyName}
                      </span>
                      <span>•</span>
                      <span>{job.duration || job.type}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/user/job/${job._id}`}
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
            <QuickActionButton
              label="Check Applications"
              href="/user/applications"
            />
          </div>
        </div>
      </div>
    </JobseekerLayout>
  );
}

// StatCard component
const StatCard = ({ title, value, icon, color }) => (
  <div
    className={`bg-surface rounded-xl p-4 shadow border-l-4 border-${color} flex flex-col`}
  >
    <span className="text-muted text-sm flex items-center gap-2">
      {icon} {title}
    </span>
    <span className="text-2xl font-bold">{value}</span>
  </div>
);

// QuickActionButton component
const QuickActionButton = ({ label, href }) => (
  <Link
    to={href}
    className="bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg shadow transition"
  >
    {label}
  </Link>
);
