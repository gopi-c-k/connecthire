import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../secureApiForUser";
import ChipInput from "../../../components/ChipInput";
import CustomSelect from "../../../components/CustomSelect";
import axios from "axios";

export default function EditUserProfile() {
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
  const navigate = useNavigate();

  const DEFAULT_AVATAR = "https://ui-avatars.com/api/?name=User";

  const BASE_URL = process.env.REACT_APP_BASE || "";
  const MAX_IMAGE_MB = parseFloat(process.env.REACT_APP_IMAGE_MAX_SIZE_MB || 2);

  // ✅ Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/jobseeker/profile");
        console.log("Fetched profile:", res.data);
        res.data = res.data.jobSeeker;

        setProfile({
          ...res.data,
          profilePicture: res.data.profilePicture || DEFAULT_AVATAR,
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

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...profile };
      console.log("Payload being sent to backend:", payload);
      
      let logoUrl = profile.profilePicture;
      if (logoFile) {
        logoUrl = await uploadToCloudinary(logoFile);
      }
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
    <div className="max-w-4xl mx-auto p-8 bg-surface text-lightText rounded-2xl shadow-deep mt-8 space-y-6">
      <h1 className="text-3xl font-bold mb-6 border-b border-mediumGray pb-3">Edit Profile</h1>

      {/* Avatar */}
      <div>
        <label className="block mb-1 font-medium text-lightGray">Profile Picture</label>
        </div>
        <div className="border-2 border-dashed border-darkGray p-4 rounded-lg cursor-pointer hover:border-primary">
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          className="text-sm text-lightText"
        />
        {profile.profilePicture && (
          <img
            src={profile.profilePicture}
            alt="Preview"
            className="w-28 h-28 mt-3 object-cover rounded-full border-4 border-primary shadow-glowPrimary"
          />
        )}
      </div>

      {/* Full Name */}
      <div>
        <label className="block mb-1 font-medium text-lightGray">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={profile.fullName}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-bg text-lightText border border-darkGray focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Bio */}
      <div>
        <label className="block mb-1 font-medium text-lightGray">Bio</label>
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          rows="3"
          className="w-full p-3 rounded-lg bg-bg text-lightText border border-darkGray focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block mb-1 font-medium text-lightGray">Skills</label>
        <ChipInput
          values={profile.skills}
          onChange={(newValues) =>
            setProfile((prev) => ({ ...prev, skills: newValues }))
          }
          placeholder="Type a skill and press Enter"
          className="w-full p-3 rounded-lg bg-bg text-lightText border border-darkGray"
        />
      </div>


      {/* Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["phone", "address", "linkedin", "portfolio"].map((field) => (
          <div key={field}>
            <label className="block mb-1 font-medium text-lightGray">{field}</label>
            <input
              type="text"
              name={field}
              value={profile.contact[field]}
              onChange={handleContactChange}
              className="w-full p-3 rounded-lg bg-bg text-lightText border border-darkGray focus:ring-2 focus:ring-primary"
            />
          </div>
        ))}
      </div>

      {/* Resume */}
      <div>
        <label className="block mb-1 font-medium text-lightGray">Resume Link</label>
        <input
          type="text"
          name="resume"
          value={profile.resume}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-bg text-lightText border border-darkGray focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Availability */}
      <div>
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
      </div>


      {/* Experience */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Experience</h2>
        {profile.experience.map((exp, i) => (
          <div key={i} className="space-y-2 mb-4 border p-3 rounded-lg border-darkGray">
            {["company", "role", "startDate", "endDate", "description"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field}
                value={exp[field]}
                onChange={(e) => handleArrayChange("experience", i, field, e.target.value)}
                className="w-full p-2 rounded-lg bg-bg text-lightText border border-darkGray focus:ring-2 focus:ring-primary mb-2"
              />
            ))}
            <button
              onClick={() => removeField("experience", i)}
              className="text-red-400 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            addField("experience", { company: "", role: "", startDate: "", endDate: "", description: "" })
          }
          className="px-3 py-1 bg-primary text-white rounded-lg text-sm"
        >
          + Add Experience
        </button>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Education</h2>
        {profile.education.map((edu, i) => (
          <div key={i} className="space-y-2 mb-4 border p-3 rounded-lg border-darkGray">
            {["degree", "institution", "year"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field}
                value={edu[field]}
                onChange={(e) => handleArrayChange("education", i, field, e.target.value)}
                className="w-full p-2 rounded-lg bg-bg text-lightText border border-darkGray focus:ring-2 focus:ring-primary mb-2"
              />
            ))}
            <button
              onClick={() => removeField("education", i)}
              className="text-red-400 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            addField("education", { degree: "", institution: "", year: "" })
          }
          className="px-3 py-1 bg-primary text-white rounded-lg text-sm"
        >
          + Add Education
        </button>
      </div>

      {/* Certifications */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Certifications</h2>
        {profile.certifications.map((cert, i) => (
          <div key={i} className="space-y-2 mb-4 border p-3 rounded-lg border-darkGray">
            {["title", "issuer", "year"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field}
                value={cert[field]}
                onChange={(e) => handleArrayChange("certifications", i, field, e.target.value)}
                className="w-full p-2 rounded-lg bg-bg text-lightText border border-darkGray focus:ring-2 focus:ring-primary mb-2"
              />
            ))}
            <button
              onClick={() => removeField("certifications", i)}
              className="text-red-400 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            addField("certifications", { title: "", issuer: "", year: "" })
          }
          className="px-3 py-1 bg-primary text-white rounded-lg text-sm"
        >
          + Add Certification
        </button>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className={`bg-success px-6 py-3 rounded-lg transition text-white font-semibold shadow-glowSuccess ${saving ? "opacity-70 cursor-not-allowed" : "hover:bg-successDark"
          }`}
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}
