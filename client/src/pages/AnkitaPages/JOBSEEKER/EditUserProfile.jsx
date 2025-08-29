import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditUserProfile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    avatar: "",
    headline: "",
    bio: "",
    skills: "",
    experience: "",
    education: "",
    location: "",
    email: "",
    phone: "",
    portfolio: "",
    resume: "",
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [avatarFile, setAvatarFile] = useState(null);

  const navigate = useNavigate();
  const DEFAULT_AVATAR = "https://ui-avatars.com/api/?name=User";

  useEffect(() => {
    // TODO: API call karega tumhara teammate
    setTimeout(() => {
      setProfile({
        fullName: "Ankita Sharma",
        avatar: DEFAULT_AVATAR,
        headline: "Frontend Developer",
        bio: "Passionate frontend developer...",
        skills: "React, Tailwind, JavaScript",
        experience: "3 years",
        education: "B.Tech in CSE",
        location: "Bengaluru",
        email: "ankita@example.com",
        phone: "+91 98765 43210",
        portfolio: "https://myportfolio.com",
        resume: "https://myresume.com/resume.pdf",
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // TODO: API integration by teammate
      alert("✅ Profile saved (mock).");
      navigate("/user/profile", { state: { refresh: true } });
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("❌ Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-surface text-lightText rounded-2xl shadow-deep mt-8">
      <h1 className="text-3xl font-bold mb-6 border-b border-mediumGray pb-3">
        Edit Profile
      </h1>

      <div className="space-y-5">
        {/* Avatar Upload */}
        <div>
          <label className="block mb-1 font-medium text-lightGray">Profile Picture</label>
          <div className="border-2 border-dashed border-darkGray p-4 rounded-lg cursor-pointer hover:border-primary">
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="w-full text-sm" />
            {profile.avatar && (
              <img
                src={profile.avatar}
                alt="Avatar Preview"
                className="w-28 h-28 mt-3 object-cover rounded-full border-4 border-primary shadow-glowPrimary"
              />
            )}
          </div>
        </div>

        {/* Input Fields */}
        {[
          { label: "Full Name", name: "fullName", type: "text" },
          { label: "Headline (e.g. Frontend Developer)", name: "headline", type: "text" },
          { label: "Bio", name: "bio", type: "textarea" },
          { label: "Skills (comma separated)", name: "skills", type: "text" },
          { label: "Experience", name: "experience", type: "text" },
          { label: "Education", name: "education", type: "text" },
          { label: "Location", name: "location", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone", name: "phone", type: "text" },
          { label: "Portfolio Link", name: "portfolio", type: "url" },
          { label: "Resume Link", name: "resume", type: "url" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium text-lightGray">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={profile[field.name]}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-bg text-lightText border border-darkGray focus:outline-none focus:ring-2 focus:ring-primary"
                rows="4"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={profile[field.name]}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-bg text-lightText border border-darkGray focus:outline-none focus:ring-2 focus:ring-primary"
              />
            )}
          </div>
        ))}

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className={`bg-success px-6 py-3 rounded-lg transition text-white font-semibold shadow-glowSuccess ${
            saving ? "opacity-70 cursor-not-allowed" : "hover:bg-successDark"
          }`}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
};

export default EditUserProfile;
