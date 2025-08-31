import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Building2 } from "lucide-react";
import JobseekerLayout from "../layouts/JobseekerLayout";
import api from "../../../secureApiForUser";
import CustomSelect from "../../../components/CustomSelect"; // ✅ import top me add karna

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await api.get("/jobseeker/proposals"); 
        console.log("Fetched applications:", res.data);
        setApplications(res.data || []);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const filteredApplications =
    statusFilter === "all"
      ? applications
      : applications.filter((app) => app.status === statusFilter);

  const statusColors = {
    applied: "bg-slate-700 text-slate-200",
    "under review": "bg-yellow-500/20 text-yellow-400",
    interview: "bg-blue-500/20 text-blue-400",
    accepted: "bg-green-500/20 text-green-400",
    rejected: "bg-red-500/20 text-red-400",
  };

  return (
    <JobseekerLayout>
      <div className="p-6 text-lightText space-y-6">
        {/* Heading + Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl font-bold">My Applications</h1>
          <div className="relative">
  <CustomSelect
  value={statusFilter}
  onChange={setStatusFilter}
  options={[
    { value: "all", label: "All" },
    { value: "applied", label: "Applied" },
    { value: "under review", label: "Under Review" },
    { value: "interview", label: "Interview" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
  ]}
/>

 
</div>


        </div>

        {/* Applications List */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-muted text-sm p-6 text-center">
              Loading applications...
            </div>
          ) : error ? (
            <div className="text-red-400 text-sm p-6 text-center">
              {error}
            </div>
          ) : filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
              <div
                key={app._id}
                className="rounded-xl border border-slate-700 bg-darkGray/60 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-bg border border-slate-700">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <div className="font-medium">{app.job?.title}</div>
                    <div className="text-sm text-muted flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Building2 size={14} /> {app.job?.company?.companyName}
                      </span>
                      <span>•</span>
                      <span>{app.job?.jobType}</span>
                      <span>•</span>
                      <span>{app.job?.location}</span>
                    </div>
                    <div className="text-xs text-muted mt-1">
                      Applied on{" "}
                      {app.createdAt
                        ? new Date(app.createdAt).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      statusColors[app.status?.toLowerCase()] ||
                      "bg-slate-700 text-slate-200"
                    }`}
                  >
                    {app.status || "Applied"}
                  </span>
                  <Link
                    to={`/user/job/${app.job?._id}`}
                    className="px-3 py-1 rounded-lg bg-accent text-white hover:shadow-glowAccent text-xs"
                  >
                    View Job
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-muted text-sm p-6 text-center border border-slate-800 rounded-xl">
              You haven’t applied to any jobs yet.
            </div>
          )}
        </div>
      </div>
    </JobseekerLayout>
  );
}
