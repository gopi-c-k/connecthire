import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../services/secureApi"; // ✅ axios instance with cookies
import CompanyLayout from "../layouts/CompanyLayout";



const ViewApplicants = () => {
  const { jobId } = useParams(); // ✅ get jobId from route
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await api.get(`/job/${jobId}/applicants`); // <-- confirm endpoint with backend
        setApplicants(res.data);
      } catch (err) {
        console.error("Error fetching applicants:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [jobId]);

  return (
    <CompanyLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Applicants</h1>

        {loading ? (
          <p className="text-gray-400">Loading applicants...</p>
        ) : applicants.length === 0 ? (
          <p className="text-gray-400">No applicants yet.</p>
        ) : (
          <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800 text-gray-200">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Resume</th>
                  <th className="p-3">Applied On</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant) => (
                  <tr
                    key={applicant._id}
                    className="border-b border-gray-700 hover:bg-gray-800"
                  >
                    <td className="p-3">{applicant.name}</td>
                    <td className="p-3">{applicant.email}</td>
                    <td className="p-3">
                      {applicant.resume ? (
                        <a
                          href={applicant.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline"
                        >
                          View Resume
                        </a>
                      ) : (
                        "Not Uploaded"
                      )}
                    </td>
                    <td className="p-3">
                      {new Date(applicant.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={() => navigate("/company/manage-jobs")}
          className="mt-6 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
        >
          Back to Jobs
        </button>
      </div>
    </CompanyLayout>
  );
};

export default ViewApplicants;
