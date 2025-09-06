import React, { useEffect, useState } from "react";


export default function UserReportSettings() {
  const [reports, setReports] = useState([]);

  // Load saved reports on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("jobseeker_reports");
      if (saved) setReports(JSON.parse(saved));
    } catch (err) {
      console.warn("Failed to load jobseeker reports", err);
    }
  }, []);

  // Delete report
  const handleDelete = (id) => {
    if (!window.confirm("Delete this report?")) return;
    setReports((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="p-6 text-lightText">
      <h2 className="text-xl font-bold mb-4">Reported Company / Recruiter</h2>

      {/* Reports Table */}
      <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-900/60">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800/40">
            <tr>
              <th className="px-3 py-2">Target</th>
              <th className="px-3 py-2">Reason</th>
              <th className="px-3 py-2">Details</th>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400">
                  No reports yet
                </td>
              </tr>
            )}
            {reports.map((r) => (
              <tr key={r.id} className="border-t border-slate-700">
                <td className="px-3 py-2">{r.targetName}</td>
                <td className="px-3 py-2">{r.reason}</td>
                <td className="px-3 py-2">{r.details}</td>
                <td className="px-3 py-2">{r.createdAt}</td>
                <td className="px-3 py-2">{r.status}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="px-2 py-1 rounded bg-red-600 text-white text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
