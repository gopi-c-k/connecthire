import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChipInput from "../../../../components/ChipInput";
import CustomSelect from "../../../../components/CustomSelect";
import { Trash2 } from "lucide-react";
import axios from "axios";
import api from "../../../../secureApiForUser";

export default function UserProfileSettings() {
  const [profilePic, setProfilePic] = useState(null);
  const [resume, setResume] = useState(null);
  const [skills, setSkills] = useState(["JavaScript", "React"]);
  const [bio, setBio] = useState("");
  const [certifications, setCertifications] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [links, setLinks] = useState({
    github: "",
    linkedin: "",
    website: "",
  });
  const [profile, setProfile] = useState({
    fullName: "",
    profilePicture: "",
    resume: "",
    bio: "",
    contact: {
      phone: "",
      address: "",
      linkedin: "",
      portfolio: "",
    },
    resumeName: "",
    skills: [],
    experience: [
      { company: "", role: "", startDate: "", endDate: "", description: "" },
    ],
    education: [{ degree: "", institution: "", year: "" }],
    certifications: [{ title: "", issuer: "", year: "" }],
    availability: "Full-Time",
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [logoFile, setLogoFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  const navigate = useNavigate();

  const MAX_IMAGE_MB = 4;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };



  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > MAX_IMAGE_MB) {
        alert(`❌ File size exceeds ${MAX_IMAGE_MB} MB limit.`);
        return;
      }
      setLogoFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const uploadToCloudinary = async (file) => {
    try {

      const data = new FormData();
      data.append("file", file);
      data.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      );

      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      let url;
      // ✅ Correct Cloudinary endpoint: /image/upload
      await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        data
      ).then((res) => {
        url = res.data.secure_url;
      });

      return url;
    } catch (err) {
      console.error("❌ Cloudinary upload failed:", err.response?.data || err.message);
      throw err;
    }
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      contact: { ...prev.contact, [name]: value },
    }));
  };

  const handleArrayChange = (field, index, key, value) => {
    const updated = [...profile[field]];
    updated[index][key] = value;
    setProfile((prev) => ({ ...prev, [field]: updated }));
  };

  const addField = (field, template) => {
    setProfile((prev) => ({ ...prev, [field]: [...prev[field], template] }));
  };

  const removeField = (field, index) => {
    setProfile((prev) => {
      const updated = [...prev[field]];
      updated.splice(index, 1);
      return { ...prev, [field]: updated };
    });
  };

  // Resume Section

  const MAX_RESUME_MB = 5; // for example, 5 MB max

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > MAX_RESUME_MB) {
        alert(`❌ File size exceeds ${MAX_RESUME_MB} MB limit.`);
        return;
      }

      // optional: check file type (pdf/doc/docx)
      const allowedTypes = "application/pdf"
      if (allowedTypes !== file.type) {
        alert("❌ Only PDF file allowed.");
        return;
      }

      // save file in state for uploading later
      setResumeFile(file);

      // optional: show filename immediately in UI
      setProfile((prev) => ({ ...prev, resumeName: file.name }));
    }
  };

  const uploadResumeToCloudinary = async (file) => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      );

      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

      // ✅ Use /raw/upload for non-image files like PDF/DOCX
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
        data
      );

      // Cloudinary will return a secure URL for the uploaded resume
      console.log(res);
      return res.data.secure_url;
    } catch (err) {
      alert("Some error occured try to re-upload resume");
      console.error(
        "❌ Cloudinary resume upload failed:",
        err.response?.data || err.message
      );
      throw err;
    }
  };

  // ✅ Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/jobseeker/profile");
        res.data = res.data.jobSeeker;
        setProfile({
          ...res.data,
          profilePicture: res.data.profilePicture,
          skills: Array.isArray(res.data.skills) ? res.data.skills : [],
          contact: res.data.contact || {
            phone: "",
            address: "",
            linkedin: "",
            portfolio: "",
          },
          experience: res.data.experience?.length
            ? res.data.experience
            : [{ company: "", role: "", startDate: "", endDate: "", description: "" }],
          education: res.data.education?.length
            ? res.data.education
            : [{ degree: "", institution: "", year: "" }],
          certifications: res.data.certifications?.length
            ? res.data.certifications
            : [{ title: "", issuer: "", year: "" }],
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("❌ Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...profile };

      let logoUrl = profile.profilePicture;
      if (logoFile) {
        logoUrl = await uploadToCloudinary(logoFile);
      }

      let resumeUrl = profile.resume;
      if (resumeFile) {
        resumeUrl = await uploadResumeToCloudinary(resumeFile);
      }
      payload.resume = resumeUrl;
      payload.profilePicture = logoUrl;
      await api.put("/jobseeker/profile", payload);
      alert("✅ Profile updated successfully!");
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
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Profile Settings</h2>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Profile Picture */}
        <section>
          <label className="block text-sm mb-2">Profile Picture</label>
          <div className="flex items-center gap-4">
            {profile.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt="Profile Preview"
                className="w-16 h-16 rounded-full border border-slate-700"
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-slate-700 text-xs text-gray-400">
                No Image
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="text-sm text-lightText"
            />
          </div>
        </section>

        {/* Resume Upload */}
        <section>
          <label className="block text-sm mb-2">Resume (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleResumeChange}
            className="text-sm text-lightText"
          />
          {resumeFile && (
            <p className="text-xs text-green-400 mt-1">
              Uploaded: {profile.resumeName}
            </p>
          )}
        </section>

        {/* Full Name */}
        <section>
          <label className="block text-sm mb-2">Full name</label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </section>


        {/* Bio */}
        <section>
          <label className="block text-sm mb-2">Bio / About Me</label>
          <textarea
            rows={4}
            value={profile.bio}
            onChange={handleChange}
            placeholder="Write a short summary about yourself..."
            className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </section>

        <section>
          <label className="block text-sm mb-2">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={profile.contact["phone"]}
            onChange={handleContactChange}
            className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </section>

        <section>
          <label className="block text-sm mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={profile.contact["address"]}
            onChange={handleContactChange}
            className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </section>
        <section>
          <label className="block mb-1 font-medium text-lightGray">Availability</label>
          <CustomSelect
            value={profile.availability}
            onChange={(val) => setProfile((prev) => ({ ...prev, availability: val }))}
            options={[
              { value: "Full-Time", label: "Full-Time" },
              { value: "Part-Time", label: "Part-Time" },
              { value: "Freelance", label: "Freelance" },
              { value: "Internship", label: "Internship" },
            ]}
            className="w-full p-2 rounded-lg bg-bg text-lightText border border-darkGray "

          />
        </section>

        {/* Skills */}
        <section>
          <label className="block text-sm mb-2">Skills</label>
          <ChipInput
            values={profile.skills}
            onChange={(newValues) =>
              setProfile((prev) => ({ ...prev, skills: newValues }))
            }
            placeholder="Type a skill and press Enter"
            className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </section>

        {/* Education */}
        <section>
          <label className="block text-sm mb-2">Education</label>

          <div className="space-y-3">
            {profile.education.map((edu, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-800 p-3 rounded-lg relative"
              >
                <button
                  type="button"

                  onClick={() => removeField("education", i)}
                  className="absolute right-2 text-red-400 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleArrayChange("education", i, "degree", e.target.value)}
                  className="px-2 py-1 rounded bg-bg border border-slate-700 text-lightText"
                />
                <input
                  type="text"
                  placeholder="University"
                  value={edu.institution}
                  onChange={(e) => handleArrayChange("education", i, "institution", e.target.value)}
                  className="px-2 py-1 rounded bg-bg border border-slate-700 text-lightText"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) => handleArrayChange("education", i, "year", e.target.value)}
                  className="px-2 py-1 rounded bg-bg border border-slate-700 text-lightText"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              addField("education", { degree: "", institution: "", year: "" })
            }
            className="px-3 py-2 mt-3 rounded-lg border border-accent text-accent hover:bg-accent/10 text-sm"
          >
            + Add Education
          </button>
        </section>

        {/* Work Experience */}
        <section>
          <label className="block text-sm mb-2">Work Experience</label>

          <div className="space-y-4">
            {profile.experience.map((exp, i) => (
              <div
                key={i}
                className="relative grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-800 p-3 rounded-lg"
              >
                {/* Inputs */}
                {["company", "role", "years"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field}
                    value={exp[field]}
                    onChange={(e) =>
                      handleArrayChange("experience", i, field, e.target.value)
                    }
                    className="px-2 py-1 rounded bg-bg border border-slate-700 text-lightText right-2"
                  />
                ))}

                {/* Delete icon (absolute top-right) */}
                <button
                  type="button"
                  onClick={() => removeField("experience", i)}
                  className="absolute right-0 text-red-400 hover:text-red-600"
                  aria-label="Delete experience"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              addField("experience", { company: "", role: "", years: "" })
            }
            className="px-3 py-2 mt-3 rounded-lg border border-accent text-accent hover:bg-accent/10 text-sm"
          >
            + Add Experience
          </button>
        </section>

        {/* Certifications */}
        <section>
          <label className="block text-sm mb-2">Certifications</label>


          <div className="space-y-3">
            {profile.certifications.map((cert, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-800 p-3 rounded-lg relative"
              >
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeField("certifications", i)}
                  className="absolute right-2 text-red-400 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>

                {/* Fields */}
                <input
                  type="text"
                  placeholder="Certificate Name"
                  value={cert.title}
                  onChange={(e) => handleArrayChange("certifications", i, "title", e.target.value)}
                  className="px-2 py-1 rounded bg-bg border border-slate-700 text-lightText"
                />
                <input
                  type="text"
                  placeholder="Organization"
                  value={cert.issuer}
                  onChange={(e) => handleArrayChange("certifications", i, "issuer", e.target.value)}
                  className="px-2 py-1 rounded bg-bg border border-slate-700 text-lightText"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={cert.year}
                  onChange={(e) => handleArrayChange("certifications", i, "year", e.target.value)}
                  className="px-2 py-1 rounded bg-bg border border-slate-700 text-lightText"
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              addField("certifications", { title: "", issuer: "", year: "" })
            }
            className="px-3 py-2 mt-3 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-500/10 text-sm"
          >
            + Add Certification
          </button>
        </section>





        {/* Portfolio Links */}
        <section>
          <h3 className="text-lg font-medium mb-2">Portfolio / Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm mb-1">GitHub</label>
              <input
                type="url"
                placeholder="Enter GitHub URL"
                value={profile.contact["github"]}
                name="github"
                onChange={handleContactChange}
                className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">LinkedIn</label>
              <input
                type="url"
                placeholder="Enter LinkedIn URL"
                name="linkedin"
                value={profile.contact["linkedin"]}
                onChange={handleContactChange}
                className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Personal Website</label>
              <input
                type="url"
                placeholder="Enter Website URL"
                name="portfolio"
                value={profile.contact["portfolio"]}
                onChange={handleContactChange}
                className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText"
              />
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`bg-success px-6 py-3 rounded-lg transition text-white font-semibold shadow-glowSuccess ${saving ? "opacity-70 cursor-not-allowed" : "hover:bg-successDark"
              }`}
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
