import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import CustomSelect from "../../../components/CustomSelect";
import api from "../../../secureApiForAdmin";

export default function JobsList() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all"); // all | open | closed | etc
  const [page, setPage] = useState(1);
  const perPage = 6;

  // Fetch backend jobs once
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/admin/jobs");
        const jobsData = res.data.data.map((j) => ({
          id: j._id,
          title: j.title,
          company: j.company?.companyName || "N/A",
          status: j.status, // e.g., "open"
          created: j.postedAt,
        }));
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  // Filter & search
  const filtered = useMemo(() => {
    return jobs
      .filter((j) => (status === "all" ? true : j.status === status))
      .filter(
        (j) =>
          j.title.toLowerCase().includes(search.toLowerCase()) ||
          j.company.toLowerCase().includes(search.toLowerCase())
      );
  }, [jobs, search, status]);

  // Frontend pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  const pageText = `Page ${page} of ${totalPages}`;

  return (
    <div className="p-4 sm:p-6 pb-32">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Jobs</h2>
          <p className="text-slate-400 text-sm mt-1">
            View and manage job postings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/admin/jobs/new")}
            className="px-3 py-2 rounded-md bg-sky-500 text-white text-sm"
          >
            New Job
          </button>
        </div>
      </div>

      {/* Search + Status filter */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center bg-slate-700/40 rounded-md px-2 py-1">
              <Search className="w-4 h-4 text-slate-300 mr-2" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search title or company"
                className="bg-transparent outline-none text-sm text-slate-200 placeholder-slate-400"
              />
            </div>

            <div className="ml-2 w-40">
              <CustomSelect
                value={status}
                onChange={(v) => {
                  setStatus(v);
                  setPage(1);
                }}
                options={[
                  { label: "All", value: "all" },
                  { label: "Open", value: "open" },
                  { label: "Closed", value: "closed" },
                  { label: "Draft", value: "draft" },
                ]}
              />
            </div>
          </div>

          <div className="text-sm text-slate-300">{filtered.length} result(s)</div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="text-slate-300">
            <tr>
              <th className="px-4 py-3">Job</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-slate-200">
            {visible.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-slate-400">
                  No jobs found
                </td>
              </tr>
            ) : (
              visible.map((j) => (
                <tr key={j.id} className="border-t border-slate-700">
                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/jobs/${j.id}`}
                      className="text-white font-medium hover:underline"
                    >
                      {j.title}
                    </Link>
                    <div className="text-xs text-slate-400">
                      {new Date(j.created).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white">{j.company}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        j.status === "open"
                          ? "bg-green-600 text-white"
                          : j.status === "closed"
                          ? "bg-red-600 text-white"
                          : "bg-gray-600 text-white"
                      }`}
                    >
                      {j.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/admin/jobs/${j.id}`}
                      className="px-2 py-1 rounded-md bg-slate-700/40 text-white text-sm"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Frontend pagination */}
      <div className="sticky bottom-0 left-0 right-0 mt-5 bg-gray-950/70 backdrop-blur supports-[backdrop-filter]:bg-gray-950/50 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-gray-300 text-sm order-2 sm:order-1">{pageText}</span>
          <div className="flex gap-2 order-1 sm:order-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
