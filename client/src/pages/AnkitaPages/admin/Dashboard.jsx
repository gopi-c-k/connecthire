import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Users, Flag, BarChart2 } from "lucide-react";

/**
 * Admin Dashboard (pages/AnkitaPages/admin/Dashboard.jsx)
 *
 * - Uses mock data by default so it's fully functional immediately.
 * - To use real backend: replace the `fetchX()` mock functions with real api calls
 *   (use your api instance or adminService).
 */

const StatCard = ({ icon, title, value, linkText, linkTo }) => (
  <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
    <div className="flex items-start gap-4">
      <div className="p-2 rounded-md bg-slate-700/40">{icon}</div>
      <div className="flex-1">
        <div className="text-sm text-slate-300">{title}</div>
        <div className="text-2xl font-semibold text-white">{value}</div>
        {linkTo && (
          <div className="mt-3">
            <Link to={linkTo} className="text-sm text-sky-400 hover:underline">
              {linkText || "View details →"}
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  // Stats
  const [stats, setStats] = useState({
    pendingJobs: 0,
    pendingEmployers: 0,
    reportedItems: 0,
    totalJobs: 0,
  });

  // Recent lists
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentReports, setRecentReports] = useState([]);
  const [topEmployers, setTopEmployers] = useState([]);

  // -------------------------
  // Mock fetchers (replace these with real API calls)
  // -------------------------
  const fetchOverview = async () => {
    // Example real request (uncomment & adapt):
    // const res = await api.get("/admin/overview", { withCredentials: true });
    // return res.data;
    await new Promise((r) => setTimeout(r, 400)); // simulate latency
    return {
      pendingJobs: 5,
      pendingEmployers: 2,
      reportedItems: 3,
      totalJobs: 128,
    };
  };

  const fetchRecentJobs = async () => {
    await new Promise((r) => setTimeout(r, 300));
    return [
      { id: "j_1", title: "Frontend Developer", company: "Acme Corp", type: "Remote" },
      { id: "j_2", title: "React Native Engineer", company: "StartUp Ltd", type: "Remote" },
      { id: "j_3", title: "Backend Engineer", company: "Acme Corp", type: "Onsite" },
    ];
  };

  const fetchRecentReports = async () => {
    await new Promise((r) => setTimeout(r, 200));
    return [
      { id: "r_1", reason: "duplicate job", reporter: "user@example.com", target: "j_5" },
      { id: "r_2", reason: "suspicious employer", reporter: "a@b.com", target: "company_12" },
    ];
  };

  const fetchTopEmployers = async () => {
    await new Promise((r) => setTimeout(r, 200));
    return [
      { id: "c_1", name: "Acme Corp", jobs: 14 },
      { id: "c_2", name: "StartUp Ltd", jobs: 8 },
    ];
  };

  // -------------------------
  // Load data
  // -------------------------
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const [ov, jobs, reports, top] = await Promise.all([
          fetchOverview(),
          fetchRecentJobs(),
          fetchRecentReports(),
          fetchTopEmployers(),
        ]);
        if (!mounted) return;
        setStats(ov);
        setRecentJobs(jobs);
        setRecentReports(reports);
        setTopEmployers(top);
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  // -------------------------
  // Actions (example: approve/reject)
  // Replace with real API calls later
  // -------------------------
  const handleApproveJob = async (jobId) => {
    // TODO: call admin API to approve job
    setRecentJobs((prev) => prev.filter((j) => j.id !== jobId));
    setStats((s) => ({ ...s, pendingJobs: Math.max(0, s.pendingJobs - 1) }));
  };

  const handleDeleteReport = async (reportId) => {
    // TODO: call admin API to resolve report
    setRecentReports((prev) => prev.filter((r) => r.id !== reportId));
    setStats((s) => ({ ...s, reportedItems: Math.max(0, s.reportedItems - 1) }));
  };

  // -------------------------
  // Render
  // -------------------------
  return (
    <div>
      
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Briefcase className="w-6 h-6 text-sky-400" />}
          title="Pending Jobs"
          value={loading ? "..." : stats.pendingJobs}
          linkText="Review jobs"
          linkTo="/admin/jobs?status=pending"
        />
        <StatCard
          icon={<Users className="w-6 h-6 text-sky-400" />}
          title="Pending Employers"
          value={loading ? "..." : stats.pendingEmployers}
          linkText="Review employers"
          linkTo="/admin/employers?status=pending"
        />
        <StatCard
          icon={<Flag className="w-6 h-6 text-sky-400" />}
          title="Reported Items"
          value={loading ? "..." : stats.reportedItems}
          linkText="Open reports"
          linkTo="/admin/reports"
        />
        <StatCard
          icon={<BarChart2 className="w-6 h-6 text-sky-400" />}
          title="Total Jobs"
          value={loading ? "..." : stats.totalJobs}
          linkText="All jobs"
          linkTo="/admin/jobs"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Recent Pending Jobs */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Recent Pending Jobs</h3>
            <Link to="/admin/jobs" className="text-sky-400 text-sm hover:underline">See all</Link>
          </div>

          {loading ? (
            <div className="text-slate-400">Loading...</div>
          ) : recentJobs.length === 0 ? (
            <div className="text-slate-400">No pending jobs</div>
          ) : (
            <ul className="space-y-3">
              {recentJobs.map((job) => (
                <li key={job.id} className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-white">{job.title}</div>
                    <div className="text-xs text-slate-400">{job.company} • {job.type}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveJob(job.id)}
                      className="px-3 py-1 rounded-md bg-sky-500 text-white text-sm"
                    >
                      Approve
                    </button>
                    <Link to={`/admin/jobs/${job.id}`} className="text-slate-300 text-sm hover:underline">
                      View
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right: Recent Reports & Top Employers */}
        <div className="space-y-6">
          <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Recent Reports</h3>
              <Link to="/admin/reports" className="text-sky-400 text-sm hover:underline">Manage</Link>
            </div>

            {loading ? (
              <div className="text-slate-400">Loading...</div>
            ) : recentReports.length === 0 ? (
              <div className="text-slate-400">No reports</div>
            ) : (
              <ul className="space-y-3">
                {recentReports.map((r) => (
                  <li key={r.id} className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-white">{r.reason}</div>
                      <div className="text-xs text-slate-400">Reporter: {r.reporter}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteReport(r.id)}
                        className="px-3 py-1 rounded-md bg-red-600 text-white text-sm"
                      >
                        Resolve
                      </button>
                      <Link to={`/admin/jobs/${r.target}`} className="text-slate-300 text-sm hover:underline">
                        Open
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Top Employers</h3>
              <Link to="/admin/employers" className="text-sky-400 text-sm hover:underline">See all</Link>
            </div>

            {loading ? (
              <div className="text-slate-400">Loading...</div>
            ) : topEmployers.length === 0 ? (
              <div className="text-slate-400">No employers</div>
            ) : (
              <ul className="space-y-2 text-sm">
                {topEmployers.map((c) => (
                  <li key={c.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">{c.name}</div>
                      <div className="text-xs text-slate-400">{c.jobs} jobs</div>
                    </div>
                    <Link to={`/admin/employers`} className="text-slate-300 hover:underline text-sm">View</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
