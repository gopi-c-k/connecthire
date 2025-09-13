// src/pages/AnkitaPages/COMPANY/JobseekerProfile.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import {
  Briefcase,
  GraduationCap,
  Phone,
  Network,
  Laptop,
  FileText,
  MapPin,
} from "lucide-react";
import CompanyLayout from "../layouts/CompanyLayout";

/* Mock jobseeker data (embedded) */
const jobseekers = [
  {
    id: "js1",
    name: "Ankita Sharma",
    email: "ankita.sharma@example.com",
    location: "Bengaluru, India",
    phone: "+91 98765 43210",
    headline: "Frontend Developer | React, Redux, Tailwind",
    summary:
      "3 years experience building responsive React apps. Loves design and clean code.",
    skills: ["React", "Redux", "JavaScript", "HTML", "CSS", "Tailwind"],
    education: [{ degree: "B.Tech Computer Science", institute: "IIT Delhi", year: 2021 }],
    experience: [
      {
        company: "DesignLabs",
        title: "Frontend Developer",
        from: "2022",
        to: "Present",
        details: "Built UI components, improved performance and accessibility.",
      },
    ],
    linkedin: "https://www.linkedin.com/in/ankita-sharma",
    avatar: "/assets/user-default.png",
    portfolio: "https://ankita-portfolio.example.com",
    resume: "",
    bio: "Passionate frontend developer focused on pixel-perfect UI and accessibility.",
    availability: "Open to opportunities",
  },
  {
    id: "js2",
    name: "Rohit Verma",
    email: "rohit.verma@example.com",
    location: "Mumbai, India",
    phone: "+91 91234 56789",
    headline: "Fullstack Developer | Node, React",
    summary: "Fullstack developer focused on backend performance and APIs.",
    skills: ["Node.js", "Express", "React", "SQL"],
    education: [{ degree: "B.Sc Computer Science", institute: "Mumbai University", year: 2019 }],
    experience: [
      {
        company: "APIWorks",
        title: "Backend Engineer",
        from: "2020",
        to: "Present",
        details: "Designed microservices and REST APIs.",
      },
    ],
    linkedin: "https://www.linkedin.com/in/rohit-verma",
    avatar: "/assets/user-default.png",
    portfolio: "",
    resume: "",
    bio: "Backend-first engineer who loves optimizing APIs and DB queries.",
    availability: "Employed - Open for discussion",
  },
];

const Section = ({ title, children }) => (
  <div className="mb-4">
    <h3 className="font-semibold mb-2">{title}</h3>
    <div>{children}</div>
  </div>
);

export default function JobseekerProfile() {
  const { jobSeekerId } = useParams();
  const navigate = useNavigate();

  const user = jobseekers.find((u) => u.id === jobSeekerId);

  if (!user) {
    return (
      <CompanyLayout>
        <div className="text-center py-10 text-red-400">Profile not found.</div>
        <div className="text-center">
          <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 border rounded">
            Back
          </button>
        </div>
      </CompanyLayout>
    );
  }

  const profile = {
    profilePicture: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`,
    fullName: user.name,
    bio: user.bio || user.summary,
    contact: {
      phone: user.phone,
      address: user.location,
      linkedin: user.linkedin,
      portfolio: user.portfolio,
    },
    skills: Array.isArray(user.skills) ? user.skills : [],
    experience: Array.isArray(user.experience)
      ? user.experience.map((e) => ({
          role: e.title,
          company: e.company,
          years: `${e.from} - ${e.to}`,
          details: e.details,
        }))
      : [],
    education: Array.isArray(user.education)
      ? user.education.map((ed) => ({
          degree: ed.degree,
          institution: ed.institute || ed.institution,
          year: ed.year,
        }))
      : [],
    resume: user.resume || null,
    availability: user.availability || "Not provided",
  };

  return (
    <CompanyLayout>
      <div className="max-w-5xl mx-auto p-6 text-lightText space-y-6">
        {/* Header */}
        <div className="bg-surface rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 border border-slate-700 shadow-lg">
          <img
            src={profile.profilePicture}
            alt="User Avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-glowPrimary"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?background=111827&color=fff&name=${encodeURIComponent(user.name)}`;
            }}
          />

          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-bold">{profile.fullName}</h1>
            <p className="text-muted">{profile.bio}</p>
            <div className="flex items-center gap-2 text-sm text-lightGray">
              <MapPin size={14} /> {profile.contact.address || "Location not provided"}
            </div>
            <div className="text-sm text-lightGray">Availability: {profile.availability}</div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={profile.contact.linkedin || "#"}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl font-semibold bg-slate-800 text-white hover:opacity-90"
            >
              <FaLinkedin className="inline mr-2" /> View LinkedIn
            </a>

            

            <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-xl font-semibold border">
              ← Back
            </button>
          </div>
        </div>

        {/* Experience */}
        <div className="bg-surface rounded-xl p-5 border border-slate-700 shadow">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <Briefcase size={18} /> Experience
          </h2>

          {profile.experience.length > 0 ? (
            profile.experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="font-medium">
                  {exp.role} at {exp.company} <span className="text-sm text-muted">({exp.years})</span>
                </div>
                {exp.details && <div className="text-sm text-lightGray">{exp.details}</div>}
              </div>
            ))
          ) : (
            <p className="text-muted">No experience added.</p>
          )}
        </div>

        {/* Education */}
        <div className="bg-surface rounded-xl p-5 border border-slate-700 shadow">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <GraduationCap size={18} /> Education
          </h2>

          {profile.education.length > 0 ? (
            profile.education.map((edu, i) => (
              <p key={i}>
                {edu.degree} - {edu.institution} ({edu.year})
              </p>
            ))
          ) : (
            <p className="text-muted">No education details added.</p>
          )}
        </div>

        {/* Skills */}
        <div className="bg-surface rounded-xl p-5 border border-slate-700 shadow">
          <h2 className="text-xl font-semibold mb-3">Skills</h2>
          {profile.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-darkGray text-sm border border-slate-600">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-muted">No skills added yet.</p>
          )}
        </div>

        {/* Contact */}
        <div className="bg-surface rounded-xl p-5 border border-slate-700 shadow space-y-2">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-3">
            <Network size={14} /> Contact
          </h2>

          <div className="grid sm:grid-cols-2 gap-y-2 text-sm">
            <p className="flex items-center gap-2">
              <Phone size={14} /> {profile.contact.phone || "Not provided"}
            </p>
            <p className="flex items-center gap-2">
              <Laptop size={14} />{" "}
              {profile.contact.portfolio ? (
                <a href={profile.contact.portfolio} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                  Portfolio
                </a>
              ) : (
                "Not provided"
              )}
            </p>
            <p className="flex items-center gap-2">
              <FaLinkedin size={14} />{" "}
              {profile.contact.linkedin ? (
                <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                  LinkedIn
                </a>
              ) : (
                "Not provided"
              )}
            </p>
            <p className="flex items-center gap-2">
              <FileText size={14} />{" "}
              {profile.resume ? (
                <a href={profile.resume} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                  Resume
                </a>
              ) : (
                "Not provided"
              )}
            </p>
          </div>
        </div>
      </div>
    </CompanyLayout>
  );
}
