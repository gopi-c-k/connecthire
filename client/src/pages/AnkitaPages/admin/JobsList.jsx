
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Check, X, Trash2 } from "lucide-react";
import CustomSelect from "../../../components/CustomSelect"; // <-- added



const MOCK_JOBS = [
  { id: "j1", title: "Frontend Developer", company: "Acme Corp", status: "pending", type: "Remote", applicants: 12, created: "2d" },
  { id: "j2", title: "Backend Engineer", company: "ByteLabs", status: "pending", type: "Onsite", applicants: 4, created: "3d" },
  { id: "j3", title: "Fullstack Dev", company: "StartUp Ltd", status: "approved", type: "Remote", applicants: 18, created: "6d" },
  { id: "j4", title: "React Native", company: "MobileX", status: "rejected", type: "Remote", applicants: 2, created: "7d" },
  { id: "j5", title: "DevOps Engineer", company: "CloudCo", status: "pending", type: "Onsite", applicants: 6, created: "1d" },
];

export default function JobsList() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all"); // all | pending | approved | rejected
  const [page, setPage] = useState(1);
  const perPage = 6;

  // filter & derive
  const filtered = useMemo(() => {
    return jobs
      .filter((j) => (status === "all" ? true : j.status === status))
      .filter(
        (j) =>
          j.title.toLowerCase().includes(search.toLowerCase()) ||
          j.company.toLowerCase().includes(search.toLowerCase())
      );
  }, [jobs, search, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const visible = filtered.slice((page - 1) * perPage, page * perPage);


  const updateJobStatus = (id, newStatus) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status: newStatus } : j)));
  };

  const deleteJob = (id) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const pageText = `Page ${page} of ${totalPages}`;

  return (
    <div className="p-4 sm:p-6 pb-32">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Jobs</h2>
          <p className="text-slate-400 text-sm mt-1">Approve, review or remove job postings.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/admin/jobs/new")} className="px-3 py-2 rounded-md bg-sky-500 text-white text-sm">New Job</button>
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center bg-slate-700/40 rounded-md px-2 py-1">
              <Search className="w-4 h-4 text-slate-300 mr-2" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search title or company"
                className="bg-transparent outline-none text-sm text-slate-200 placeholder-slate-400"
              />
            </div>

           
            <div className="ml-2 w-40">
              <CustomSelect
                value={status}
                onChange={(v) => { setStatus(v); setPage(1); }}
                options={[
                  { label: "All", value: "all" },
                  { label: "Pending", value: "pending" },
                  { label: "Approved", value: "approved" },
                  { label: "Rejected", value: "rejected" },
                ]}
              />
            </div>
          </div>

          <div className="text-sm text-slate-300">{filtered.length} result(s)</div>
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="text-slate-300">
            <tr>
              <th className="px-4 py-3">Job</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Applicants</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-slate-200">
            {visible.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-slate-400">No jobs found</td>
              </tr>
            ) : visible.map((j) => (
              <tr key={j.id} className="border-t border-slate-700">
                <td className="px-4 py-3">
                  <Link to={`/admin/jobs/${j.id}`} className="text-white font-medium hover:underline">{j.title}</Link>
                  <div className="text-xs text-slate-400">{j.created}</div>
                </td>
                <td className="px-4 py-3 text-slate-300">{j.company}</td>
                <td className="px-4 py-3">{j.type}</td>
                <td className="px-4 py-3">{j.applicants}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    j.status === "pending" ? "bg-yellow-600 text-white" :
                    j.status === "approved" ? "bg-green-600 text-white" : "bg-red-600 text-white"
                  }`}>{j.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex items-center gap-2">
                    {j.status !== "approved" && (
                      <button onClick={() => updateJobStatus(j.id, "approved")} title="Approve" className="px-2 py-1 rounded-md bg-emerald-600 text-white text-sm">
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    {j.status !== "rejected" && (
                      <button onClick={() => updateJobStatus(j.id, "rejected")} title="Reject" className="px-2 py-1 rounded-md bg-red-600 text-white text-sm">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => deleteJob(j.id)} title="Delete" className="px-2 py-1 rounded-md bg-slate-700/40 text-slate-200 text-sm">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Link to={`/admin/jobs/${j.id}`} className="px-2 py-1 rounded-md bg-slate-700/40 text-slate-200 text-sm">Open</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* sticky blurred pagination footer */}
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
