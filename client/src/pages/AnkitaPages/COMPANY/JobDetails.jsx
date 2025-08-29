import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Briefcase, Building2 } from "lucide-react";
import api from "../../../secureApi";
import CompanyLayout from "../layouts/CompanyLayout";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/job/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Error fetching job:", err);
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (<CompanyLayout><div className="p-6 text-lightText">Loading...</div></CompanyLayout>);
  }

  if (error || !job) {
    return (
      <CompanyLayout>
        <div className="p-6 text-lightText">
          <div className="bg-surface rounded-xl p-6 border border-slate-700">
            <div className="text-xl font-semibold mb-2">Job not found</div>
            <p className="text-muted mb-4">
              {error || "The job you’re looking for doesn’t exist."}
            </p>
            <Link
              to="/company/jobs"
              className="px-4 py-2 rounded-lg bg-primary text-white"
            >
              Back to Jobs
            </Link>
          </div>
        </div>
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <div className="p-6 text-lightText space-y-6">
        {/* Header */}
        <div className="bg-surface rounded-xl border border-slate-700 p-4 flex flex-col gap-2">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-bg border border-slate-700">
              <Briefcase size={18} />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{job.title}</h1>
              <div className="text-sm text-muted flex flex-wrap items-center gap-2">
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

          {/* Actions */}
          <div className="flex flex-wrap gap-2 mt-2">
            <button
              onClick={() => navigate(`/company/job/edit/${id}`)}
              className="px-4 py-2 rounded-lg bg-accent text-white hover:shadow-glowAccent"
            >
              Edit
            </button>
            <button
              onClick={() => navigate(`/company/job/${id}/applicants`)}
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primaryDark"
            >
              View Applicants ({job.applicants?.length || 0})
            </button>
            <Link
              to="/company/jobs"
              className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
            >
              Back to Jobs
            </Link>
          </div>
        </div>

        {/* Job Info */}
        <div className="bg-surface rounded-xl border border-slate-700 p-4 space-y-3">
          <h2 className="text-lg font-semibold">Job Information</h2>
          <p><strong>Industry:</strong> {job.industry}</p>
          <p><strong>Experience Level:</strong> {job.experienceLevel}</p>
          <p><strong>Duration:</strong> {job.duration}</p>
          <p>
            <strong>Salary:</strong> {job.salaryRange?.currency} {job.salaryRange?.min} - {job.salaryRange?.max}
          </p>
          <p>
            <strong>Openings:</strong> {job.openings}
          </p>
          <p>
            <strong>Status:</strong> {job.status}
          </p>
          <p>
            <strong>Application Deadline:</strong>{" "}
            {new Date(job.applicationDeadline).toLocaleDateString()}
          </p>
          <p>
            <strong>Posted At:</strong>{" "}
            {new Date(job.postedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Description */}
        <div className="bg-surface rounded-xl border border-slate-700 p-4">
          <h2 className="text-lg font-semibold mb-2">Job Description</h2>
          <p className="text-lightText">{job.description}</p>
        </div>

        {/* Qualifications */}
        {Array.isArray(job.qualifications) && job.qualifications.length > 0 && (
          <div className="bg-surface rounded-xl border border-slate-700 p-4">
            <h2 className="text-lg font-semibold mb-2">Qualifications</h2>
            <ul className="list-disc pl-5 text-lightText space-y-1">
              {job.qualifications.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Requirements */}
        {Array.isArray(job.requirements) && job.requirements.length > 0 && (
          <div className="bg-surface rounded-xl border border-slate-700 p-4">
            <h2 className="text-lg font-semibold mb-2">Requirements</h2>
            <ul className="list-disc pl-5 text-lightText space-y-1">
              {job.requirements.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Responsibilities */}
        {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
          <div className="bg-surface rounded-xl border border-slate-700 p-4">
            <h2 className="text-lg font-semibold mb-2">Responsibilities</h2>
            <ul className="list-disc pl-5 text-lightText space-y-1">
              {job.responsibilities.map((res, i) => (
                <li key={i}>{res}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills */}
        {Array.isArray(job.skills) && job.skills.length > 0 && (
          <div className="bg-surface rounded-xl border border-slate-700 p-4">
            <h2 className="text-lg font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-slate-700 text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Additional Tags */}
        {Array.isArray(job.additionalTags) && job.additionalTags.length > 0 && (
          <div className="bg-surface rounded-xl border border-slate-700 p-4">
            <h2 className="text-lg font-semibold mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {job.additionalTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-slate-700 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </CompanyLayout>
  );
}
