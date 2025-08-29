import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Building2 } from "lucide-react";
import JobseekerLayout from "../../layouts/JobseekerLayout";

// Mock (replace with userService.getSavedJobs())
const MOCK_SAVED = [
  { id: "101", title: "Frontend Developer", company: "Nova Labs", type: "Full-time", location: "Remote" },
  { id: "105", title: "Full Stack Developer", company: "PixelWorks", type: "Hybrid", location: "Gurugram" },
];

export default function SavedJobs() {
  const [saved, setSaved] = useState(MOCK_SAVED);

  const handleUnsave = (id) => {
    // TODO: call userService.unsaveJob(id)
    setSaved((prev) => prev.filter((j) => j.id !== id));
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

        {/* List */}
        <div className="space-y-3">
          {saved.map((job) => (
            <div
              key={job.id}
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
                      <Building2 size={14} /> {job.company}
                    </span>
                    <span>•</span>
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/user/jobs/${job.id}`}
                  className="px-3 py-2 rounded-lg bg-accent text-white hover:shadow-glowAccent text-sm text-center"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleUnsave(job.id)}
                  className="px-3 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 text-sm"
                >
                  Unsave
                </button>
              </div>
            </div>
          ))}

          {saved.length === 0 && (
            <div className="text-muted text-sm p-6 text-center border border-slate-800 rounded-xl">
              No saved jobs yet. <Link to="/user/jobs" className="text-info underline">Find jobs</Link>
            </div>
          )}
        </div>
      </div>
    </JobseekerLayout>
  );
}
