import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import adminService from "../../../services/adminService";
import CustomSelect from "../../../components/CustomSelect";
import api from "../../../secureApiForAdmin";

export default function AdminEmployersList() {
  const [allEmployers, setAllEmployers] = useState([]); // full list
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 20;

  // fetch once
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const res = await api.get("/admin/companies");
        const companies = res.data.data.map((c) => ({
          id: c._id,
          companyName: c.companyName,
          name: c.user?.name || "N/A",
          email: c.user?.email || "N/A",
          status: c.active ? "active" : "suspended",
          logo: c.companyLogo,
        }));
        setAllEmployers(companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // filter + search
  const filteredEmployers = useMemo(() => {
    let data = allEmployers;

    if (status) {
      data = data.filter((em) => em.status === status);
    }

    if (q.trim()) {
      const qLower = q.toLowerCase();
      data = data.filter(
        (em) =>
          em.name.toLowerCase().includes(qLower) ||
          em.companyName.toLowerCase().includes(qLower) ||
          em.email.toLowerCase().includes(qLower)
      );
    }

    return data;
  }, [allEmployers, status, q]);

  // pagination
  const paginatedEmployers = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredEmployers.slice(start, start + limit);
  }, [filteredEmployers, page, limit]);

  useEffect(() => {
    // whenever filteredEmployers changes, reset page & totalPages
    setPage(1);
    setTotalPages(Math.ceil(filteredEmployers.length / limit) || 1);
  }, [filteredEmployers]);

  const handleSearch = (e) => {
    e?.preventDefault();
    setPage(1);
  };

  const takeAction = (employerId, type) => {
    const ok = window.confirm(`Confirm ${type} employer ${employerId}?`);
    if (!ok) return;
    adminService
      .takeAction({ type, targetType: "employer", targetId: employerId })
      .then(() => {
        // remove from state or refetch
        setAllEmployers((prev) =>
          prev.map((em) =>
            em.id === employerId
              ? {
                ...em,
                status:
                  type === "suspend"
                    ? "suspended"
                    : type === "restore"
                      ? "active"
                      : em.status,
              }
              : em
          )
        );
      })
      .catch((err) => console.error("action", err));
  };

  const pageText = `Page ${page} of ${totalPages}`;

  return (
    <div className="p-4 pb-32">
      <h2 className="text-xl text-white font-semibold mb-4">Companies</h2>

      {/* search & filter */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4 items-center">
        <input
          className="flex-1 p-2 border rounded bg-white/5 text-sm"
          placeholder="Search company or user name..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="search-employers"
        />

        <div className="w-48">
          <CustomSelect
            value={status}
            onChange={(v) => {
              setStatus(v);
              setPage(1);
            }}
            options={[
              { label: "All", value: "" },
              { label: "Active", value: "active" },
              { label: "Suspended", value: "suspended" },
            ]}
          />
        </div>
      </form>

      {/* table */}
      <div className="overflow-x-auto bg-white/3 border border-slate-700 rounded">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="text-left text-white p-3">Name</th>
              <th className="text-left text-white p-3">Email</th>
              <th className="text-left text-white p-3">Status</th>
              <th className="p-3 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-sm text-white"
                >
                  Loading...
                </td>
              </tr>
            )}

            {!loading && paginatedEmployers.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-sm text-white"
                >
                  No employers found.
                </td>
              </tr>
            )}

            {!loading &&
              paginatedEmployers.map((em) => (
                <tr key={em.id} className="border-t border-slate-700">
                  {/* name + company */}
                  <td className="p-3 flex items-center gap-2 text-white">
                    {em.logo && (
                      <img
                        src={em.logo}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium text-sm text-white">{em.name}</div>
                      <div className="text-xs text-gray-300">{em.companyName}</div>
                    </div>
                  </td>

                  {/* email */}
                  <td className="p-3 text-sm text-white">{em.email}</td>

                  {/* status */}
                  <td className="p-3 text-sm text-white">{em.status}</td>

                  {/* actions */}
                  <td className="p-3 text-sm">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        to={`/admin/employers/${em.id}`}
                        className="text-indigo-400 hover:underline"
                      >
                        View
                      </Link>

                      {em.status === "suspended" ? (
                        <button
                          onClick={() => takeAction(em.id, "restore")}
                          className="px-2 py-1 text-sm bg-green-600 text-white rounded"
                        >
                          Restore
                        </button>
                      ) : (
                        <button
                          onClick={() => takeAction(em.id, "suspend")}
                          className="px-2 py-1 text-sm bg-yellow-600 text-white rounded"
                        >
                          Suspend
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (!window.confirm("Delete employer? This is irreversible.")) return;
                          takeAction(em.id, "delete");
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

      {/* pagination */}
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
