// src/pages/AnkitaPages/JOBSEEKER/Jobs/SavedJobs.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Building2 } from "lucide-react";
import JobseekerLayout from "../../layouts/JobseekerLayout";
import api from "../../../../secureApiForUser";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ fetch saved jobs
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        setLoading(true);
        const res = await api.get("/jobseeker/saved-jobs"); // ✅ endpoint confirm karna backend se
        setSavedJobs(res.data || []);
      } catch (err) {
        console.error("Error fetching saved jobs:", err);
        setError("Failed to load saved jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  // ✅ unsave job
  const handleUnsave = async (id) => {
    try {
      await api.delete(`/jobseeker/saved-jobs/${id}`); // ✅ endpoint confirm karna backend se
      setSavedJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Error unsaving job:", err);
      alert("Failed to unsave job. Please try again.");
    }
  };

  return (
    <JobseekerLayout>
      <div className="p-6 text-lightText space-y-6">
        {/* Heading */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Saved Jobs</h1>
          <Link to="/user/jobs" className="text-info hover:underline text-sm">
            Browse more jobs
          </Link>
        </div>

        {/* Saved Jobs List */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-muted text-sm p-6 text-center">
              Loading saved jobs...
            </div>
          ) : error ? (
            <div className="text-red-400 text-sm p-6 text-center">{error}</div>
          ) : savedJobs.length > 0 ? (
            savedJobs.map((job) => (
              <div
                key={job._id}
                className="rounded-xl border border-slate-700 bg-darkGray/60 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-bg border border-slate-700">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <div className="font-medium">{job.title}</div>
                    <div className="text-sm text-muted flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Building2 size={14} /> {job.company?.companyName}
                      </span>
                      <span>•</span>
                      <span>{job.jobType}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/user/job/${job._id}`}
                    className="px-3 py-2 rounded-lg bg-accent text-white hover:shadow-glowAccent text-sm text-center"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleUnsave(job._id)}
                    className="px-3 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 text-sm"
                  >
                    Unsave
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-muted text-sm p-6 text-center border border-slate-800 rounded-xl">
              No saved jobs yet.{" "}
              <Link to="/user/jobs" className="text-info underline">
                Find jobs
              </Link>
            </div>
          )}
        </div>
      </div>
    </JobseekerLayout>
  );
}
