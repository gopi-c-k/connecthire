import React, { useState, useEffect } from "react";
import api from "../../../services/secureApi"; // ✅ Axios instance with credentials

const CompanyProfile = () => {
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

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const BASE_URL = process.env.REACT_APP_BASE || "";
  const DEFAULT_LOGO =
    process.env.REACT_APP_COMPANY_DEFAULT_LOGO ||
    "https://via.placeholder.com/150";

  // ✅ Fetch company profile from backend (with no-cache)
  const fetchProfile = async () => {
    try {
      const { data } = await api.get(`${BASE_URL}/company/profile`, {
        headers: { "Cache-Control": "no-cache" },
      });
      setProfile({
        name: data.name || "",
        logo: data.logo || "",
        foundingDate: data.foundingDate || "",
        description: data.description || "",
        location: data.location || "",
        website: data.website || "",
        industry: data.industry || "",
        teamSize: data.teamSize || "",
        contactEmail: data.contactEmail || "",
        phone: data.phone || "",
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ✅ Handle form change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // ✅ Save updated profile and refresh state immediately
  const handleSave = async () => {
    try {
      const { data } = await api.put(`${BASE_URL}/company/profile`, profile, {
        headers: { "Cache-Control": "no-cache" },
      });

      // Update state directly with fresh saved data
      setProfile({
        name: data.name || "",
        logo: data.logo || "",
        foundingDate: data.foundingDate || "",
        description: data.description || "",
        location: data.location || "",
        website: data.website || "",
        industry: data.industry || "",
        teamSize: data.teamSize || "",
        contactEmail: data.contactEmail || "",
        phone: data.phone || "",
      });

      setIsEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("❌ Failed to update profile.");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-surface text-lightText rounded-2xl shadow-deep mt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-mediumGray pb-3">
        <h1 className="text-3xl font-bold tracking-wide">
          {isEditing ? "Edit Company Profile" : "Company Profile"}
        </h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-5 py-2 rounded-xl font-semibold transition-all shadow-soft 
            ${
              isEditing
                ? "bg-errorText text-bg hover:bg-errorBg"
                : "bg-primary text-white hover:bg-primaryDark"
            }`}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* Editing Form */}
      {isEditing ? (
        <div className="space-y-5">
          {[
            { label: "Company Name", name: "name" },
            { label: "Logo URL", name: "logo" },
            { label: "Founding Date", name: "foundingDate", type: "date" },
            { label: "Description", name: "description" },
            { label: "Location", name: "location" },
            { label: "Website", name: "website" },
            { label: "Industry", name: "industry" },
            { label: "Team Size", name: "teamSize" },
            { label: "Contact Email", name: "contactEmail", type: "email" },
            { label: "Phone", name: "phone" },
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
                  className="w-full p-3 rounded-lg bg-bg text-lightText border border-darkGray focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-glowPrimary transition"
                  rows="4"
                />
              ) : (
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={profile[field.name]}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-bg text-lightText border border-darkGray focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-glowPrimary transition"
                />
              )}
            </div>
          ))}

          <button
            onClick={handleSave}
            className="bg-success px-6 py-3 rounded-lg hover:bg-successDark transition text-white font-semibold shadow-glowSuccess"
          >
            Save Profile
          </button>
        </div>
      ) : (
        // View Mode - Clean Profile Layout
        <div className="space-y-6">
          {/* Top Section with Logo and Name */}
          <div className="flex items-center gap-6">
            <img
              src={profile.logo || DEFAULT_LOGO}
              alt="Company Logo"
              className="w-28 h-28 object-cover rounded-full border-4 border-primary shadow-glowPrimary"
            />
            <div>
              <h2 className="text-2xl font-bold">{profile.name || "Not provided"}</h2>
              <p className="text-muted">{profile.industry || "Industry not provided"}</p>
              <p className="text-sm text-lightGray">{profile.location || "Location not provided"}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <p>
              <strong className="text-lightGray">Founded:</strong> {profile.foundingDate || "Not provided"}
            </p>
            <p>
              <strong className="text-lightGray">Website:</strong>{" "}
              {profile.website ? (
                <a href={profile.website} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                  {profile.website}
                </a>
              ) : (
                "Not provided"
              )}
            </p>
            <p>
              <strong className="text-lightGray">Team Size:</strong> {profile.teamSize || "Not provided"}
            </p>
            <p>
              <strong className="text-lightGray">Email:</strong> {profile.contactEmail || "Not provided"}
            </p>
            <p>
              <strong className="text-lightGray">Phone:</strong> {profile.phone || "Not provided"}
            </p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold mb-2">About Us</h3>
            <p className="text-lightText leading-relaxed">
              {profile.description || "No description provided."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
