import { useState } from "react";
import Button from "../../components/Button";

export default function NotificationPreferences() {
  const [prefs, setPrefs] = useState({
    jobMatches: true,
    applicationUpdates: true,
    marketing: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setPrefs((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    alert("Preferences saved (Mock UI)");
  };

  return (
    <div className="min-h-screen bg-[#0F1F3A] py-10 px-4">
      <div className="max-w-lg mx-auto bg-white/5 p-6 rounded-xl border border-white/10 text-lightText">
        <h1 className="text-2xl font-bold mb-6">Notification Preferences</h1>
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="jobMatches" checked={prefs.jobMatches} onChange={handleChange} />
            Job matches
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="applicationUpdates" checked={prefs.applicationUpdates} onChange={handleChange} />
            Application updates
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="marketing" checked={prefs.marketing} onChange={handleChange} />
            Marketing emails
          </label>
        </div>
        <div className="mt-6">
          <Button variant="primary" onClick={handleSave}>Save Preferences</Button>
        </div>
      </div>
    </div>
  );
}
