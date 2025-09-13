// src/pages/Company/JobseekersList.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";

/* mock data (inline) */
const jobseekers = [
  {
    id: "js1",
    name: "Ankita Sharma",
    email: "ankita.sharma@example.com",
    location: "Bengaluru, India",
    phone: "+91 98765 43210",
    headline: "Frontend Developer | React, Redux, Tailwind",
    skills: ["React", "Redux", "JavaScript"],
    avatar: "/assets/user-default.png",
  },
  {
    id: "js2",
    name: "Rohit Verma",
    email: "rohit.verma@example.com",
    location: "Mumbai, India",
    phone: "+91 91234 56789",
    headline: "Fullstack Developer | Node, React",
    skills: ["Node.js", "Express", "React"],
    avatar: "/assets/user-default.png",
  },
];

export default function JobseekersList() {
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-screen bg-bg text-lightText">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Jobseekers</h1>

        <div className="flex items-center justify-between mb-4 gap-4">
          <input
            placeholder="Search by name, skill or location"
            className="flex-1 bg-surface placeholder:opacity-60 text-lightText px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Link
            to="/company/jobseekers"
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primaryDark text-white font-medium"
          >
            Refresh
          </Link>
        </div>

        <div className="grid gap-4">
          {jobseekers.map((u) => (
            <article
              key={u.id}
              className="bg-surface rounded-2xl p-4 md:p-5 border border-slate-700 shadow-soft flex items-center gap-4 hover:shadow-medium transition"
            >
              <img
                src={u.avatar}
                alt={u.name}
                className="w-16 h-16 rounded-xl object-cover border-2 border-slate-800"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://ui-avatars.com/api/?background=111827&color=fff&name=" +
                    encodeURIComponent(u.name);
                }}
              />

              <div className="flex-1">
                <Link
                  to={`/company/jobseeker/${u.id}`}
                  className="text-xl font-semibold hover:underline block"
                >
                  {u.name}
                </Link>
                <p className="text-sm text-muted mt-1">{u.headline}</p>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-lightGray">
                  <span className="px-2 py-1 rounded-full bg-darkGray/60 border border-slate-700">
                    {u.location}
                  </span>
                  {u.skills.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 rounded-full bg-darkGray/40 text-sm border border-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <a
                  href={`mailto:${u.email}`}
                  className="text-sm text-muted hover:text-lightText"
                >
                  {u.email}
                </a>
                <div className="text-sm text-muted">{u.phone}</div>

                {/* ✅ Directly navigate to chat */}
                <button
                  onClick={() =>
                    navigate("/company/messages", { state: { to: u.id, name: u.name } })
                  }
                  className="mt-3 inline-block px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primaryDark shadow-soft"
                >
                  Send Message
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* empty state */}
        {jobseekers.length === 0 && (
          <div className="mt-8 bg-surface rounded-xl p-6 border border-slate-700 text-center text-muted">
            No jobseekers found.
          </div>
        )}
      </div>
    </div>
  );
}
