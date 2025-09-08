
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adminService from "../../../services/adminService";
import CustomSelect from "../../../components/CustomSelect";

export default function AdminEmployersList() {
  const [employers, setEmployers] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState(""); 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 20;

  const load = (opts = {}) => {
    setLoading(true);
    const p = opts.pageOverride || page;
    adminService
      .getEmployers(p, limit, q, { status })
      .then((res) => {
        const payload = res.data;
        setEmployers(payload.data || payload);
        setTotalPages((payload.meta && payload.meta.totalPages) || 1);
      })
      .catch((err) => {
        console.error("fetch employers", err);
        setEmployers([]);
        setTotalPages(1);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    
  }, [page, status]);

  const handleSearch = (e) => {
    e?.preventDefault();
    setPage(1);
    load({ pageOverride: 1 });
  };

  const takeAction = (employerId, type) => {
    const ok = window.confirm(`Confirm ${type} employer ${employerId}?`);
    if (!ok) return;
    adminService
      .takeAction({ type, targetType: "employer", targetId: employerId })
      .then(() => load())
      .catch((err) => console.error("action", err));
  };

  const pageText = `Page ${page} of ${totalPages}`;

  return (
    <div className="p-4 pb-32"> {/* pad bottom so sticky footer doesn't cover content */}
      <h2 className="text-xl  text-white  font-semibold mb-4">Employers</h2>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4 items-center">
        <input
          className="flex-1 p-2 border rounded bg-white/5 text-sm"
          placeholder="Search employer name or email..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="search-employers"
        />

        <div className="w-48">
          <CustomSelect
            value={status}
            onChange={(v) => { setStatus(v); setPage(1); }}
            options={[
              { label: "All", value: "" },
              { label: "Active", value: "active" },
              { label: "Suspended", value: "suspended" },
            ]}
          />
        </div>

       
      </form>

      <div className="overflow-x-auto bg-white/3 border border-slate-700 rounded">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              
              <th className="text-left  text-white  p-3">Name</th>
              <th className="text-left  text-white p-3">Email</th>
              <th className="text-left  text-white p-3">Status</th>
              <th className="p-3  text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-sm text-gray-300">Loading...</td>
              </tr>
            )}

            {!loading && employers.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-sm text-gray-400">No employers found.</td>
              </tr>
            )}

            {!loading && employers.map((em) => (
              <tr key={em.id || em._id} className="border-t border-slate-700">
                <td className="p-3">
                  <div className="font-medium text-sm">{em.name}</div>
                  <div className="text-xs text-slate-400">{em.companyName}</div>
                </td>
                <td className="p-3 text-sm">{em.email}</td>
                <td className="p-3 text-sm">{em.status || "active"}</td>
                <td className="p-3 text-sm">
                  <div className="inline-flex items-center gap-2">
                    <Link to={`/admin/employers/${em.id || em._id}`} className="text-indigo-400 hover:underline">View</Link>

                    {em.status === "suspended" ? (
                      <button
                        onClick={() => takeAction(em.id || em._id, "restore")}
                        className="px-2 py-1 text-sm bg-green-600 text-white rounded"
                      >
                        Restore
                      </button>
                    ) : (
                      <button
                        onClick={() => takeAction(em.id || em._id, "suspend")}
                        className="px-2 py-1 text-sm bg-yellow-600 text-white rounded"
                      >
                        Suspend
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (!window.confirm("Delete employer? This is irreversible.")) return;
                        takeAction(em.id || em._id, "delete");
                      }}
                      className="px-2 py-1 text-sm bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="sticky bottom-0 left-0 right-0 mt-5 bg-gray-950/70 backdrop-blur supports-[backdrop-filter]:bg-gray-950/50 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-gray-300 text-sm order-2 sm:order-1">{pageText}</span>
          <div className="flex gap-2 order-1 sm:order-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button
              disabled={page >= totalPages}
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
