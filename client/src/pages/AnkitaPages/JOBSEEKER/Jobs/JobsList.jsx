import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Building2 } from "lucide-react";
import JobseekerLayout from "../../layouts/JobseekerLayout";
import api from "../../../../secureApiForUser";

export default function JobsList() {
  const [q, setQ] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await api.get("/jobs"); // ✅ backend se jobs fetch
        console.log("Fetched jobs:", res.data);
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filtered = jobs.filter(
    (j) =>
      j.title?.toLowerCase().includes(q.toLowerCase()) ||
      j.company?.companyName?.toLowerCase().includes(q.toLowerCase()) ||
      j.location?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <JobseekerLayout>
      <div className="p-6 text-lightText space-y-6">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl font-bold">Jobs</h1>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title, company, location..."
            className="w-full sm:w-80 px-3 py-2 rounded-lg bg-bg text-lightText border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Jobs list */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-muted text-sm p-6 text-center">
              Loading jobs...
            </div>
          ) : error ? (
            <div className="text-red-400 text-sm p-6 text-center">
              {error}
            </div>
          ) : filtered.length > 0 ? (
            filtered.map((job) => (
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
                </div>
              </div>
            ))
          ) : (
            <div className="text-muted text-sm p-6 text-center border border-slate-800 rounded-xl">
              No jobs found for "<span className="text-white">{q}</span>".
            </div>
          )}
        </div>
      </div>
    </JobseekerLayout>
  );
}
