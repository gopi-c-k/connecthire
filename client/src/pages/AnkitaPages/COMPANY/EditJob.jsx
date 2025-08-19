import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../services/secureApi"; // axios instance
import CompanyLayout from "../layouts/CompanyLayout";



const EditJob = () => {
  const { jobId } = useParams(); // ✅ get ID from URL
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch job by ID
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/job/${jobId}`); // <-- confirm endpoint with backend
        setJobData(res.data);
      } catch (err) {
        console.error("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  // ✅ Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Submit updated job
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/job/${jobId}`, jobData); // <-- confirm endpoint
      alert("Job updated successfully!");
      navigate("/company/manage-jobs");
    } catch (err) {
      console.error("Error updating job:", err);
      alert("Failed to update job.");
    }
  };

  return (
    <CompanyLayout>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Job</h1>

        {loading ? (
          <p className="text-gray-400">Loading job details...</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-gray-900 p-6 rounded-lg shadow-md"
          >
            <div>
              <label className="block mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={jobData.title}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={jobData.description}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
              />
            </div>

            <div>
              <label className="block mb-1">Job Type</label>
              <select
                name="jobType"
                value={jobData.jobType}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
              >
                <option value="">Select type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </CompanyLayout>
  );
};

export default EditJob;
