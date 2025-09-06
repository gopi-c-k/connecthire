import React, { useState, useEffect } from "react";
import CustomSelect from "../../../../components/CustomSelect";
import api from "../../../../secureApiForUser";

export default function UserPrivacySettings() {
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [resumeVisible, setResumeVisible] = useState(true);
  const [jobPreference, setJobPreference] = useState("remote");
  const [messagePreference, setMessagePreference] = useState("anyone");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch existing privacy settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const res = await api.get("/jobseeker/privacy-settings");
        const data = res.data;
        setProfileVisibility(data.profileVisibility || "public");
        setResumeVisible(
          data.viewResume !== undefined ? data.viewResume : true
        );
        setJobPreference(data.jobPreferences || "remote");
        setMessagePreference(data.messageAllowed || "anyone");
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || "Failed to load privacy settings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const res = await api.put("/jobseeker/privacy-settings", {
        profileVisibility,
        jobPreferences: jobPreference,
        messageAllowed: messagePreference,
        viewResume: resumeVisible,
      });
      setMessage(res.data.message || "Privacy settings saved");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Error saving privacy settings"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Privacy Settings</h2>

      {loading ? (
        <p className="text-gray-500">Loading settings...</p>
      ) : (
        <form onSubmit={handleSave} className="space-y-8">
          {/* Profile Visibility */}
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

          {/* Job Preference */}
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

          {/* Who Can Message Me */}
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

          {/* Resume Visibility */}
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

          {/* Messages */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-2 rounded-lg bg-primary text-white hover:bg-primaryDark ${
                saving ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
