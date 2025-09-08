import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLinkedin, FaArrowLeft, FaFlag, FaRegCommentDots } from "react-icons/fa";
import {
  Briefcase,
  GraduationCap,
  Phone,
  Network,
  Laptop,
  FileText,
  MapPin,
  FlagTriangleRight
} from "lucide-react";
import CompanyLayout from "../layouts/CompanyLayout";
import api from "../../../secureApi";

export default function UserProfile() {
  const { jobSeekerId } = useParams();
  const [profile, setProfile] = useState(null);
  const [messageAllow, setMessageAllow] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const DEFAULT_AVATAR = "https://ui-avatars.com/api/?name=User";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/company/jobseeker-profile/${jobSeekerId}`);
        const jobSeeker = res.data.jobSeeker;

        setProfile({
          ...jobSeeker,
          profilePicture: jobSeeker.profilePicture || DEFAULT_AVATAR,
          skills: Array.isArray(jobSeeker.skills) ? jobSeeker.skills : [],
          contact: jobSeeker.contact || {},
          experience: jobSeeker.experience || [],
          education: jobSeeker.education || [],
          certifications: jobSeeker.certifications || [],
          availability: jobSeeker.availability || "Not provided",
        });

        // from backend
        setMessageAllow(res.data.messageAllow);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [jobSeekerId]);

  if (loading)
    return <div className="text-center py-10 text-lightText">Loading...</div>;

  if (!profile)
    return (
      <CompanyLayout>
        <div className="text-center py-10 text-red-400">
          This Profile is Private Account.
        </div>
      </CompanyLayout>
    );

  return (
    <CompanyLayout>
      <div className="max-w-5xl mx-auto p-6 text-lightText space-y-6">
        {/* 🔹 Top Action Bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-lightGray hover:text-white"
          >
            <FaArrowLeft /> Back
          </button>

          <div className="flex items-center gap-4">
            {messageAllow && (
              <button
                onClick={() => alert("Open message box here")}
                className="text-primary hover:text-primaryDark"
                title="Send Message"
              >
                <FaRegCommentDots size={20} />
              </button>
            )}

            <button
              onClick={() => alert("Report feature")}
              className="text-red-500 hover:text-red-400"
              title="Report"
            >
              <FlagTriangleRight size={18} />
            </button>
          </div>
        </div>

        {/* 🔹 Header */}
        <div className="bg-surface rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 border border-slate-700 shadow-lg">
          <img
            src={profile.profilePicture}
            alt="User Avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-glowPrimary"
          />
          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-bold">
              {profile.fullName || "User Name"}
            </h1>
            <p className="text-muted">{profile.bio || "No bio provided."}</p>
            <div className="flex items-center gap-2 text-sm text-lightGray">
              <MapPin size={14} />{" "}
              {profile.contact.address || "Location not provided"}
            </div>
            <div className="text-sm text-lightGray">
              Availability: {profile.availability}
            </div>
          </div>
        </div>

        {/* 🔹 Experience */}
        <div className="bg-surface rounded-xl p-5 border border-slate-700 shadow">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <Briefcase size={18} /> Experience
          </h2>
          {profile.experience.length > 0 ? (
            profile.experience.map((exp, i) => (
              <p key={i}>
                {exp.role} at {exp.company} {`(${exp.years})`}
              </p>
            ))
          ) : (
            <p className="text-muted">No experience added.</p>
          )}
        </div>

        {/* 🔹 Education */}
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

        {/* 🔹 Skills */}
        <div className="bg-surface rounded-xl p-5 border border-slate-700 shadow">
          <h2 className="text-xl font-semibold mb-3">Skills</h2>
          {profile.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-darkGray text-sm border border-slate-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-muted">No skills added yet.</p>
          )}
        </div>

        {/* 🔹 Contact */}
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
                <a
                  href={profile.contact.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  Portfolio
                </a>
              ) : (
                "Not provided"
              )}
            </p>
            <p className="flex items-center gap-2">
              <FaLinkedin size={14} />{" "}
              {profile.contact.linkedin ? (
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  LinkedIn
                </a>
              ) : (
                "Not provided"
              )}
            </p>
            <p className="flex items-center gap-2">
              <FileText size={14} />{" "}
              {profile.resume ? (
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
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
