import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Briefcase, Building2 } from "lucide-react";
import JobseekerLayout from "../../layouts/JobseekerLayout";

const MOCK_JOBS = {
  "101": {
    id: "101",
    title: "Frontend Developer",
    company: "Nova Labs",
    type: "Full-time",
    location: "Remote",
    description:
      "Build responsive frontend interfaces using React and Tailwind. Collaborate with designers and backend engineers to deliver pixel-perfect features.",
    requirements: [
      "2+ years with React",
      "Strong JavaScript & ES6+",
      "Tailwind or CSS-in-JS experience",
      "Git & code reviews",
    ],
  },
  "102": {
    id: "102",
    title: "React Native Engineer",
    company: "SkyTech",
    type: "Contract",
    location: "Bengaluru",
    description:
      "Develop and maintain cross-platform mobile apps using React Native. Work closely with product and QA teams.",
    requirements: [
      "React Native, Redux",
      "Mobile performance tuning",
      "REST/GraphQL APIs",
    ],
  },
  "103": {
    id: "103",
    title: "UI Engineer",
    company: "BrightSoft",
    type: "Hybrid",
    location: "Pune",
    description:
      "Create accessible UI components and maintain a scalable design system.",
    requirements: ["Accessibility (a11y)", "Storybook", "Unit testing basics"],
  },
  "104": {
    id: "104",
    title: "Backend Engineer",
    company: "DataForge",
    type: "Full-time",
    location: "Hyderabad",
    description:
      "Design APIs and microservices, ensure reliability and performance.",
    requirements: ["Node.js/NestJS", "SQL/NoSQL", "AWS basics"],
  },
  "105": {
    id: "105",
    title: "Full Stack Developer",
    company: "PixelWorks",
    type: "Hybrid",
    location: "Gurugram",
    description:
      "Own features end-to-end across frontend and backend; advocate for best practices.",
    requirements: ["React + Node.js", "CI/CD", "Testing mindset"],
  },
};

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real API fetch using id
    const t = setTimeout(() => {
      setJob(MOCK_JOBS[id] ?? null);
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, [id]);

  if (loading) {
    return (
      <JobseekerLayout>
        <div className="p-6 text-lightText">Loading...</div>
      </JobseekerLayout>
    );
  }

  if (!job) {
    return (
      <JobseekerLayout>
        <div className="p-6 text-lightText">
          <div className="bg-surface rounded-xl p-6 border border-slate-700">
            <div className="text-xl font-semibold mb-2">Job not found</div>
            <p className="text-muted mb-4">The job you’re looking for doesn’t exist.</p>
            <Link to="/user/jobs" className="px-4 py-2 rounded-lg bg-primary text-white">
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
                  <Building2 size={14} /> {job.company}
                </span>
                <span>•</span>
                <span>{job.type}</span>
                <span>•</span>
                <span>{job.location}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 mt-2">
            <button
              onClick={() => navigate("/user/applications")}
              className="px-4 py-2 rounded-lg bg-accent text-white hover:shadow-glowAccent"
            >
              Apply
            </button>
            <button
              onClick={() => alert("Saved (mock)")}
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

        {/* Description */}
        <div className="bg-surface rounded-xl border border-slate-700 p-4">
          <h2 className="text-lg font-semibold mb-2">Job Description</h2>
          <p className="text-lightText">{job.description}</p>
        </div>

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
      </div>
    </JobseekerLayout>
  );
}
