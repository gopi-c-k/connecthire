import React, { useEffect, useState } from "react";

/**
 * Jobseeker Report Page
 * - Jobseeker can report a Company / Recruiter
 * - Saves reports to localStorage (frontend-only)
 * - Fields: targetName, reason, details
 */

export default function UserReportSettings() {
  const [reports, setReports] = useState([]);
  const [targetName, setTargetName] = useState("");
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  // Load saved reports on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("jobseeker_reports");
      if (saved) setReports(JSON.parse(saved));
    } catch (err) {
      console.warn("Failed to load jobseeker reports", err);
    }
  }, []);

  // Save reports on change
  useEffect(() => {
    try {
      localStorage.setItem("jobseeker_reports", JSON.stringify(reports));
    } catch (err) {
      console.warn("Failed to save jobseeker reports", err);
    }
  }, [reports]);

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = targetName.trim();
    const r = reason.trim();
    const d = details.trim();

    if (!name || !r) {
      alert("Please provide the company/recruiter name and a reason.");
      return;
    }

    const newReport = {
      id: Date.now(),
      targetName: name,
      reason: r,
      details: d,
      createdAt: new Date().toLocaleString(),
    };

    setReports((prev) => [newReport, ...prev]);
    setTargetName("");
    setReason("");
    setDetails("");
    alert("Report submitted (frontend only)");
  };

  // Delete report
  const handleDelete = (id) => {
    if (!window.confirm("Delete this report?")) return;
    setReports((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="p-6 text-lightText">
      <h2 className="text-xl font-bold mb-4">Report a Company / Recruiter</h2>

      {/* Report Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700 space-y-3"
      >
        <input
          type="text"
          placeholder="Company or recruiter name"
          value={targetName}
          onChange={(e) => setTargetName(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-900/60"
        />

        <input
          type="text"
          placeholder="Reason (e.g. spam, harassment)"
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
              setTargetName("");
              setReason("");
              setDetails("");
            }}
            className="px-4 py-2 rounded bg-slate-700 text-white"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Reports Table */}
      <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-900/60">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800/40">
            <tr>
              <th className="px-3 py-2">Target</th>
              <th className="px-3 py-2">Reason</th>
              <th className="px-3 py-2">Details</th>
              <th className="px-3 py-2">Created</th>
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
