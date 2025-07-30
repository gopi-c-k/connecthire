// src/UserProfile.js
import React, { useState } from 'react';
import './UserProfile.css'; // Create this file

const UserProfile= () => {
  const [formData, setFormData] = useState({
    picture: '', // URL or file path
    name: '',
    role: '',
    skills: '', // Comma-separated or array
    preferences: '',
    certifications: '',
    projects: '',
    experience: '',
    location: '',
    resume: '', // URL or file path
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    // Handle file uploads (e.g., store in state or upload to server)
    setFormData({ ...formData, [name]: files[0] }); // Store the file object
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.skills) newErrors.skills = 'Skills are required';
    if (!formData.location) newErrors.location = 'Location is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log('User Profile Form submitted:', formData);

      // Send the data to the API endpoint (e.g., /api/user/profile)
      // You'll need to handle file uploads separately (e.g., using FormData)
      // and set the Content-Type header accordingly.

      // Example using FormData for file upload:
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      fetch('/api/user/profile', {
        method: 'POST',
        // headers: { 'Content-Type': 'multipart/form-data' }, // Important for file uploads
        body: formDataToSend,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('User Profile updated successfully:', data);
        // Handle success (e.g., redirect to user dashboard)
      })
      .catch(error => {
        console.error('User Profile update error:', error);
        setErrors({ api: 'Profile update failed. Please try again.' });
      });

    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="user-profile-container bg-gray-100 p-8 rounded shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="picture" className="block text-gray-700 text-sm font-bold mb-2">
            Profile Picture:
          </label>
          <input
            type="file"
            name="picture"
            id="picture"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
            Role:
          </label>
          <input
            type="text"
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.role && <p className="text-red-500 text-xs italic">{errors.role}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="skills" className="block text-gray-700 text-sm font-bold mb-2">
            Skills:
          </label>
          <input
            type="text"
            name="skills"
            id="skills"
            value={formData.skills}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., React, Node.js, MongoDB"
          />
          {errors.skills && <p className="text-red-500 text-xs italic">{errors.skills}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="preferences" className="block text-gray-700 text-sm font-bold mb-2">
            Preferences:
          </label>
          <textarea
            name="preferences"
            id="preferences"
            value={formData.preferences}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="certifications" className="block text-gray-700 text-sm font-bold mb-2">
            Certifications:
          </label>
          <input
            type="text"
            name="certifications"
            id="certifications"
            value={formData.certifications}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="projects" className="block text-gray-700 text-sm font-bold mb-2">
            Projects:
          </label>
          <textarea
            name="projects"
            id="projects"
            value={formData.projects}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="experience" className="block text-gray-700 text-sm font-bold mb-2">
            Experience:
          </label>
          <textarea
            name="experience"
            id="experience"
            value={formData.experience}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
            Location:
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.location && <p className="text-red-500 text-xs italic">{errors.location}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="resume" className="block text-gray-700 text-sm font-bold mb-2">
            Resume:
          </label>
          <input
            type="file"
            name="resume"
            id="resume"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Profile
          </button>
        </div>
        {errors.api && <p className="text-red-500 text-xs italic">{errors.api}</p>}
      </form>
    </div>
  );
};

export default UserProfile;
