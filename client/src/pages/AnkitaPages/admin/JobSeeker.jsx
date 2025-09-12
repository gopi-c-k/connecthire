import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../../secureApiForAdmin";

export default function AdminJobseekerProfile() {
  const { id } = useParams();
  const [jobseeker, setJobseeker] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/admin/jobseekers/${id}`);
        setJobseeker(res.data?.data || null);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <div className="p-6 text-white">Loading profile…</div>;
  if (!jobseeker) return <div className="p-6 text-white">No data found.</div>;

  return (
    <div className="p-6 text-white">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Jobseeker Profile</h2>
        <Link
          to="/admin/jobseeker"
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          ← Back
        </Link>
      </div>

      <div className="bg-white/5 border border-slate-700 rounded p-6 space-y-6">
        {/* Profile Picture + Name */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src={jobseeker.profilePicture}
            alt="profile"
            className="w-32 h-32 rounded-full object-cover bg-gray-800"
          />
          <div>
            <h3 className="text-2xl font-medium">{jobseeker.fullName}</h3>
            <p className="text-sm text-gray-300">Availability: {jobseeker.availability}</p>
            <p className="text-sm text-gray-300">
              Profile Visibility: {jobseeker.profileVisibility}
            </p>
            <p className="text-sm text-gray-300">
              Job Preferences: {jobseeker.jobPreferences}
            </p>
            <p className="text-sm text-gray-300">
              Joined: {new Date(jobseeker.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Bio */}
        {jobseeker.bio && (
          <div>
            <h4 className="text-lg font-semibold">Bio</h4>
            <p className="text-sm text-gray-300">{jobseeker.bio}</p>
          </div>
        )}

        {/* Skills */}
        <div>
          <h4 className="text-lg font-semibold">Skills</h4>
          <div className="flex gap-2 mt-2 flex-wrap">
            {jobseeker.skills.length > 0
              ? jobseeker.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-1 bg-gray-700 rounded text-xs"
                  >
                    {s}
                  </span>
                ))
              : <span className="text-gray-400 text-sm">No skills listed</span>}
          </div>
        </div>

        {/* Education */}
        {jobseeker.education.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold">Education</h4>
            <ul className="list-disc list-inside text-sm text-gray-300">
              {jobseeker.education.map((e) => (
                <li key={e._id}>{e.degree} – {e.institution}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Experience */}
        {jobseeker.experience.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold">Experience</h4>
            <ul className="list-disc list-inside text-sm text-gray-300">
              {jobseeker.experience.map((ex) => (
                <li key={ex._id}>
                  {ex.role} at {ex.company} ({ex.years})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Certifications */}
        {jobseeker.certifications.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold">Certifications</h4>
            <ul className="list-disc list-inside text-sm text-gray-300">
              {jobseeker.certifications.map((c) => (
                <li key={c._id}>
                  {c.title} – {c.issuer} ({c.year})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact */}
        {jobseeker.contact && (
          <div>
            <h4 className="text-lg font-semibold">Contact</h4>
            <p className="text-sm text-gray-300">Phone: {jobseeker.contact.phone}</p>
            <p className="text-sm text-gray-300">Address: {jobseeker.contact.address}</p>
            <p className="text-sm text-gray-300">
              LinkedIn:{" "}
              <a href={jobseeker.contact.linkedin} className="text-indigo-400" target="_blank" rel="noreferrer">
                {jobseeker.contact.linkedin}
              </a>
            </p>
            <p className="text-sm text-gray-300">
              GitHub: {jobseeker.contact.github}
            </p>
            <p className="text-sm text-gray-300">
              Portfolio: {jobseeker.contact.portfolio}
            </p>
          </div>
        )}

        {/* Resume */}
        <div>
          <h4 className="text-lg font-semibold">Resume</h4>
          {jobseeker.resume ? (
            <a
              href={jobseeker.resume}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:underline"
            >
              View Resume
            </a>
          ) : (
            <span className="text-gray-400 text-sm">No resume uploaded</span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div><strong>{jobseeker.jobsApplied.length}</strong><div className="text-xs text-gray-300">Jobs Applied</div></div>
          <div><strong>{jobseeker.savedJobs.length}</strong><div className="text-xs text-gray-300">Saved Jobs</div></div>
          <div><strong>{jobseeker.raisedReports.length}</strong><div className="text-xs text-gray-300">Reports Raised</div></div>
        </div>
      </div>
    </div>
  );
}
