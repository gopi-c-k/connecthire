import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../secureApi";
import axios from "axios";

const EditCompanyProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    logo: "",
    foundingDate: "",
    description: "",
    location: "",
    website: "",
    industry: "",
    teamSize: "",
    contactEmail: "",
    phone: "",
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [logoFile, setLogoFile] = useState(null);

  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE || "";
  const MAX_IMAGE_MB = parseFloat(process.env.REACT_APP_IMAGE_MAX_SIZE_MB || 2);

  // Fetch profile and map backend fields to frontend state
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `${BASE_URL}/company/profile`
      );

      if (data?.company) {
        const c = data.company;
        setProfile({
          name: c.companyName || "",
          logo: c.logo || "",
          foundingDate: c.founded || "",
          description: c.description || "",
          location: c.location || "",
          website: c.website || "",
          industry: c.industry || "",
          teamSize: c.size != null ? String(c.size) : "",
          contactEmail: c.contactEmail || "",
          phone: c.phone || "",
        });
      }
    } catch (err) {
      console.log("Error fetching profile:", err);
      alert("❌ Failed to fetch profile. G");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle logo file selection & preview
  // Handle logo file selection & preview
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > MAX_IMAGE_MB) {
        alert(`❌ File size exceeds ${MAX_IMAGE_MB} MB limit.`);
        return;
      }
      setLogoFile(file);

      // Show preview instantly
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload to Cloudinary
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



  // Save profile
  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {};
      let logoUrl = profile.logo;

      // If a new logo file is selected, upload it first
      if (logoFile) {
        logoUrl = await uploadToCloudinary(logoFile);
      }
      if (profile.name) payload.companyName = profile.name;
      if (profile.description) payload.description = profile.description;
      if (profile.location) payload.location = profile.location;
      if (profile.website) payload.website = profile.website;
      if (profile.industry) payload.industry = profile.industry;
      if (profile.teamSize) payload.size = Number(profile.teamSize);
      if (profile.contactEmail) payload.contactEmail = profile.contactEmail;
      if (profile.foundingDate) payload.founded = profile.foundingDate;
      if (logoUrl) payload.companyLogo = logoUrl;
      // Send JSON only,backend handles Cloudinary upload
      await api.put(`${BASE_URL}/company/profile`, payload, {
        withCredentials: true,
      });

      alert("✅ Profile updated successfully!");
      navigate("/company/profile", { state: { refresh: true } });
    } catch (err) {
      console.error("Error saving profile:", err);
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Unknown error";
      alert(`❌ Failed to update profile: ${msg}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-surface text-lightText rounded-2xl shadow-deep mt-8">
      <h1 className="text-3xl font-bold mb-6 border-b border-mediumGray pb-3">
        {profile.name ? "Edit Company Profile" : "Create Company Profile"}
      </h1>

      <div className="space-y-5">
        {/* Logo Upload */}
        <div>
          <label className="block mb-1 font-medium text-lightGray">
            Company Logo
          </label>
          <div className="border-2 border-dashed border-darkGray p-4 rounded-lg cursor-pointer hover:border-primary">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="w-full text-sm"
            />
            {profile.logo && (
              <img
                src={profile.logo}
                alt="Logo Preview"
                className="w-28 h-28 mt-3 object-cover rounded-full border-4 border-primary shadow-glowPrimary"
              />
            )}
          </div>
        </div>

        {/* Input Fields */}
        {[
          { label: "Company Name", name: "name", type: "text" },
          { label: "Founding Year", name: "foundingDate", type: "number" },
          { label: "Description", name: "description", type: "textarea" }, // multiline
          { label: "Location", name: "location", type: "text" },
          { label: "Website", name: "website", type: "url" },
          { label: "Industry", name: "industry", type: "text" },
          { label: "Team Size", name: "teamSize", type: "number" },
          { label: "Contact Email", name: "contactEmail", type: "email" },

        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium text-lightGray">
              {field.label}
            </label>
            {field.name === "description" ? (
              <textarea
                name={field.name}
                value={profile[field.name]}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-bg text-lightText border border-darkGray focus:outline-none focus:ring-2 focus:ring-primary"
                rows="4"
              />
            ) : (
              <input
                type={field.type || "text"}
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
          className={`bg-success px-6 py-3 rounded-lg transition text-white font-semibold shadow-glowSuccess ${saving ? "opacity-70 cursor-not-allowed" : "hover:bg-successDark"
            }`}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
};

export default EditCompanyProfile;
