// src/pages/Company/JobseekersList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../secureApi";
import CompanyLayout from "../layouts/CompanyLayout";

export default function JobseekersList() {
  const navigate = useNavigate();
  const [jobseekers, setJobseekers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchJobSeekers = async () => {
      try {
        console.log("Fetching Users....");
        const res = await api.get("/company/jobseekers");
        console.log(res.data);
        setJobseekers(res.data?.jobSeekers || []); // Adjust to your backend shape
      } catch (error) {
        console.error("Error fetching job seekers:", error);
      }
    };
    fetchJobSeekers();
  }, []);

  const filteredJobseekers = jobseekers.filter((u) => {
    const nameMatch = u.fullName?.toLowerCase().includes(search.toLowerCase());
    const skillMatch = (u.skills || [])
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
    // if you add location later, include here
    return nameMatch || skillMatch;
  });

  return (
    <CompanyLayout>
      <div className="p-6 min-h-screen bg-bg text-lightText">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Jobseekers</h1>

          <div className="flex items-center justify-between mb-4 gap-4">
            <input
              placeholder="Search by name or skill"
              className="flex-1 bg-surface placeholder:opacity-60 text-lightText px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link
              to="/company/jobseekers"
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primaryDark text-white font-medium"
            >
              Refresh
            </Link>
          </div>

          <div className="grid gap-4">
            {filteredJobseekers.map((u) => {
              const avatar =
                u.profilePicture && u.profilePicture.trim() !== ""
                  ? u.profilePicture
                  : `https://ui-avatars.com/api/?background=111827&color=fff&name=${encodeURIComponent(
                    u.fullName || u.user?.name || "User"
                  )}`;
              const headline = u.bio || "No bio available";
              const email = u.user?.email || "N/A";

              return (
                <article
                  key={u._id}
                  className="bg-surface rounded-2xl p-4 md:p-5 border border-slate-700 shadow-soft flex items-center gap-4 hover:shadow-medium transition"
                >
                  <img
                    src={avatar}
                    alt={u.fullName}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-slate-800"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?background=111827&color=fff&name=${encodeURIComponent(
                        u.fullName || "User"
                      )}`;
                    }}
                  />

                  <div className="flex-1">
                    <Link
                      to={`/company/jobseeker/${u._id}`}
                      className="text-xl font-semibold hover:underline block"
                    >
                      {u.fullName}
                    </Link>
                    <p className="text-sm text-muted mt-1">{headline}</p>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-lightGray">
                      {u.skills && u.skills.length > 0 ? (
                        u.skills.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="px-2 py-1 rounded-full bg-darkGray/40 text-sm border border-slate-700"
                          >
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-darkGray/40 text-sm border border-slate-700">
                          No skills added
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <a
                      href={`mailto:${email}`}
                      className="text-sm text-muted hover:text-lightText"
                    >
                      {email}
                    </a>

                    {/* ✅ Directly navigate to chat */}
                    <button
                      onClick={() =>
                        navigate("/company/messages", {
                          state: { to: u.user?._id, name: u.fullName },
                        })
                      }
                      className="mt-3 inline-block px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primaryDark shadow-soft"
                    >
                      Send Message
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* empty state */}
          {filteredJobseekers.length === 0 && (
            <div className="mt-8 bg-surface rounded-xl p-6 border border-slate-700 text-center text-muted">
              No jobseekers found.
            </div>
          )}
        </div>
      </div>
    </CompanyLayout>
  );
}
