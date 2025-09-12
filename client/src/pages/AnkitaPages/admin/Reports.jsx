import React, { useEffect, useState, useMemo } from "react";
import CustomSelect from "../../../components/CustomSelect";
import api from "../../../secureApiForAdmin";

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [q, setQ] = useState("");
  const [type, setType] = useState(""); // user | employer | job
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  // fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const res = await api.get("/admin/reports");
        setReports(res.data.data || []);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
      setLoading(false);
    };
    fetchReports();
  }, []);

  const filteredReports = useMemo(() => {
    return reports
      .filter((r) =>
        type ? r.reportedUserModel.toLowerCase() === type.toLowerCase() : true
      )
      .filter(
        (r) =>
          r.details?.toLowerCase().includes(q.toLowerCase()) ||
          (r.reporter?.fullName || "")
            .toLowerCase()
            .includes(q.toLowerCase()) ||
          r._id.toLowerCase().includes(q.toLowerCase())
      );
  }, [reports, q, type]);

  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(filteredReports.length / limit)));
  }, [filteredReports]);

  const paginatedReports = filteredReports.slice(
    (page - 1) * limit,
    page * limit
  );

  const pageText = `Page ${page} of ${totalPages}`;

  // status update
  const handleStatusChange = async (reportId, newStatus) => {
    try {
      await api.put(`/admin/reports/${reportId}/status`, { status: newStatus });
      setReports((prev) =>
        prev.map((r) =>
          r._id === reportId ? { ...r, status: newStatus } : r
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update report status");
    }
  };

  return (
    <div className="p-4 pb-32">
      <h2 className="text-xl text-white font-semibold mb-4">
        Reported Users & Jobs
      </h2>

      {/* Search + Type Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex flex-1 items-center bg-slate-700/50 rounded overflow-hidden">
          <input
            className="flex-1 px-3 py-2 text-white bg-transparent outline-none placeholder:text-gray-400"
            placeholder="Search by description, reporter, id..."
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="w-48">
          <CustomSelect
            value={type}
            onChange={(v) => {
              setType(v);
              setPage(1);
            }}
            options={[
              { label: "All", value: "" },
              { label: "User", value: "JobSeeker" },
              { label: "Employer", value: "Company" },
              { label: "Job", value: "Job" },
            ]}
          />
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {loading && (
          <div className="text-sm text-gray-400">Loading reports...</div>
        )}
        {!loading && paginatedReports.length === 0 && (
          <div className="text-sm text-gray-400">No reports found.</div>
        )}
        {paginatedReports.map((r) => (
          <div
            key={r._id}
            className="border rounded p-3 bg-slate-800/50 text-white"
          >
            <div className="flex justify-between flex-col sm:flex-row gap-2">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 flex-wrap">
                  <strong className="truncate">{r.details}</strong>

                  {/* Status Dropdown */}
                  <select
                    className="text-xs px-2 py-1 bg-gray-600 rounded text-white"
                    value={r.status}
                    onChange={(e) =>
                      handleStatusChange(r._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Dismissed">Dismissed</option>
                  </select>
                </div>

                <div className="text-sm text-gray-300 mt-1">
                  Reason: {r.reason}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Reported by:{" "}
                  {r.reporter?.fullName || r.reporter?.name || "N/A"} (
                  {r.reporterModel}) •{" "}
                  {new Date(r.createdAt).toLocaleString()}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Reported User:{" "}
                  {r.reportedUser?.fullName || r.reportedUser?.name || "N/A"} (
                  {r.reportedUserModel})
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="sticky bottom-0 left-0 right-0 mt-5 bg-gray-950/70 backdrop-blur border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-gray-300 text-sm order-2 sm:order-1">
            {pageText}
          </span>
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
