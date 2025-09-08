import React, { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft,  CheckCircle, XCircle } from "lucide-react";



const MOCK_JOB = {
  id: "j1",
  title: "Frontend Developer",
  company: { id: "c1", name: "Acme Corp", email: "hr@acme.com" },
  description: "We need an experienced React dev...",
  requirements: ["3+ years React", "CSS/Tailwind", "REST/APIs"],
  location: "Remote",
  type: "Full-time",
  status: "pending",
  applicants: [
    { id: "a1", name: "Alice", email: "alice@example.com", resume: "#" },
    { id: "a2", name: "Bob", email: "bob@example.com", resume: "#" },
  ],
};

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({ ...MOCK_JOB, id });

  const applicants = useMemo(() => job.applicants || [], [job]);

  const updateStatus = (newStatus) => setJob((j) => ({ ...j, status: newStatus }));

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="px-3 py-2 rounded-md bg-slate-700/40 text-slate-200">
          <ArrowLeft className="w-4 h-4 inline mr-2" /> Back
        </button>
        <div>
          <h2 className="text-2xl font-semibold text-white">{job.title}</h2>
          <div className="text-sm text-slate-400">{job.company.name} • {job.location} • {job.type}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">Job Description</h3>
          <p className="text-slate-200 mb-4">{job.description}</p>

          <h4 className="text-sm text-slate-300 mb-1">Requirements</h4>
          <ul className="list-disc pl-5 mb-4 text-slate-200">
            {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
          </ul>

          <div className="flex items-center gap-2">
            {job.status !== "approved" && (
              <button onClick={() => updateStatus("approved")} className="px-3 py-2 bg-emerald-600 text-white rounded-md inline-flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Approve
              </button>
            )}
            {job.status !== "rejected" && (
              <button onClick={() => updateStatus("rejected")} className="px-3 py-2 bg-red-600 text-white rounded-md inline-flex items-center gap-2">
                <XCircle className="w-4 h-4" /> Reject
              </button>
            )}
            <Link to="/admin/jobs" className="ml-2 text-slate-300 hover:underline">Close</Link>
          </div>
        </div>

        <aside className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-3">Employer</h4>
          <div className="text-slate-200 mb-3">
            <div className="font-medium">{job.company.name}</div>
            <div className="text-xs text-slate-400">{job.company.email}</div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-slate-300">Status</div>
            <div className="mt-1">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                job.status === "pending" ? "bg-yellow-600 text-white" :
                job.status === "approved" ? "bg-green-600 text-white" : "bg-red-600 text-white"
              }`}>{job.status}</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm text-slate-300 mb-2">Applicants ({applicants.length})</h4>
            {applicants.length === 0 ? (
              <div className="text-slate-400 text-sm">No applicants yet</div>
            ) : (
              <ul className="space-y-2 text-sm">
                {applicants.map((a) => (
                  <li key={a.id} className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-white">{a.name}</div>
                      <div className="text-xs text-slate-400">{a.email}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a href={a.resume} className="text-sky-400 text-sm hover:underline">Resume</a>
                      <button className="text-sm text-slate-300">Message</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
