import React, { useState, useEffect } from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import api from "../../../services/secureApi";

const CompanyDashboard = () => {
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplicants: 0,
    shortlisted: 0,
    interviews: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await api.get("/company/current-status");

        setStats({
          activeJobs: res.data.totalActiveJobPostings,
          totalApplicants: res.data.totalProposalsReceived,
          shortlisted: res.data.totalShortlistedCandidates,
          interviews: res.data.totalInterviewedCandidates,
        });

        setRecentActivity(
          res.data.proposals.map((p) => ({
            name: p.jobSeeker?.fullName || "Unknown",
            role: p.job?.title || "N/A",
            date: p.recentUpdate || p.createdAt,
            status: p.status,
          }))
        );
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  return (
    <CompanyLayout>
      <div className="p-6 text-lightText">
        {/* Heading */}
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : (
          <>
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
                      <th className="pb-2">Applicant Name</th>
                      <th className="pb-2">Job Title</th>
                      <th className="pb-2">Last Update</th>
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
                              activity.status === "shortlisted"
                                ? "bg-success text-white"
                                : activity.status === "pending"
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
          </>
        )}
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
