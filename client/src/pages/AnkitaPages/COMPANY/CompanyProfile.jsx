import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../services/secureApi";

const CompanyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Environment variables
  const BASE_URL = process.env.REACT_APP_BASE || "";
  const DEFAULT_LOGO =
    process.env.REACT_APP_COMPANY_DEFAULT_LOGO ||
    "https://via.placeholder.com/150";

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `${BASE_URL}/company/profile?t=${Date.now()}`
      );
      const company = data.company;

      setProfile({
        name: company.companyName || "Not provided",
        logo: company.logo?.url || DEFAULT_LOGO,
        foundingDate: company.foundingDate || "Not provided",
        description: company.description || "Not provided",
        location: company.location || "Not provided",
        website: company.website || "Not provided",
        industry: company.industry || "Not provided",
        teamSize: company.teamSize || "Not provided",
        contactEmail: company.contactEmail || "Not provided",
        phone: company.phone || "Not provided",
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Refetch whenever the URL changes (like after navigating back from Edit page)
  useEffect(() => {
    fetchProfile();
  }, [location.state]);

  if (loading)
    return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-surface text-lightText rounded-2xl shadow-deep mt-8">
      <div className="flex justify-between items-center mb-6 border-b border-mediumGray pb-3">
        <h1 className="text-3xl font-bold tracking-wide">Company Profile</h1>
        <button
          onClick={() => navigate("/company/profile/edit")}
          className="px-5 py-2 rounded-xl font-semibold bg-primary text-white hover:bg-primaryDark shadow-soft"
        >
          Edit
        </button>
      </div>

      <div className="space-y-6">
        {/* Company Header */}
        <div className="flex items-center gap-6">
          <img
            src={profile.logo || DEFAULT_LOGO}
            alt="Company Logo"
            className="w-28 h-28 object-cover rounded-full border-4 border-primary shadow-glowPrimary"
          />
          <div>
            <h2 className="text-2xl font-bold">
              {profile.name || "Not provided"}
            </h2>
            <p className="text-muted">
              {profile.industry || "Industry not provided"}
            </p>
            <p className="text-sm text-lightGray">
              {profile.location || "Location not provided"}
            </p>
          </div>
        </div>

        {/* Company Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <p>
            <strong className="text-lightGray">Founded:</strong>{" "}
            {profile.foundingDate || "Not provided"}
          </p>
          <p>
            <strong className="text-lightGray">Website:</strong>{" "}
            {profile.website ? (
              <a
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                {profile.website}
              </a>
            ) : (
              "Not provided"
            )}
          </p>
          <p>
            <strong className="text-lightGray">Team Size:</strong>{" "}
            {profile.teamSize || "Not provided"}
          </p>
          <p>
            <strong className="text-lightGray">Email:</strong>{" "}
            {profile.contactEmail || "Not provided"}
          </p>
          <p>
            <strong className="text-lightGray">Phone:</strong>{" "}
            {profile.phone || "Not provided"}
          </p>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-2">About Us</h3>
          <p className="text-lightText leading-relaxed">
            {profile.description || "No description provided."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
