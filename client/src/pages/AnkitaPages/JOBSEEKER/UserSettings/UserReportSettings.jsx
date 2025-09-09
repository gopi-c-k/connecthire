import React, { useEffect, useState } from "react";
import api from "../../../../secureApiForUser";

export default function UserReportSettings() {
  const [reports, setReports] = useState([]);

  // Load saved reports on mount
  useEffect(() => {
    (async () => {
      try {
        const saved = localStorage.getItem("jobseeker_reports");
        const res = await api.get("/jobseeker/report");
        console.log(res);
        // Prefer live API data, fallback to localStorage
        if (res.data?.success) {
          setReports(res.data.data);
          localStorage.setItem(
            "jobseeker_reports",
            JSON.stringify(res.data.data)
          );
        } else if (saved) {
          setReports(JSON.parse(saved));
        }
      } catch (err) {
        console.warn("Failed to load jobseeker reports", err);
      }
    })();
  }, []);

  return (
    <div className="p-6 text-lightText">
      <h2 className="text-xl font-bold mb-4">Reported Company / Recruiter</h2>

      {/* Reports Table */}
      <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-900/60">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800/40">
            <tr>
              <th className="px-3 py-2">Reported User</th>
              <th className="px-3 py-2">Reason</th>
              <th className="px-3 py-2">Details</th>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-400">
                  No reports yet
                </td>
              </tr>
            )}
            {reports.map((r) => (
              <tr key={r._id} className="border-t border-slate-700">
                <td className="px-3 py-2">
                  {/* If backend populated reportedUser, show its name */}
                  {typeof r.reportedUser === "object"
                    ? r.reportedUser.name || r.reportedUser.companyName
                    : r.reportedUser}
                </td>
                <td className="px-3 py-2">{r.reason}</td>
                <td className="px-3 py-2">{r.details || "-"}</td>
                <td className="px-3 py-2">
                  {new Date(r.createdAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-2">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
