import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomSelect from "../../../components/CustomSelect";
import api from "../../../secureApiForAdmin";

export default function AdminJobseekersList() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 20; // page size

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    filterAndPaginate();
  }, [allUsers, q, status, page]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/jobseekers");
      const data = res.data?.data || [];
      setAllUsers(data);
    } catch (error) {
      console.error("Error fetching jobseekers:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndPaginate = () => {
    let filtered = allUsers;

    // text search
    if (q) {
      const lower = q.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          (u.fullName && u.fullName.toLowerCase().includes(lower)) ||
          (u.user?.email && u.user.email.toLowerCase().includes(lower)) ||
          (Array.isArray(u.skills) &&
            u.skills.some((s) => s.toLowerCase().includes(lower)))
      );
    }

    // status filter
    if (status) {
      if (status === "active") {
        filtered = filtered.filter((u) => u.user?.active === true);
      } else if (status === "suspended") {
        filtered = filtered.filter((u) => u.user?.active === false);
      }
    }

    const total = filtered.length;
    const pages = Math.max(1, Math.ceil(total / limit));
    setTotalPages(pages);

    const currentPage = Math.min(page, pages);
    setPage(currentPage);

    const start = (currentPage - 1) * limit;
    const end = start + limit;
    setUsers(filtered.slice(start, end));
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    setPage(1);
    filterAndPaginate();
  };

  const updateJobSeeker = async (userId, jobseekerId, action) => {
    const label = action === "activate" ? "activate" : "deactivate";
    if (window.confirm(`Are you sure you want to ${label} this user?`)) {
      try {
        await api.put(`/admin/users/${userId}/${label}`);
        setAllUsers((prev) =>
          prev.map((em) =>
            em._id === jobseekerId
              ? { ...em, user: { ...em.user, active: action === "activate" } }
              : em
          )
        );
      } catch (error) {
        console.error("Error updating jobseeker:", error);
        alert("Failed to update jobseeker status. Please try again.");
      }
    }
  };

  const deleteJobSeeker = async (userId, jobseekerId) => {
    if (window.confirm("Are you sure you want to delete this user? This is irreversible.")) {
      try {
        await api.delete(`/admin/users/${userId}`);
        setAllUsers((prev) => prev.filter((em) => em._id !== jobseekerId));
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  const pageText = `Page ${page} of ${totalPages}`;

  return (
    <div className="p-4 pb-32">
      <h2 className="text-xl text-white font-semibold mb-4">
        Jobseekers / Users
      </h2>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4 items-center">
        <input
          className="flex-1 p-2 border rounded bg-white/5 text-sm"
          placeholder="Search name, email or skills..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="search-users"
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

      <div className="overflow-x-auto bg-white/3 border border-slate-700 rounded">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="text-left text-white p-3">Name</th>
              <th className="text-left text-white p-3">Email</th>
              <th className="text-left text-white p-3">Profile</th>
              <th className="text-left text-white p-3">Status</th>
              <th className="p-3 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-sm text-white">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-sm text-white">
                  No users found.
                </td>
              </tr>
            )}

            {!loading &&
              users.map((u) => {
                const id = u._id;
                const name = u.fullName || u.user?.name || "—";
                const email = u.user?.email || "";
                const resumeLink = u.resume || "";
                const active = u.user?.active !== false;
                const statusLabel = active ? "Active" : "Suspended";

                return (
                  <tr key={id} className="border-t border-slate-700">
                    <td className="p-3">
                      <div className="font-medium text-sm text-white">{name}</div>
                      <div className="text-xs text-white">{u.availability || ""}</div>
                    </td>
                    <td className="p-3 text-sm text-white">{email}</td>
                    <td className="p-3 text-sm">
                      {resumeLink ? (
                        <a
                          href={resumeLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-400 hover:underline text-sm"
                        >
                          Resume
                        </a>
                      ) : (
                        <span className="text-xs text-white">No resume</span>
                      )}
                    </td>
                    <td className="p-3 text-sm text-white">{statusLabel}</td>
                    <td className="p-3 text-sm">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          to={`/admin/jobseeker/${id}`}
                          className="text-indigo-400 hover:underline"
                        >
                          View
                        </Link>

                        {active ? (
                          <button
                            onClick={() =>
                              updateJobSeeker(u.user?._id, id, "deactivate")
                            }
                            className="px-2 py-1 text-sm bg-yellow-600 text-white rounded"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              updateJobSeeker(u.user?._id, id, "activate")
                            }
                            className="px-2 py-1 text-sm bg-green-600 text-white rounded"
                          >
                            Restore
                          </button>
                        )}

                        <button
                          onClick={() => deleteJobSeeker(u.user?._id, id)}
                          className="px-2 py-1 text-sm bg-red-600 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="sticky bottom-0 left-0 right-0 mt-5 bg-gray-950/70 backdrop-blur supports-[backdrop-filter]:bg-gray-950/50 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-gray-300 text-sm order-2 sm:order-1">
            {pageText}
          </span>
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
