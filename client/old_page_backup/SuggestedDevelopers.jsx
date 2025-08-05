import React from 'react';

const SuggestedDevelopers = () => {
  const developers = [
    {
      name: 'Priya Sharma',
      role: 'Frontend Developer',
      skills: ['React', 'Tailwind CSS', 'JavaScript'],
      experience: '2 years',
    },
    {
      name: 'Amit Verma',
      role: 'Full Stack Developer',
      skills: ['Node.js', 'MongoDB', 'React'],
      experience: '3 years',
    },
    {
      name: 'Ritika Das',
      role: 'Backend Developer',
      skills: ['Express.js', 'PostgreSQL', 'Docker'],
      experience: '4 years',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Suggested Developers</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {developers.map((dev, index) => (
            <div key={index} className="border rounded-lg p-6 bg-gray-50 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-blue-700">{dev.name}</h3>
              <p className="text-sm text-gray-600">{dev.role}</p>
              <p className="mt-2"><strong>Skills:</strong> {dev.skills.join(', ')}</p>
              <p className="mt-1"><strong>Experience:</strong> {dev.experience}</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestedDevelopers;
