import React, { useState } from "react";
import CustomSelect from "../../../../components/CustomSelect";

export default function UserPrivacySettings() {
  // States
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [resumeVisible, setResumeVisible] = useState(true);
  const [jobPreference, setJobPreference] = useState("remote");
  const [messagePreference, setMessagePreference] = useState("anyone");


  const handleSave = (e) => {
    e.preventDefault();
    // API call jaayegi yaha (secureAPI.post("/user/privacy", {...}))
    alert("Privacy settings saved (frontend only)");
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Privacy Settings</h2>

      <form onSubmit={handleSave} className="space-y-8">
        {/* -------- Profile Visibility -------- */}
        <section className="space-y-2">
          <label className="block text-sm font-medium">Profile Visibility</label>
          <CustomSelect
            value={profileVisibility}
            onChange={setProfileVisibility}
            options={[
              { value: "public", label: "Public" },
              { value: "recruiters", label: "Recruiters only" },
              { value: "private", label: "Private " },
            ]}
          />
        </section>


        {/* -------- Job Preference -------- */}
        <section className="space-y-2">
          <label className="block text-sm font-medium">Job Preference</label>
          <CustomSelect
            value={jobPreference}
            onChange={setJobPreference}
            options={[
              { value: "remote", label: "Remote" },
              { value: "onsite", label: "Onsite" },
              { value: "hybrid", label: "Hybrid" },
            ]}
          />
        </section>

        {/* -------- Who Can Message Me -------- */}
        <section className="space-y-2">
          <label className="block text-sm font-medium">Who Can Message Me</label>
          <CustomSelect
            value={messagePreference}
            onChange={setMessagePreference}
            options={[
              { value: "anyone", label: "Anyone" },
              { value: "recruiters", label: "Recruiters Only" },
              { value: "nobody", label: "Nobody" },
            ]}
          />
        </section>


        {/* -------- Resume Visibility -------- */}
        <section className="flex items-center gap-3">
          <input
            id="resumeVisible"
            type="checkbox"
            checked={resumeVisible}
            onChange={(e) => setResumeVisible(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="resumeVisible" className="text-sm">
            Allow recruiters to view my resume
          </label>
        </section>

        {/* -------- Save Button -------- */}
        <div className="pt-4">
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
