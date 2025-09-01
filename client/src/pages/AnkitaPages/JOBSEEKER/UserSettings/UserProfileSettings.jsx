import React, { useState } from "react";
import ChipInput from "../../../../components/ChipInput"; 
import { Trash2 } from "lucide-react";

export default function UserProfileSettings() {
  const [profilePic, setProfilePic] = useState(null);
  const [resume, setResume] = useState(null);
  const [skills, setSkills] = useState(["JavaScript", "React"]);
  const [bio, setBio] = useState("");
  const [certifications, setCertifications] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [links, setLinks] = useState({
    github: "",
    linkedin: "",
    website: "",
  });

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile settings saved (frontend only)");
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Profile Settings</h2>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Profile Picture */}
        <section>
          <label className="block text-sm mb-2">Profile Picture</label>
          <div className="flex items-center gap-4">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile Preview"
                className="w-16 h-16 rounded-full border border-slate-700"
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-slate-700 text-xs text-gray-400">
                No Image
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="text-sm text-lightText"
            />
          </div>
        </section>

        {/* Resume Upload */}
        <section>
          <label className="block text-sm mb-2">Resume (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setResume(e.target.files[0])}
            className="text-sm text-lightText"
          />
          {resume && (
            <p className="text-xs text-green-400 mt-1">
              Uploaded: {resume.name}
            </p>
          )}
        </section>

        {/* Bio */}
        <section>
          <label className="block text-sm mb-2">Bio / About Me</label>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write a short summary about yourself..."
            className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </section>

        {/* Skills */}
        <section>
          <label className="block text-sm mb-2">Skills</label>
          <ChipInput
            values={skills}
            onChange={setSkills}
            placeholder="Type a skill and press Enter"
            className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </section>

        {/* Certifications */}
        <section>
          <label className="block text-sm mb-2">Certifications</label>
          <button
            type="button"
            onClick={() =>
              setCertifications([
                ...certifications,
                { name: "", org: "", year: "", credential: "" },
              ])
            }
            className="px-3 py-2 mb-3 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-500/10 text-sm"
          >
            + Add Certification
          </button>

          <div className="space-y-3">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-4 gap-2 bg-slate-800 p-3 rounded-lg relative"
              >
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() =>
                    setCertifications(certifications.filter((_, idx) => idx !== i))
                  }
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>

                {/* Fields */}
                <input
                  type="text"
                  placeholder="Certificate Name"
                  value={cert.name}
                  onChange={(e) => {
                    const copy = [...certifications];
                    copy[i].name = e.target.value;
                    setCertifications(copy);
                  }}
                  className="px-2 py-1 rounded bg-bg border border-slate-700 text-lightText"
                />
                <input
                  type="text"
                  placeholder="Organization"
                  value={cert.org}
                  onChange={(e) => {
                    const copy = [...certifications];
                    copy[i].org = e.target.value;
                    setCertifications(copy);
                  }}
                  className="px-2 py-1 rounded bg-bg border border-slate-700 text-lightText"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={cert.year}
                  onChange={(e) => {
                    const copy = [...certifications];
                    copy[i].year = e.target.value;
                    setCertifications(copy);
                  }}
                  className="px-2 py-1 rounded bg-bg border border-slate-700 text-lightText"
                />
                <input
                  type="url"
                  placeholder="Credential URL (optional)"
                  value={cert.credential}
                  onChange={(e) => {
                    const copy = [...certifications];
                    copy[i].credential = e.target.value;
                    setCertifications(copy);
                  }}
                  className="px-2 py-1 rounded bg-bg border border-slate-700 text-lightText"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience */}
        <section>
          <label className="block text-sm mb-2">Work Experience</label>
          <button
            type="button"
            onClick={() =>
              setExperience([
                ...experience,
                { role: "", company: "", years: "" },
              ])
            }
            className="px-3 py-2 mb-3 rounded-lg border border-accent text-accent hover:bg-accent/10 text-sm"
          >
            + Add Experience
          </button>
          <div className="space-y-3">
            {experience.map((exp, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-800 p-3 rounded-lg relative"
              >
                <button
                  type="button"
                  onClick={() =>
                    setExperience(experience.filter((_, idx) => idx !== i))
                  }
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
                <input
                  type="text"
                  placeholder="Role"
                  value={exp.role}
                  onChange={(e) => {
                    const copy = [...experience];
                    copy[i].role = e.target.value;
                    setExperience(copy);
                  }}
                  className="px-2 py-1 rounded bg-bg border border-slate-700 text-lightText"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => {
                    const copy = [...experience];
                    copy[i].company = e.target.value;
                    setExperience(copy);
                  }}
                  className="px-2 py-1 rounded bg-bg border border-slate-700 text-lightText"
                />
                <input
                  type="text"
                  placeholder="Years"
                  value={exp.years}
                  onChange={(e) => {
                    const copy = [...experience];
                    copy[i].years = e.target.value;
                    setExperience(copy);
                  }}
                  className="px-2 py-1 rounded bg-bg border border-slate-700 text-lightText"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <label className="block text-sm mb-2">Education</label>
          <button
            type="button"
            onClick={() =>
              setEducation([
                ...education,
                { degree: "", university: "", year: "" },
              ])
            }
            className="px-3 py-2 mb-3 rounded-lg border border-accent text-accent hover:bg-accent/10 text-sm"
          >
            + Add Education
          </button>
          <div className="space-y-3">
            {education.map((edu, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-800 p-3 rounded-lg relative"
              >
                <button
                  type="button"
                  onClick={() =>
                    setEducation(education.filter((_, idx) => idx !== i))
                  }
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const copy = [...education];
                    copy[i].degree = e.target.value;
                    setEducation(copy);
                  }}
                  className="px-2 py-1 rounded bg-bg border border-slate-700 text-lightText"
                />
                <input
                  type="text"
                  placeholder="University"
                  value={edu.university}
                  onChange={(e) => {
                    const copy = [...education];
                    copy[i].university = e.target.value;
                    setEducation(copy);
                  }}
                  className="px-2 py-1 rounded bg-bg border border-slate-700 text-lightText"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) => {
                    const copy = [...education];
                    copy[i].year = e.target.value;
                    setEducation(copy);
                  }}
                  className="px-2 py-1 rounded bg-bg border border-slate-700 text-lightText"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio Links */}
        <section>
          <h3 className="text-lg font-medium mb-2">Portfolio / Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm mb-1">GitHub</label>
              <input
                type="url"
                placeholder="Enter GitHub URL"
                value={links.github}
                onChange={(e) => setLinks({ ...links, github: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">LinkedIn</label>
              <input
                type="url"
                placeholder="Enter LinkedIn URL"
                value={links.linkedin}
                onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Personal Website</label>
              <input
                type="url"
                placeholder="Enter Website URL"
                value={links.website}
                onChange={(e) => setLinks({ ...links, website: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText"
              />
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primaryDark"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
