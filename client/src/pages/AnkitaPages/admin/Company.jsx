import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../../secureApiForAdmin";

export default function AdminCompanyProfile() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/admin/companies/${id}`);
        setCompany(res.data?.data || null);
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  if (loading) return <div className="p-6 text-white">Loading company…</div>;
  if (!company) return <div className="p-6 text-white">No data found.</div>;

  return (
    <div className="p-6 text-white">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Company Profile</h2>
        <Link
          to="/admin/company"
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          ← Back
        </Link>
      </div>

      <div className="bg-white/5 border border-slate-700 rounded p-6 space-y-6">
        {/* Logo + Name */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src={company.companyLogo}
            alt="logo"
            className="w-32 h-32 rounded-full object-cover bg-gray-800"
          />
          <div>
            <h3 className="text-2xl font-medium">{company.companyName}</h3>
            <p className="text-sm text-gray-300">{company.industry}</p>
            <p className="text-sm text-gray-300">
              Founded: {company.founded} | Size: {company.size}
            </p>
            <p className="text-sm text-gray-300">Location: {company.location}</p>
            <p className="text-sm text-gray-300">
              Website:{" "}
              <a
                href={company.website}
                className="text-indigo-400"
                target="_blank"
                rel="noreferrer"
              >
                {company.website}
              </a>
            </p>
            <p className="text-sm text-gray-300">
              Contact Email: {company.contactEmail}
            </p>
          </div>
        </div>

        {/* Description */}
        {company.description && (
          <div>
            <h4 className="text-lg font-semibold">About</h4>
            <p className="text-sm text-gray-300">{company.description}</p>
          </div>
        )}

        {/* Jobs Posted */}
        <div>
          <h4 className="text-lg font-semibold">Jobs Posted</h4>
          {company.jobsPosted && company.jobsPosted.length > 0 ? (
            <ul className="list-disc list-inside text-sm text-gray-300">
              {company.jobsPosted.map((job) => (
                <li key={job._id}>
                  <Link
                    to={`/admin/jobs/${job._id}`}
                    className="text-indigo-400 hover:underline"
                  >
                    {job.title}
                    </Link> – {job.status} (
                  {new Date(job.postedAt).toLocaleDateString()})
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-400 text-sm">No jobs posted</span>
          )}
        </div>

        {/* Reports */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <strong>{company.jobsPosted?.length || 0}</strong>
            <div className="text-xs text-gray-300">Jobs Posted</div>
          </div>
          <div>
            <strong>{company.raisedReports?.length || 0}</strong>
            <div className="text-xs text-gray-300">Reports Raised</div>
          </div>
        </div>
      </div>
    </div>
  );
}
