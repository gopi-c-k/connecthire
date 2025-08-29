import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../secureApi"; // axios instance
import CompanyLayout from "../layouts/CompanyLayout";
import { ChipInput } from "../../../components/ChipInput";// ✅ Chip input component
//
// ✅ Main Component
//
const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    jobId,
    title: "",
    description: "",
    location: "",
    duration: "",
    salaryRange: { min: "", max: "", currency: "USD" },
    experienceLevel: "",
    skills: [],
    jobType: "",
    requirements: [],
    responsibilities: [],
    qualifications: [],
    openings: "",
    applicationDeadline: "",
    industry: "",
    additionalTags: [],
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch job by ID
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/job/${jobId}`);
        const job = res.data;
        console.log("Fetched job data:", job);
        setJobData({
          ...job,
          skills: job.skills || [],
          requirements: job.requirements || [],
          responsibilities: job.responsibilities || [],
          qualifications: job.qualifications || [],
          additionalTags: job.additionalTags || [],
        });
      } catch (err) {
        console.error("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  // ✅ Handle form input change (supports nested salaryRange)
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("salaryRange.")) {
      const key = name.split(".")[1];
      setJobData((prev) => ({
        ...prev,
        salaryRange: {
          ...prev.salaryRange,
          [key]: value,
        },
      }));
    } else {
      setJobData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const inputClasses =
    "mt-1 block w-full border border-muted p-2 rounded bg-bg text-lightText focus:outline-none focus:ring-2 focus:ring-primary";

  // ✅ Submit updated job
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...jobData,
      jobId,
      jobType: jobData.jobType?.trim() || "full-time",
    };

    try {
      await api.put(`/job/fill-form`, payload);
      alert("Job updated successfully!");
      navigate("/company/jobs");
    } catch (err) {
      console.error("Error updating job:", err);
      alert("Failed to update job.");
    }
  };

  return (
    <CompanyLayout>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Job - {jobData.title}</h1>

        {loading ? (
          <p className="text-gray-400">Loading job details...</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-gray-900 p-6 rounded-lg shadow-md"
          >
            {/* Title */}
            <div>
              <label className="block mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={jobData.title}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={jobData.description}
                onChange={handleChange}
                className={inputClasses}
                rows="4"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            {/* Duration */}
            <label className="block">
              <span className="font-medium">Duration</span>
              <input
                type="text"
                name="duration"
                value={jobData.duration}
                onChange={handleChange}
                className={inputClasses}
              />
            </label>

            {/* Salary */}
            <div className="grid grid-cols-3 gap-2">
              <label className="block">
                <span className="font-medium">Min Salary</span>
                <input
                  type="number"
                  name="salaryRange.min"
                  value={jobData.salaryRange.min}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </label>
              <label className="block">
                <span className="font-medium">Max Salary</span>
                <input
                  type="number"
                  name="salaryRange.max"
                  value={jobData.salaryRange.max}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </label>
              <label className="block">
                <span className="font-medium">Currency</span>
                <select
                  name="salaryRange.currency"
                  value={jobData.salaryRange.currency}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>

            {/* Experience Level */}
            <label className="block">
              <span className="font-medium">Experience Level</span>
              <select
                name="experienceLevel"
                value={jobData.experienceLevel}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="">Select...</option>
                <option value="Fresher">Fresher</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
              </select>
            </label>

            {/* Job Type */}
            <div>
              <label className="block mb-1">Job Type</label>
              <select
                name="jobType"
                value={jobData.jobType}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="">Select...</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="internship">Internship</option>
                <option value="temporary">Temporary</option>
              </select>
            </div>

            {/* ✅ Chips for arrays */}
            <ChipInput
              label="Skills"
              values={jobData.skills}
              onChange={(newValues) =>
                setJobData((prev) => ({ ...prev, skills: newValues }))
              }
            />
            <ChipInput
              label="Requirements"
              values={jobData.requirements}
              onChange={(newValues) =>
                setJobData((prev) => ({ ...prev, requirements: newValues }))
              }
            />
            <ChipInput
              label="Responsibilities"
              values={jobData.responsibilities}
              onChange={(newValues) =>
                setJobData((prev) => ({ ...prev, responsibilities: newValues }))
              }
            />
            <ChipInput
              label="Qualifications"
              values={jobData.qualifications}
              onChange={(newValues) =>
                setJobData((prev) => ({ ...prev, qualifications: newValues }))
              }
            />
            <ChipInput
              label="Additional Tags"
              values={jobData.additionalTags}
              onChange={(newValues) =>
                setJobData((prev) => ({ ...prev, additionalTags: newValues }))
              }
            />

            {/* Openings */}
            <label className="block">
              <span className="font-medium">Number of Openings</span>
              <input
                type="number"
                name="openings"
                value={jobData.openings}
                onChange={handleChange}
                className={inputClasses}
              />
            </label>

            {/* Application Deadline */}
            <label className="block">
              <span className="font-medium">Application Deadline</span>
              <input
                type="date"
                name="applicationDeadline"
                value={jobData.applicationDeadline}
                onChange={handleChange}
                className={inputClasses}
              />
            </label>

            {/* Industry */}
            <label className="block">
              <span className="font-medium">Industry</span>
              <input
                type="text"
                name="industry"
                value={jobData.industry}
                onChange={handleChange}
                className={inputClasses}
              />
            </label>
            <td className="p-3 space-x-2">
              <button>
                <a href="/company/jobs" className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 br:10">
                  Cancel
                </a>
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </td>
          </form>
        )}
      </div>
    </CompanyLayout>
  );
};

export default EditJob;
