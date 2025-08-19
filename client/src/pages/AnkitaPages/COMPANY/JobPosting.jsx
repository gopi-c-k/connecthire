import React, { useState } from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import api from "../../../services/secureApi";

const JobPosting = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
    salaryRange: { min: "", max: "", currency: "USD" },
    experienceLevel: "",
    skills: "",
    jobType: "",
    requirements: "",
    responsibilities: "",
    qualifications: "",
    openings: "",
    applicationDeadline: "",
    industry: "",
    additionalTags: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("salaryRange.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        salaryRange: { ...prev.salaryRange, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
      requirements: formData.requirements.split(",").map((r) => r.trim()),
      responsibilities: formData.responsibilities.split(",").map((r) => r.trim()),
      qualifications: formData.qualifications.split(",").map((q) => q.trim()),
      additionalTags: formData.additionalTags.split(",").map((t) => t.trim()),
    };

    try {
      const res = await api.post("/job/fill-form", payload);
      setMessage({ type: "success", text: "Job posted successfully!" });
      console.log(res.data);

      setFormData({
        title: "",
        description: "",
        location: "",
        duration: "",
        salaryRange: { min: "", max: "", currency: "USD" },
        experienceLevel: "",
        skills: "",
        jobType: "",
        requirements: "",
        responsibilities: "",
        qualifications: "",
        openings: "",
        applicationDeadline: "",
        industry: "",
        additionalTags: "",
      });
    } catch (err) {
      console.error("Error posting job:", err);
      setMessage({ type: "error", text: "Failed to post job" });
    }
  };

  const inputClasses =
    "mt-1 block w-full border border-muted p-2 rounded bg-bg text-lightText focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <CompanyLayout>
      <div className="max-w-3xl mx-auto p-6 bg-surface text-lightText shadow rounded-lg font-sans">
        <h1 className="text-2xl font-bold mb-6 text-primary">Post a New Job</h1>

        {message.text && (
          <div
            className={`mb-4 p-3 rounded ${
              message.type === "success"
                ? "bg-green-800 text-green-200"
                : "bg-red-800 text-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Title */}
          <label className="block">
            <span className="font-medium">Job Title</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </label>

          {/* Description */}
          <label className="block">
            <span className="font-medium">Description</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={inputClasses}
              rows="4"
              required
            />
          </label>

          {/* Location */}
          <label className="block">
            <span className="font-medium">Location</span>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={inputClasses}
            />
          </label>

          {/* Duration */}
          <label className="block">
            <span className="font-medium">Duration</span>
            <input
              type="text"
              name="duration"
              value={formData.duration}
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
                value={formData.salaryRange.min}
                onChange={handleChange}
                className={inputClasses}
              />
            </label>
            <label className="block">
              <span className="font-medium">Max Salary</span>
              <input
                type="number"
                name="salaryRange.max"
                value={formData.salaryRange.max}
                onChange={handleChange}
                className={inputClasses}
              />
            </label>
            <label className="block">
              <span className="font-medium">Currency</span>
              <select
                name="salaryRange.currency"
                value={formData.salaryRange.currency}
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
              value={formData.experienceLevel}
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
          <label className="block">
            <span className="font-medium">Job Type</span>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select...</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
            </select>
          </label>

          {/* Skills */}
          <label className="block">
            <span className="font-medium">Skills (comma-separated)</span>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className={inputClasses}
            />
          </label>

          {/* Requirements */}
          <label className="block">
            <span className="font-medium">Requirements (comma-separated)</span>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className={inputClasses}
              rows="2"
            />
          </label>

          {/* Responsibilities */}
          <label className="block">
            <span className="font-medium">Responsibilities (comma-separated)</span>
            <textarea
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              className={inputClasses}
              rows="2"
            />
          </label>

          {/* Qualifications */}
          <label className="block">
            <span className="font-medium">Qualifications (comma-separated)</span>
            <textarea
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              className={inputClasses}
              rows="2"
            />
          </label>

          {/* Openings */}
          <label className="block">
            <span className="font-medium">Number of Openings</span>
            <input
              type="number"
              name="openings"
              value={formData.openings}
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
              value={formData.applicationDeadline}
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
              value={formData.industry}
              onChange={handleChange}
              className={inputClasses}
            />
          </label>

          {/* Additional Tags */}
          <label className="block">
            <span className="font-medium">Additional Tags (comma-separated)</span>
            <input
              type="text"
              name="additionalTags"
              value={formData.additionalTags}
              onChange={handleChange}
              className={inputClasses}
            />
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-lightText rounded hover:bg-accent transition"
          >
            Post Job
          </button>
        </form>
      </div>
    </CompanyLayout>
  );
};

export default JobPosting;
