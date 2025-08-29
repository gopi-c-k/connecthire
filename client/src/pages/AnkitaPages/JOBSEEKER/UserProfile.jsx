import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Dummy Data (API integration baad me hoga)
  const DEFAULT_AVATAR = "https://ui-avatars.com/api/?name=User";

  useEffect(() => {
    // TODO: API call karega tumhara teammate
    setTimeout(() => {
      setProfile({
        fullName: "Ankita Sharma",
        avatar: DEFAULT_AVATAR,
        headline: "Frontend Developer | React.js | Tailwind",
        bio: "Passionate frontend developer with 3+ years of experience in building scalable web apps.",
        skills: ["React", "Tailwind", "JavaScript", "Node.js"],
        experience: "3 years",
        education: "B.Tech in Computer Science",
        location: "Bengaluru, India",
        email: "ankita@example.com",
        phone: "+91 98765 43210",
        portfolio: "https://myportfolio.com",
        resume: "https://myresume.com/resume.pdf",
      });
      setLoading(false);
    }, 1000);
  }, [location.state]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-surface text-lightText rounded-2xl shadow-deep mt-8">
      <div className="flex justify-between items-center mb-6 border-b border-mediumGray pb-3">
        <h1 className="text-3xl font-bold tracking-wide">My Profile</h1>
        <button
          onClick={() => navigate("/user/profile/edit")}
          className="px-5 py-2 rounded-xl font-semibold bg-primary text-white hover:bg-primaryDark shadow-soft"
        >
          Edit
        </button>
      </div>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-6">
          <img
            src={profile.avatar}
            alt="User Avatar"
            className="w-28 h-28 object-cover rounded-full border-4 border-primary shadow-glowPrimary"
          />
          <div>
            <h2 className="text-2xl font-bold">{profile.fullName}</h2>
            <p className="text-muted">{profile.headline}</p>
            <p className="text-sm text-lightGray">{profile.location}</p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <p><strong className="text-lightGray">Experience:</strong> {profile.experience}</p>
          <p><strong className="text-lightGray">Education:</strong> {profile.education}</p>
          <p><strong className="text-lightGray">Email:</strong> {profile.email}</p>
          <p><strong className="text-lightGray">Phone:</strong> {profile.phone}</p>
          <p><strong className="text-lightGray">Portfolio:</strong>{" "}
            <a href={profile.portfolio} target="_blank" rel="noreferrer" className="text-primary hover:underline">
              {profile.portfolio}
            </a>
          </p>
          <p><strong className="text-lightGray">Resume:</strong>{" "}
            <a href={profile.resume} target="_blank" rel="noreferrer" className="text-primary hover:underline">
              View Resume
            </a>
          </p>
        </div>

        {/* About */}
        <div>
          <h3 className="text-xl font-semibold mb-2">About Me</h3>
          <p className="text-lightText leading-relaxed">{profile.bio}</p>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-darkGray text-sm border border-mediumGray/40">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
