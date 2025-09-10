import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Users, Flag, BarChart2 } from "lucide-react";
import adminService from "../../../services/adminService";

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

  // fallback if backend is unavailable
  const MOCK_SUMMARY = {
    totalJobs: 128,
    totalCompanies: 34,
    totalJobseekers: 542,
    totalReports: 7,
  };

  const MOCK_REPORTS = [
    { id: "r1", subject: "duplicate job", reporter: "user@example.com" },
    { id: "r2", subject: "fake employer", reporter: "test@abc.com" },
    { id: "r3", subject: "spam posting", reporter: "xyz@demo.com" },
  ];

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const sResp = await adminService.getDashboardSummary().catch(() => ({ data: MOCK_SUMMARY }));
        const sData = sResp?.data || MOCK_SUMMARY;

        const rResp = await adminService.getReports(1, 3, "", {}).catch(() => ({ data: MOCK_REPORTS }));
        const rPayload = rResp?.data;
        const rList = Array.isArray(rPayload) ? rPayload : rPayload?.data || MOCK_REPORTS;

        if (!mounted) return;
        setSummary({
          totalJobs: sData.totalJobs ?? sData.jobs ?? 0,
          totalCompanies: sData.totalCompanies ?? sData.companies ?? sData.employers ?? 0,
          totalJobseekers: sData.totalJobseekers ?? sData.jobseekers ?? sData.users ?? 0,
          totalReports: sData.totalReports ?? sData.reports ?? rList.length,
        });
        setLatestReports(rList.slice(0, 3));
      } catch (err) {
        console.error("Dashboard load error:", err);
        setSummary(MOCK_SUMMARY);
        setLatestReports(MOCK_REPORTS);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
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
              <li key={r.id || r._id} className="flex items-start justify-between">
                <div>
                  <div className="font-medium text-white">
                    {r.subject || r.reason || `${r.type || "Report"} ${r.targetId || ""}`}
                  </div>
                  <div className="text-xs text-slate-400">
                    Reporter: {r.reporterName || r.reporter || r.reporterId || "—"}
                  </div>
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
