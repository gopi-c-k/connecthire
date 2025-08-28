// src/pages/AnkitaPages/COMPANY/ApplicantsHub.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CompanyLayout from "../layouts/CompanyLayout";
import { companyService } from "../../../services/companyService";
import InputWithIcon from "../../../components/InputWithIcon";
import { Search } from "lucide-react";

const STATUS_BADGE = {
  applied: "bg-slate-700 text-slate-200",
  shortlisted: "bg-green-600 text-white",
  interviewing: "bg-blue-600 text-white",
  rejected: "bg-red-600 text-white",
  hired: "bg-purple-600 text-white",
};

export default function ApplicantsHub() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [items, setItems] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        setLoading(true);
        const [jobsRes, appsRes] = await Promise.all([
          companyService.listJobs({ limit: 200 }),
          companyService.listApplicants({ limit: 200 }),
        ]);
        if (!live) return;
        setJobs(jobsRes?.data || jobsRes || []);
        setItems(appsRes?.data || appsRes || []);
      } catch (e) {
        setErr("Failed to load applicants.");
      } finally {
        setLoading(false);
      }
    })();
    return () => { live = false; };
  }, []);

  const filtered = useMemo(() => {
    return (items || []).filter((a) => {
      const text = `${a?.name || ""} ${a?.email || ""} ${a?.jobTitle || ""}`.toLowerCase();
      const okQ = !q || text.includes(q.toLowerCase());
      const okS = !status || (a?.status || "").toLowerCase() === status;
      const okJ = !jobId || String(a?.jobId) === String(jobId);
      return okQ && okS && okJ;
    });
  }, [items, q, status, jobId]);

  return (
    <CompanyLayout>
      <div className="p-6 text-lightText">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Applicants</h1>
          <Link to="/company/jobs" className="px-4 py-2 rounded-lg bg-primary hover:bg-accent text-white shadow">
            Manage Jobs
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-surface rounded-xl p-4 shadow mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <InputWithIcon
            icon={Search}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, email, role..."
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg"
          >
            <option value="">All Statuses</option>
            <option value="applied">Applied</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interviewing">Interviewing</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>
          <select
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg"
          >
            <option value="">All Jobs</option>
            {jobs?.map((j) => (
              <option key={j.id || j._id} value={j.id || j._id}>
                {j.title}
              </option>
            ))}
          </select>
        </div>

        {/* List */}
        <div className="bg-surface rounded-xl p-4 shadow">
          {loading ? (
            <p className="text-muted">Loading...</p>
          ) : err ? (
            <p className="text-red-400">{err}</p>
          ) : filtered.length === 0 ? (
            <p className="text-muted">No applicants found.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Open</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id || a._id} className="border-t border-slate-800">
                    <td className="p-2">{a.name}</td>
                    <td className="p-2">{a.email}</td>
                    <td className="p-2">{a.jobTitle}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          STATUS_BADGE[(a.status || "").toLowerCase()] || "bg-slate-700 text-slate-200"
                        }`}
                      >
                        {a.status || "Applied"}
                      </span>
                    </td>
                    <td className="p-2">
                      {a.jobId ? (
                        <Link className="text-primary hover:underline" to={`/company/jobs/${a.jobId}/applicants`}>
                          View in Job
                        </Link>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </CompanyLayout>
  );
}
