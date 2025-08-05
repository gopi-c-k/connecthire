import React, { useState } from 'react';

const JobApply = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    resume: null,
    coverLetter: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your backend API call logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-6 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Apply for this Job</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Upload Resume (PDF)</label>
            <input
              type="file"
              name="resume"
              accept=".pdf"
              onChange={handleChange}
              className="w-full mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Cover Letter</label>
            <textarea
              name="coverLetter"
              rows="4"
              value={formData.coverLetter}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApply;
