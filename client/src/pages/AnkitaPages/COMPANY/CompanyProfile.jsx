import React, { useState, useEffect } from "react";
import { getCompanyProfile, updateCompanyProfile } from "../../../services/companyService";

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

  // ✅ Fetch company profile from backend
  const fetchProfile = async () => {
    try {
      const { data } = await getCompanyProfile();
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

  // ✅ Save updated profile
  const handleSave = async () => {
    try {
      await updateCompanyProfile(profile);
      setIsEditing(false);
      fetchProfile();
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-surface text-lightText rounded-xl shadow-md mt-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit Company Profile" : "Company Profile"}
        </h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-primary px-4 py-2 rounded-lg hover:bg-accent transition"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
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
              <label className="block mb-1">{field.label}</label>
              {field.name === "description" ? (
                <textarea
                  name={field.name}
                  value={profile[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-bg text-lightText"
                  rows="4"
                />
              ) : (
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={profile[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-bg text-lightText"
                />
              )}
            </div>
          ))}

          <button
            onClick={handleSave}
            className="bg-success px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Save Profile
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <img
            src={profile.logo || "https://via.placeholder.com/150"}
            alt="Company Logo"
            className="w-24 h-24 object-cover rounded"
          />
          {[
            { label: "Name", value: profile.name },
            { label: "Founded", value: profile.foundingDate },
            { label: "Description", value: profile.description },
            { label: "Location", value: profile.location },
            { label: "Website", value: profile.website },
            { label: "Industry", value: profile.industry },
            { label: "Team Size", value: profile.teamSize },
            { label: "Email", value: profile.contactEmail },
            { label: "Phone", value: profile.phone },
          ].map((item) => (
            <p key={item.label}>
              <strong>{item.label}:</strong> {item.value || "Not provided"}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
