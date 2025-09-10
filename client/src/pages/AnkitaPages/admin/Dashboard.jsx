import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Users, Flag, BarChart2 } from "lucide-react";
import api from "../../../secureApiForAdmin"; // your configured axios instance

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

  const [summary, setSummary] = useState({
    totalJobs: 0,
    totalCompanies: 0,
    totalJobseekers: 0,
    totalReports: 0,
  });

  const [latestReports, setLatestReports] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const response = await api.get("/admin/dashboard");
        const data = response.data;
        console.log(data);
        if (!mounted) return;

        setSummary({
          totalJobs: data.totalJobs || 0,
          totalCompanies: data.totalCompanies || 0,
          totalJobseekers: data.totalJobSeekers || 0,
          totalReports: data.totalReports || 0,
        });

        const reports = Array.isArray(data.latestReports) ? data.latestReports : [];
        setLatestReports(
          reports.map((r) => ({
            _id: r._id,
            subject: r.reason,
            reporter: r.reporter?.email || r.reporter?.name || "—",
          }))
        );
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      {/* Stat Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Briefcase className="w-6 h-6 text-sky-400" />}
          title="Total Jobs"
          value={loading ? "..." : summary.totalJobs}
          linkText="View jobs"
          linkTo="/admin/jobs"
        />
        <StatCard
          icon={<Users className="w-6 h-6 text-sky-400" />}
          title="Total Companies"
          value={loading ? "..." : summary.totalCompanies}
          linkText="View companies"
          linkTo="/admin/company"
        />
        <StatCard
          icon={<BarChart2 className="w-6 h-6 text-sky-400" />}
          title="Total Jobseekers"
          value={loading ? "..." : summary.totalJobseekers}
          linkText="View jobseekers"
          linkTo="/admin/jobseeker"
        />
        <StatCard
          icon={<Flag className="w-6 h-6 text-sky-400" />}
          title="Total Reports"
          value={loading ? "..." : summary.totalReports}
          linkText="View reports"
          linkTo="/admin/reports"
        />
      </section>

      {/* Latest Reports */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Latest Reports</h3>
          <Link to="/admin/reports" className="text-sky-400 text-sm hover:underline">
            Manage ({loading ? "..." : summary.totalReports})
          </Link>
        </div>

        {loading ? (
          <div className="text-slate-400">Loading...</div>
        ) : latestReports.length === 0 ? (
          <div className="text-slate-400">No reports</div>
        ) : (
          <ul className="space-y-3">
            {latestReports.map((r) => (
              <li key={r._id} className="flex items-start justify-between">
                <div>
                  <div className="font-medium text-white">{r.subject}</div>
                  <div className="text-xs text-slate-400">Reporter: {r.reporter}</div>
                </div>
                <div className="text-xs text-slate-300">
                  <Link to="/admin/reports" className="hover:underline">
                    Open
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
