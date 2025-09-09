import React, { useEffect, useState } from "react";
import api from "../../../../secureApi";

export default function ReportSettings() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/company/report");

        if (res.data?.success && Array.isArray(res.data.data)) {
          setReports(res.data.data);
        }
      } catch (err) {
        console.warn("Failed to load saved reports", err);
      }
    })();
  }, []);

  return (
    <div className="p-6 text-lightText">
      <h2 className="text-xl font-bold mb-4">Reported Users</h2>

      <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-900/60">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800/40">
            <tr>
              <th className="px-3 py-2">User</th>
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
                <td className="px-3 py-2 align-top">
                  {/* Show fullName if available, else ID */}
                  {r.reportedUser?.fullName ||
                    r.reportedUser?.companyName ||
                    r.reportedUser ||
                    "Unknown"}
                </td>
                <td className="px-3 py-2 align-top">{r.reason}</td>
                <td className="px-3 py-2 align-top">{r.details || "-"}</td>
                <td className="px-3 py-2 align-top">
                  {new Date(r.createdAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-2 align-top">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
