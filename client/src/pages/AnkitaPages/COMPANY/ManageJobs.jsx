import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../secureApi";
import CompanyLayout from "../layouts/CompanyLayout";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Search & filter state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const navigate = useNavigate();

  // 🔎 Debounce search (prevents extra API calls while typing)
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  // Track which job is being deleted (to disable its button)
  const [deletingId, setDeletingId] = useState(null);

  // ✅ Fetch jobs function (reusable)
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/company/jobs", {
        params: {
          page,
          search: debouncedSearch,
          status: statusFilter,
          location: locationFilter,
        },
      });
      setJobs(res.data.jobs || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, statusFilter, locationFilter]);

  // ✅ Load jobs when page opens / filters change
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // ✅ Delete job and refresh list + alerts
  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      setDeletingId(jobId);
      await api.delete(`/job/${jobId}`);
      window.alert("Job deleted successfully.");
      await fetchJobs(); // 🔄 Refresh list after delete
    } catch (err) {
      console.error("Error deleting job:", err);
      window.alert("Failed to delete the job. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const pageText = useMemo(() => `Page ${page} of ${totalPages}`, [page, totalPages]);

  return (
    <CompanyLayout>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">Manage Jobs</h1>
          {/* Quick actions could go here later */}
        </div>

        {/* 🔍 Search & Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="close">Closed</option>
          </select>
          <input
            type="text"
            placeholder="Filter by location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {/* Reset / Clear */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("");
                setLocationFilter("");
                setPage(1);
              }}
              className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 hover:bg-gray-700"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-400">No jobs found.</p>
        ) : (
          <>
            {/* 🖥️ Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full border border-gray-700 rounded-lg">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left">Title</th>
                    <th className="px-6 py-3 text-left">Location</th>
                    <th className="px-6 py-3 text-left">Type</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Applicants</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job._id} className="border-t border-gray-700 text-sm">
                      <td className="px-6 py-3 cursor-pointer" onClick={() => {navigate(`/company/job/${job._id}`)}}>{job.title}</td>
                      <td className="px-6 py-3">{job.location}</td>
                      <td className="px-6 py-3">{job.jobType}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            job.status === "open"
                              ? "bg-green-700 text-white"
                              : "bg-red-700 text-white"
                          }`}
                        >
                          {job.status || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="px-2 py-1 bg-blue-800 rounded text-white text-xs">
                          {job.applicants?.length || job.applicantCount || 0}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex flex-wrap gap-2">
                          <button
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={() => navigate(`/company/job/edit/${job._id}`)}
                          >
                            Edit
                          </button>
                          <button
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                            onClick={() => navigate(`/company/job/${job._id}/applicants`)}
                          >
                            Applicants
                          </button>
                          <button
                            onClick={() => handleDelete(job._id)}
                            disabled={deletingId === job._id}
                            className={`px-3 py-1 rounded text-white ${
                              deletingId === job._id
                                ? "bg-red-600/60 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-700"
                            }`}
                          >
                            {deletingId === job._id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 📱 Mobile Cards */}
            <div className="md:hidden space-y-3">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="rounded-xl border border-gray-700 bg-gray-900 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold">{job.title}</h3>
                      <div className="mt-1 text-xs text-gray-300 space-y-0.5">
                        {job.location && (
                          <p>
                            <span className="text-gray-400">Location: </span>
                            {job.location}
                          </p>
                        )}
                        {job.jobType && (
                          <p>
                            <span className="text-gray-400">Type: </span>
                            {job.jobType}
                          </p>
                        )}
                        <p className="flex items-center gap-2">
                          <span className="text-gray-400">Status:</span>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${
                              job.status === "open"
                                ? "bg-green-700 text-white"
                                : "bg-red-700 text-white"
                            }`}
                          >
                            {job.status || "N/A"}
                          </span>
                        </p>
                        <p>
                          <span className="text-gray-400">Applicants: </span>
                          <span className="px-2 py-0.5 bg-blue-800 rounded text-white text-xs">
                            {job.applicants?.length || job.applicantCount || 0}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <button
                      className="px-3 py-2 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => navigate(`/company/job/edit/${job._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-2 text-xs rounded-lg bg-green-600 text-white hover:bg-green-700"
                      onClick={() => navigate(`/company/job/${job._id}/applicants`)}
                    >
                      Applicants
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      disabled={deletingId === job._id}
                      className={`px-3 py-2 text-xs rounded-lg text-white ${
                        deletingId === job._id
                          ? "bg-red-600/60 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {deletingId === job._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ Pagination (sticks to bottom on mobile) */}
            <div className="sticky bottom-0 left-0 right-0 mt-5 bg-gray-950/70 backdrop-blur supports-[backdrop-filter]:bg-gray-950/50 border-t border-gray-800">
              <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-gray-300 text-sm order-2 sm:order-1">{pageText}</span>
                <div className="flex gap-2 order-1 sm:order-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                    className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Prev
                  </button>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </CompanyLayout>
  );
};

export default ManageJobs;