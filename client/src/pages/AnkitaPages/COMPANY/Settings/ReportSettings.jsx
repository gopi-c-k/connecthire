import React, { useEffect, useState } from "react";

// Simple Company Report User Page (updated)
// - trims inputs before submit
// - persists reports to localStorage so they survive page reloads
// - adds a Delete button per row to remove a report

export default function ReportSettings() {
  const [reports, setReports] = useState([]);
  const [userName, setUserName] = useState("");
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  // load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("company_reports");
      if (saved) setReports(JSON.parse(saved));
    } catch (err) {
      console.warn("Failed to load saved reports", err);
    }
  }, []);

  // persist to localStorage whenever reports change
  useEffect(() => {
    try {
      localStorage.setItem("company_reports", JSON.stringify(reports));
    } catch (err) {
      console.warn("Failed to save reports", err);
    }
  }, [reports]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = userName.trim();
    const r = reason.trim();
    const d = details.trim();

    if (!name || !r) {
      alert("Please provide user name and reason.");
      return;
    }

    const newReport = {
      id: Date.now(),
      userName: name,
      reason: r,
      details: d,
      createdAt: new Date().toLocaleString(),
    };

    setReports((prev) => [newReport, ...prev]);
    setUserName("");
    setReason("");
    setDetails("");
    alert("Report submitted (frontend only)");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this report?")) return;
    setReports((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="p-6 text-lightText">
      <h2 className="text-xl font-bold mb-4">Report a User</h2>

      {/* Report Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700 space-y-3"
      >
        <input
          type="text"
          placeholder="User name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-900/60"
        />

        <input
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-900/60"
        />

        <textarea
          placeholder="Additional details (optional)"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-900/60"
          rows={3}
        />

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-primary text-white"
          >
            Submit Report
          </button>
          <button
            type="button"
            onClick={() => {
              setUserName("");
              setReason("");
              setDetails("");
            }}
            className="px-4 py-2 rounded bg-slate-700 text-white"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Reports List */}
      <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-900/60">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800/40">
            <tr>
              <th className="px-3 py-2">User</th>
              <th className="px-3 py-2">Reason</th>
              <th className="px-3 py-2">Details</th>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2"> </th>
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
                <td className="px-3 py-2 align-top">{r.userName}</td>
                <td className="px-3 py-2 align-top">{r.reason}</td>
                <td className="px-3 py-2 align-top">{r.details}</td>
                <td className="px-3 py-2 align-top">{r.createdAt}</td>
                <td className="px-3 py-2 align-top">
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
