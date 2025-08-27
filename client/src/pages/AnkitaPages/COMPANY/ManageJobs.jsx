import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/secureApi";
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

  // ✅ Fetch jobs function (reusable)
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/company/jobs", {
        params: {
          page,
          search,
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
  }, [page, search, statusFilter, locationFilter]);

  // ✅ Load jobs when page opens
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // ✅ Delete job and refresh list
  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await api.delete(`/job/${jobId}`);
      fetchJobs(); // 🔄 Refresh list after delete
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  return (
    <CompanyLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Manage Jobs</h1>

        {/* 🔍 Search & Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-600"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-600"
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
            className="px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-600"
          />
        </div>

        {loading ? (
          <p className="text-gray-400">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-400">No jobs found.</p>
        ) : (
          <div className="overflow-x-auto">
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
                  <tr key={job._id} className="border-t border-gray-700">
                    <td className="px-6 py-3">{job.title}</td>
                    <td className="px-6 py-3">{job.location}</td>
                    <td className="px-6 py-3">{job.jobType}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          job.status === "open"
                            ? "bg-green-700 text-white"
                            : "bg-red-700 text-white"
                        }`}
                      >
                        {job.status || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="px-2 py-1 bg-blue-800 rounded text-white text-sm">
                        Applicants: {job.applicantCount || 0}
                      </span>
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={() =>
                          navigate(`/company/job/edit/${job._id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        onClick={() =>
                          navigate(`/company/job/${job._id}/applicants`)
                        }
                      >
                        View Applicants
                      </button>
                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={() => handleDelete(job._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ✅ Pagination */}
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-gray-300">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </CompanyLayout>
  );
};

export default ManageJobs;
