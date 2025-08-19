import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0F1F3A] p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Job Details - {id}</h1>

      <p className="mb-6">Details about the job position will be displayed here.</p>

      <button
        onClick={() => navigate(`/company/jobs/${id}/applicants`)}
        className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        View Applicants
      </button>
    </div>
  );
}
