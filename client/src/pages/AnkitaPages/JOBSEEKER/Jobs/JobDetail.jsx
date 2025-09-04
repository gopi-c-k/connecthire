import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Briefcase, Building2, X, Users } from "lucide-react";
import JobseekerLayout from "../../layouts/JobseekerLayout";
import api from "../../../../secureApiForUser";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/job/${id}`);
        console.log("Fetched job data:", res.data);
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

  const handleApply = async () => {
    try {
      setSubmitting(true);
      const res = await api.post(`/jobseeker/apply/${id}`, { coverLetter });

      if (res.status === 201) {
        alert("Application submitted successfully!");
        setIsModalOpen(false);
        setCoverLetter("");
        navigate("/user/applications");
      } else if (res.status === 406) {
        alert("Application already submitted!");
      }
    } catch (err) {
      console.error("Error applying:", err);
      alert("Failed to apply. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async () => {
    try {
      const res = await api.post(`/jobseeker/save-job/${id}`);
      if (res.status === 200) {
        alert("Job saved successfully!");
      } else {
        alert(res.data.message || "Failed to save job.");
      }
    } catch (err) {
      console.error("Error saving job:", err);
      alert("Failed to save job. Please try again.");
    }
  };

  if (loading) {
    return (
      <JobseekerLayout>
        <div className="p-6 text-lightText">Loading...</div>
      </JobseekerLayout>
    );
  }

  if (error || !job) {
    return (
      <JobseekerLayout>
        <div className="p-6 text-lightText">
          <div className="bg-surface rounded-xl p-6 border border-slate-700">
            <div className="text-xl font-semibold mb-2">Job not found</div>
            <p className="text-muted mb-4">
              {error || "The job you’re looking for doesn’t exist."}
            </p>
            <Link
              to="/user/jobs"
              className="px-4 py-2 rounded-lg bg-primary text-white"
            >
              Back to Jobs
            </Link>
          </div>
        </div>
      </JobseekerLayout>
    );
  }

  return (
    <JobseekerLayout>
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
              <div className="text-xs text-muted mt-1">
                Posted on {new Date(job.postedAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 mt-2">
            {job.status === "open" ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-accent text-white hover:shadow-glowAccent"
              >
                Apply
              </button>
            ) : (
              <span className="px-4 py-2 rounded-lg bg-slate-700 text-white">
                Applications Closed
              </span>
            )}
            <button
              onClick={() => { handleSave() }}
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primaryDark"
            >
              Save
            </button>
            <Link
              to="/user/jobs"
              className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
            >
              Back to Jobs
            </Link>
          </div>
        </div>

        {/* Job Information */}
        <div className="bg-surface rounded-xl border border-slate-700 p-4 space-y-2">
          <h2 className="text-lg font-semibold">Job Information</h2>
          <p><strong>Industry:</strong> {job.industry}</p>
          <p><strong>Experience Level:</strong> {job.experienceLevel}</p>
          <p><strong>Duration:</strong> {job.duration}</p>
          <p>
            <strong>Salary:</strong> {job.salaryRange?.currency} {job.salaryRange?.min} - {job.salaryRange?.max}
          </p>
          <p><strong>Openings:</strong> {job.openings}</p>
          <p><strong>Status:</strong> {job.status}</p>
          <p>
            <strong>Application Deadline:</strong>{" "}
            {new Date(job.applicationDeadline).toLocaleDateString()}
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

        {/* Applicants Count */}
        <div className="bg-surface rounded-xl border border-slate-700 p-4 flex items-center gap-2">
          <Users size={18} />
          <span>
            <strong>Applicants:</strong> {job.applicants?.length || 0}
          </span>
        </div>
      </div>

      {/* Apply Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface border border-slate-700 rounded-xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-muted hover:text-white"
            >
              <X size={18} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Apply for {job.title}</h2>
            <textarea
              rows={6}
              className="w-full p-3 rounded border border-slate-700 bg-bg text-lightText focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Write your cover letter..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-700 text-white"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={submitting || !coverLetter.trim()}
                className="px-4 py-2 rounded-lg bg-accent text-white hover:shadow-glowAccent disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </div>
        </div>
      )}
    </JobseekerLayout>
  );
}
