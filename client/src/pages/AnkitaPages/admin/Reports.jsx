
import React, { useEffect, useState } from "react";
import adminService from "../../../services/adminService";
import CustomSelect from "../../../components/CustomSelect";

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [q, setQ] = useState("");
  const [type, setType] = useState(""); 
  const [page, setPage] = useState(1);
  const limit = 20;
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const load = (opts = {}) => {
    setLoading(true);
    const { pageOverride } = opts;
    const p = pageOverride || page;
    adminService.getReports(p, limit, q, { type })
      .then((res) => {
        const payload = res.data;
        setReports(payload.data || payload);
        setTotalPages((payload.meta && payload.meta.totalPages) || 1);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    
  }, [page, type]);

  const onSubmitSearch = (e) => {
    e.preventDefault();
    setPage(1);
    load({ pageOverride: 1 });
  };

  const resolve = (reportId) => {
    if (!window.confirm("Resolve this report?")) return;
    adminService.takeAction({ type: "resolve", targetType: "report", targetId: reportId })
      .then(() => load())
      .catch((err) => console.error(err));
  };

  const escalate = (reportId) => {
    if (!window.confirm("Escalate this report to higher review?")) return;
    adminService.takeAction({ type: "escalate", targetType: "report", targetId: reportId })
      .then(() => load())
      .catch((err) => console.error(err));
  };

  const exportCSV = () => {
    adminService.exportReports({ type, q })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "reports.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((err) => console.error(err));
  };

  const pageText = `Page ${page} of ${totalPages}`;

  return (
    <div className="p-4 pb-32">
      <h2 className="text-xl  text-white font-semibold mb-4">Take Action on Reported User...</h2>

      {/* search + filters */}
      <form onSubmit={onSubmitSearch} className="flex gap-3 items-center mb-4">
        <div className="flex items-center flex-1 bg-white border rounded overflow-hidden">
          <input
            className="flex-1 px-3 py-2 outline-none"
            placeholder="Search by description, reporter, id..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="search-reports"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-bg text-white rounded-r hover:bg-bg-700 transition"
            title="Search"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        <div className="w-48">
          <CustomSelect
            value={type}
            onChange={(v) => { setType(v); setPage(1); }}
            options={[
              { label: "All", value: "" },
              { label: "User", value: "user" },
              { label: "Employer", value: "employer" },
              { label: "Job", value: "job" },
            ]}
          />
        </div>

        <button
          type="button"
          onClick={exportCSV}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          title="Export CSV"
        >
          Export
        </button>
      </form>

      {/* results */}
      <div className="space-y-3">
        {reports.length === 0 && !loading && <div className="text-sm text-gray-600">No reports.</div>}
        {loading && <div className="text-sm text-gray-600">Loading...</div>}

        {reports.map((r) => (
          <div key={r.id || r._id} className="border rounded p-3 bg-white">
            <div className="flex justify-between">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <strong className="truncate">{r.subject || `${r.type} ${r.targetId || ""}`}</strong>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-700">{r.status}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">{r.reason}</div>
                <div className="text-xs text-gray-500 mt-2">Reported by {r.reporterName || r.reporterId} • {new Date(r.createdAt || Date.now()).toLocaleString()}</div>
              </div>

              <div className="flex flex-col gap-2">
                <button onClick={() => resolve(r.id || r._id)} className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">Resolve</button>
                <button onClick={() => escalate(r.id || r._id)} className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition">Escalate</button>
              </div>
            </div>
          </div>
        ))}
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
