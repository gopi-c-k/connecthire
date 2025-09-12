import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../../../secureApiForAdmin";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/admin/jobs/${id}`);
        const data = res.data?.data;
        setJob(data.job);
        setProposals(data.proposals || []);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchJob();
  }, [id]);

  if (!job) return <div className="p-6 text-white">Loading job…</div>;

  return (
    <div className="p-4 sm:p-6 text-white">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-2 rounded-md bg-slate-700/40 text-slate-200"
        >
          <ArrowLeft className="w-4 h-4 inline mr-2" /> Back
        </button>
        <div className="flex items-center gap-3">
          {job.company?.companyLogo && (
            <img
              src={job.company.companyLogo}
              alt="logo"
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <h2 className="text-2xl font-semibold">{job.title}</h2>
            <div className="text-sm text-slate-400">
              <Link
                to={`/admin/company/${job.company?._id}`}
                className="text-indigo-400 hover:underline"
              >
                {job.company?.companyName}
              </Link>{" "}
              • {job.location} • {job.jobType}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job details */}
        <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700 rounded-lg p-4 space-y-4">
          <section>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-slate-200">{job.description}</p>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-slate-300 mb-1">Requirements</h4>
            <ul className="list-disc pl-5 text-slate-200">
              {job.requirements?.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-slate-300 mb-1">Qualifications</h4>
            <ul className="list-disc pl-5 text-slate-200">
              {job.qualifications?.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-slate-300 mb-1">Responsibilities</h4>
            <ul className="list-disc pl-5 text-slate-200">
              {job.responsibilities?.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-slate-300 mb-1">Skills</h4>
            <div className="flex gap-2 flex-wrap">
              {job.skills?.map((s, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center pt-4 border-t border-slate-700">
            <div>
              <strong>{job.openings}</strong>
              <div className="text-xs text-slate-400">Openings</div>
            </div>
            <div>
              <strong>
                {job.salaryRange?.min} - {job.salaryRange?.max}{" "}
                {job.salaryRange?.currency}
              </strong>
              <div className="text-xs text-slate-400">Salary Range</div>
            </div>
            <div>
              <strong>
                {new Date(job.applicationDeadline).toLocaleDateString()}
              </strong>
              <div className="text-xs text-slate-400">Deadline</div>
            </div>
          </section>

          <Link to="/admin/jobs" className="text-slate-300 hover:underline">
            Close
          </Link>
        </div>

        {/* Proposals */}
        <aside className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold mb-3">
            Proposals ({proposals.length})
          </h4>
          {proposals.length === 0 ? (
            <div className="text-slate-400 text-sm">No proposals yet</div>
          ) : (
            <ul className="space-y-3 text-sm">
              {proposals.map((p) => (
                <li key={p._id} className="border-b border-slate-700 pb-2 flex items-start gap-2">
                  {p.jobSeeker?.profilePicture && (
                    <img
                      src={p.jobSeeker.profilePicture}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover mt-0.5"
                    />
                  )}
                  <div>
                    <Link
                      to={`/admin/jobseeker/${p.jobSeeker?._id}`}
                      className="font-medium text-indigo-400 hover:underline"
                    >
                      {p.jobSeeker?.fullName}
                    </Link>
                    <div className="text-xs text-slate-400 mt-1">
                      {p.coverLetter}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
}
