import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../../secureApiForUser";
import { FlagTriangleRight, ArrowLeft } from "lucide-react";
import JobseekerLayout from "../layouts/JobseekerLayout";
import ReportModal from "../../../components/ReportModal";

const CompanyProfile = () => {
    const { companyId } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const BASE_URL = process.env.REACT_APP_BASE || "";
    const DEFAULT_LOGO =
        process.env.REACT_APP_COMPANY_DEFAULT_LOGO ||
        "https://via.placeholder.com/150";

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`jobseeker/company-profile/${companyId}`);
            const company = data.company;

            setProfile({
                name: company.companyName || "Not provided",
                logo: company.companyLogo || DEFAULT_LOGO,
                foundingDate: company.founded || "Not provided",
                description: company.description || "Not provided",
                location: company.location || "Not provided",
                website: company.website || "Not provided",
                industry: company.industry || "Not provided",
                teamSize: company.size || "Not provided",
                contactEmail: company.contactEmail || "Not provided",
            });
        } catch (err) {
            console.error("Error fetching profile:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [location.state]);

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <JobseekerLayout>
            <div className="max-w-4xl mx-auto p-8 bg-surface text-lightText rounded-2xl shadow-deep mt-8">
                {/* Header bar */}
                <div className="flex justify-between items-center mb-6 border-b border-mediumGray pb-3">
                    {/* ✅ Back Icon */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1 text-lightText hover:text-primary"
                    >
                        <ArrowLeft size={20} />
                        Back
                    </button>

                    <h1 className="text-3xl font-bold tracking-wide">Company Profile</h1>

                    {/* ✅ Report Icon */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 shadow-soft"
                    >
                        <FlagTriangleRight size={18} />
                        Report
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Company Header */}
                    <div className="flex items-center gap-6">
                        <img
                            src={profile.logo}
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
            <ReportModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                pic={profile.logo}
                name={profile.name}
                id={companyId}
                axiosInstance={api}
                url="/jobseeker/report" // API endpoint
            />
        </JobseekerLayout>
    );
};

export default CompanyProfile;
