// src/pages/AnkitaPages/COMPANY/ApplicantsHub.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CompanyLayout from "../layouts/CompanyLayout";
import secureApi from "../../../services/secureApi";
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

  const { id: routeJobId } = useParams();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [items, setItems] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState(null); // for per-job header

  // filters (global view only shows job dropdown)
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");

  useEffect(() => {
    let live = true;

    (async () => {
      try {
        setErr("");
        setLoading(true);

        // Always get jobs for dropdown (safe even on per-job view)
        const jobsReq = secureApi.get("/company/jobs", { params: { limit: 200 } });

        // If we’re on a per-job route, fetch applicants for that job and the job itself
        let appsReq, jobReq;
        if (routeJobId) {
          appsReq = secureApi.get("/company/applicants", {
            params: { limit: 200, jobId: routeJobId },
          });
          jobReq = secureApi.get(`/company/jobs/${routeJobId}`);
        } else {
          // Global view: fetch all applicants
          appsReq = secureApi.get("/company/applicants", { params: { limit: 200 } });
        }

        const [jobsRes, appsRes, jobRes] = await Promise.all([jobsReq, appsReq, jobReq]);

        if (!live) return;

        // Normalize shapes (handles both {data:[]} and nested)
        const jobsData = jobsRes?.data?.data ?? jobsRes?.data ?? [];
        const appsData = appsRes?.data?.data ?? appsRes?.data ?? [];
        const jobData = jobRes?.data?.data ?? jobRes?.data ?? null;

        setJobs(Array.isArray(jobsData) ? jobsData : []);
        setItems(Array.isArray(appsData) ? appsData : []);
        setJob(jobData || null);

        // If we came via per-job route, lock the jobId filter
        if (routeJobId) setJobId(String(routeJobId));
      } catch (e) {
        console.error(e);
        setErr(e?.response?.data?.message || "Failed to load applicants.");
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      live = false;
    };
  }, [routeJobId]);

  const filtered = useMemo(() => {
    return (items || []).filter((a) => {
      const text = `${a?.name || ""} ${a?.email || ""} ${a?.jobTitle || ""}`.toLowerCase();
      const okQ = !q || text.includes(q.toLowerCase());
      const okS = !status || (a?.status || "").toLowerCase() === status;

      // If on per-job route, force-match that job; otherwise use dropdown filter
      const desiredJobId = routeJobId ? String(routeJobId) : jobId ? String(jobId) : "";
      const okJ = !desiredJobId || String(a?.jobId) === desiredJobId;

      return okQ && okS && okJ;
    });
  }, [items, q, status, jobId, routeJobId]);

  const isPerJob = Boolean(routeJobId);

  return (
    <CompanyLayout>
      <div className="p-6 text-lightText">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">
              {isPerJob ? `${job?.title || "Job"} — Applicants` : "Applicants"}
            </h1>
            {isPerJob && (
              <p className="text-sm text-muted">
                Viewing applicants for this job only.
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Link
              to="/company/jobs"
              className="px-4 py-2 rounded-lg bg-primary hover:bg-accent text-white shadow"
            >
              Manage Jobs
            </Link>
            {!isPerJob && (
              <Link
                to="/company/applicants"
                className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white shadow"
              >
                All Applicants
              </Link>
            )}
          </div>
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

          {/* Hide the job filter on per-job view */}
          {!isPerJob ? (
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
          ) : (
            <div className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-muted">
              Job locked: {job?.title || routeJobId}
            </div>
          )}
        </div>

        {/* List */}
        <div className="bg-surface rounded-xl p-4 shadow overflow-x-auto">
          {loading ? (
            <p className="text-muted">Loading...</p>
          ) : err ? (
            <p className="text-red-400">{err}</p>
          ) : filtered.length === 0 ? (
            <p className="text-muted">No applicants found.</p>
          ) : (
            <table className="min-w-[720px] w-full text-left text-sm">
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
                          STATUS_BADGE[(a.status || "").toLowerCase()] ||
                          "bg-slate-700 text-slate-200"
                        }`}
                      >
                        {a.status || "Applied"}
                      </span>
                    </td>
                    <td className="p-2">
                      {a.jobId ? (
                        <Link
                          className="text-primary hover:underline"
                          to={`/company/jobs/${a.jobId}/applicants`}
                        >
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
