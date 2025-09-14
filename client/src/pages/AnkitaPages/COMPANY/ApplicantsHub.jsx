// src/pages/AnkitaPages/COMPANY/ApplicantsHub.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CompanyLayout from "../layouts/CompanyLayout";
import InputWithIcon from "../../../components/InputWithIcon";
import { Search } from "lucide-react";
import api from "../../../secureApi";
import CompanyMessages from "./Messages";

const STATUS_BADGE = {
  applied: "bg-slate-700 text-slate-200",
  shortlisted: "bg-green-600 text-white",
  interviewed: "bg-blue-600 text-white",
  rejected: "bg-red-600 text-white",
  hired: "bg-purple-600 text-black",
};

export default function ApplicantsHub() {
  const { id } = useParams(); // jobId from route
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [items, setItems] = useState([]);
  const [updating, setUpdating] = useState({});
  const [message, setMessage] = useState("");

  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [jobFilter, setJobFilter] = useState("");

  const [selectedProposal, setSelectedProposal] = useState(null);
  const [activeConversationId, setActiveConversationId] = useState(null);


  // Fetch proposals
  useEffect(() => {
    let live = true;
    (async () => {
      try {
        setLoading(true);
        const res = await api.get("/company/job-proposals");
        if (!live) return;
        const appsRes = (res?.data?.proposals || []).map((p) => ({
          id: p._id,
          jobId: p.job?._id,
          jobTitle: p.job?.title,
          status: p.status,
          coverLetter: p.coverLetter,
          createdAt: p.createdAt,
          seeker: {
            id: p.jobSeeker?._id,
            name: p.jobSeeker?.fullName,
            avatar: p.jobSeeker?.profilePicture,
            resume: p.jobSeeker?.resume || null,
            // ✅ message allowed:
            message:
              p.jobSeeker?.messageAllowed === "anyone" ||
              p.jobSeeker?.messageAllowed === "recruiters",
            // ✅ control resume view separately:
            viewResume: p.jobSeeker?.viewResume,
          },
        }));

        setItems(appsRes);
      } catch (e) {
        console.error(e);
        setErr("Failed to load applicants.");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      live = false;
    };
  }, []);

  // Extract unique jobs for filtering
  const uniqueJobs = useMemo(() => {
    const jobs = new Map();
    items.forEach((a) => {
      if (a.jobId && a.jobTitle) {
        jobs.set(a.jobId, a.jobTitle);
      }
    });
    return Array.from(jobs, ([id, title]) => ({ id, title }));
  }, [items]);

  // Filters
  const filtered = useMemo(() => {
    return (items || []).filter((a) => {
      const text = `${a?.jobTitle || ""} ${a?.seeker?.name || ""}`.toLowerCase();
      const okQ = !q || text.includes(q.toLowerCase());
      const okS = !status || (a?.status || "").toLowerCase() === status;
      const okJ = id ? a?.jobId === id : !jobFilter || a?.jobId === jobFilter;
      return okQ && okS && okJ;
    });
  }, [items, q, status, id, jobFilter]);

  // Update status
  const handleStatusChange = async (id, newStatus) => {
    const applicant = items.find((a) => a.id === id);
    if (!applicant) return;

    if (!window.confirm(`Change status of ${applicant.seeker?.name} to "${newStatus}"?`)) {
      return;
    }

    setUpdating((prev) => ({ ...prev, [id]: true }));
    setMessage("");

    try {
      await api.put(`/job/proposal/${id}/status`, { status: newStatus });
      setItems((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
      setMessage(`${applicant.seeker?.name} moved to "${newStatus}".`);
    } catch (e) {
      console.error(e);
      setErr("Failed to update status.");
    } finally {
      setUpdating((prev) => ({ ...prev, [id]: false }));
      setTimeout(() => setMessage(""), 3000);
    }
  };


  const handleMessage = async (jobSeekerId, jobId) => {
    try {
      const res = await api.post(`/company/conversation`, { jobSeekerId, jobId });

      if (res.status === 200 || res.status === 201) {
        // backend returns conversation ID
        setActiveConversationId(res.data._id || res.data);
      }
    } catch (error) {
      console.error("Failed to start conversation:", error);
      alert(error.response?.data?.message || "Could not create/start conversation");
    }
  };


  return (
    <CompanyLayout>
      <div className="p-6 text-lightText">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Applicants</h1>
          <Link
            to="/company/jobs"
            className="px-4 py-2 rounded-lg bg-primary hover:bg-accent text-white shadow"
          >
            Manage Jobs
          </Link>
        </div>

        {message && (
          <div className="mb-4 p-3 rounded bg-green-700 text-white text-sm">{message}</div>
        )}
        {err && <div className="mb-4 p-3 rounded bg-red-700 text-white text-sm">{err}</div>}

        {/* Filters */}
        <div
          className={`bg-surface rounded-xl p-4 shadow mb-4 grid grid-cols-1 ${id ? `md:grid-cols-2` : `md:grid-cols-3`
            } gap-3`}
        >
          <InputWithIcon
            icon={Search}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search applicant or job..."
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg"
          >
            <option value="">All Statuses</option>
            <option value="applied">Applied</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interviewed">Interviewing</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>
          {!id && (
            <select
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg"
            >
              <option value="">All Jobs</option>
              {uniqueJobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Applicants List */}
        <div className="bg-surface rounded-xl p-4 shadow">
          {loading ? (
            <p className="text-muted">Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center py-12 text-muted border border-slate-700 rounded-lg">
              No applicants found.
            </p>
          ) : (
            <>
              {/* Mobile: Card layout */}
              <div className="space-y-3 md:hidden">
                {filtered.map((a) => (
                  <div
                    key={a.id}
                    className="p-4 rounded-lg bg-slate-800/40 border border-slate-700 shadow"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {a.seeker?.avatar ? (
                        <img
                          src={a.seeker.avatar}
                          alt={a.seeker.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm">
                          {a.seeker?.name?.[0]}
                        </div>
                      )}
                      <div>
                        <Link to={`/company/jobseeker/${a.seeker?.id}`}>
                          <h3 className="font-semibold">{a.seeker?.name}</h3>
                        </Link>
                        <p className="text-xs text-muted">{a.jobTitle}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted mb-2">
                      Applied: {new Date(a.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <select
                        value={a.status || "applied"}
                        disabled={updating[a.id]}
                        className={`px-2 py-1 text-xs rounded ${STATUS_BADGE[(a.status || "").toLowerCase()] ||
                          "bg-slate-700 text-slate-200"
                          }`}
                        onChange={(e) => handleStatusChange(a.id, e.target.value)}
                      >
                        <option value="applied">Applied</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="interviewed">Interviewing</option>
                        <option value="rejected">Rejected</option>
                        <option value="hired">Hired</option>
                      </select>
                      {updating[a.id] && (
                        <span className="ml-2 text-xs text-muted">Updating...</span>
                      )}
                    </div>
                    <div className="flex gap-4 text-sm">
                      <button
                        onClick={() => setSelectedProposal(a)}
                        className="text-primary hover:underline"
                      >
                        View Proposal
                      </button>
                      {/* ✅ resume only if allowed */}
                      {a.seeker?.viewResume && a.seeker?.resume && (
                        <a
                          href={a.seeker.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          View Resume
                        </a>
                      )}
                      {/* ✅ message button */}
                      {a.seeker?.message && (
                        <button
                          onClick={() => { handleMessage(a.seeker.id, a.jobId) }}
                          className="text-primary hover:underline"
                        >
                          Message
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop: Table layout */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-muted">
                    <tr>
                      <th className="p-2">Applicant</th>
                      <th className="p-2">Job</th>
                      <th className="p-2">Applied</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((a, idx) => (
                      <tr
                        key={a.id}
                        className={`border-t border-slate-800 ${idx % 2 === 0 ? "bg-slate-900/30" : "bg-slate-900/10"
                          } hover:bg-slate-700/30`}
                      >
                        {/* Applicant */}
                        <td className="p-2 flex items-center gap-2">
                          {a.seeker?.avatar ? (
                            <img
                              src={a.seeker.avatar}
                              alt={a.seeker.name}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">
                              {a.seeker?.name?.[0]}
                            </div>
                          )}
                          <Link to={`/company/jobseeker/${a.seeker?.id}`}>
                            <span>{a.seeker?.name}</span>
                          </Link>
                        </td>

                        {/* Job */}
                        <td className="p-2">{a.jobTitle}</td>

                        {/* Applied Date */}
                        <td className="p-2">
                          {new Date(a.createdAt).toLocaleDateString()}
                        </td>

                        {/* Status */}
                        <td className="p-2">
                          <select
                            value={a.status || "applied"}
                            disabled={updating[a.id]}
                            className={`px-2 py-1 text-xs rounded ${STATUS_BADGE[(a.status || "").toLowerCase()] ||
                              "bg-slate-700 text-slate-200"
                              }`}
                            onChange={(e) => handleStatusChange(a.id, e.target.value)}
                          >
                            <option value="applied">Applied</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="interviewed">Interviewing</option>
                            <option value="rejected">Rejected</option>
                            <option value="hired">Hired</option>
                          </select>
                          {updating[a.id] && (
                            <span className="ml-2 text-xs text-muted">Updating...</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="p-2 flex gap-3">
                          <button
                            onClick={() => setSelectedProposal(a)}
                            className="text-primary hover:underline"
                          >
                            View Proposal
                          </button>
                          {/* ✅ resume only if allowed */}
                          {a.seeker?.viewResume && a.seeker?.resume && (
                            <a
                              href={a.seeker.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent hover:underline"
                            >
                              View Resume
                            </a>
                          )}
                          {/* ✅ message button */}
                          {a.seeker?.message && (
                            <button
                              onClick={() => { handleMessage(a.seeker.id, a.jobId) }}
                              className="text-primary hover:underline"
                            >
                              Message
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Proposal Modal */}
        {selectedProposal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-surface rounded-lg shadow-lg w-full max-w-lg p-6 relative">
              <button
                onClick={() => setSelectedProposal(null)}
                className="absolute top-2 right-2 text-muted hover:text-white"
              >
                ✕
              </button>
              <h2 className="text-xl font-semibold mb-3">
                Proposal from {selectedProposal.seeker?.name}
              </h2>
              <p className="text-sm text-muted mb-4">
                Applied for <b>{selectedProposal.jobTitle}</b> on{" "}
                {new Date(selectedProposal.createdAt).toLocaleDateString()}
              </p>
              <div className="p-3 bg-slate-800 rounded text-sm whitespace-pre-line">
                {selectedProposal.coverLetter || "No cover letter provided."}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Chat Window */}
      {activeConversationId && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="w-full max-w-4xl h-full bg-bg">
            <CompanyMessages initialConversationId={activeConversationId} />
            <button
              onClick={() => setActiveConversationId(null)}
              className="absolute top-4 right-4 text-white p-2 bg-red-600 rounded"
            >
              Close Chat
            </button>
          </div>
        </div>
      )}

    </CompanyLayout>
  );
}
