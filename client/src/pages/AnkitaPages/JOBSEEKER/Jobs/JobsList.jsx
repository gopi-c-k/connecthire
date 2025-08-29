import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Building2 } from "lucide-react";
import JobseekerLayout from "../../layouts/JobseekerLayout";

const MOCK_JOBS = [
  { id: "101", title: "Frontend Developer", company: "Nova Labs", type: "Full-time", location: "Remote" },
  { id: "102", title: "React Native Engineer", company: "SkyTech", type: "Contract", location: "Bengaluru" },
  { id: "103", title: "UI Engineer", company: "BrightSoft", type: "Hybrid", location: "Pune" },
  { id: "104", title: "Backend Engineer", company: "DataForge", type: "Full-time", location: "Hyderabad" },
  { id: "105", title: "Full Stack Developer", company: "PixelWorks", type: "Hybrid", location: "Gurugram" },
];

export default function JobsList() {
  const [q, setQ] = useState("");

  const filtered = MOCK_JOBS.filter(
    (j) =>
      j.title.toLowerCase().includes(q.toLowerCase()) ||
      j.company.toLowerCase().includes(q.toLowerCase()) ||
      j.location.toLowerCase().includes(q.toLowerCase())
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
          {filtered.map((job) => (
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
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-muted text-sm p-6 text-center border border-slate-800 rounded-xl">
              No jobs found for "<span className="text-white">{q}</span>".
            </div>
          )}
        </div>
      </div>
    </JobseekerLayout>
  );
}
