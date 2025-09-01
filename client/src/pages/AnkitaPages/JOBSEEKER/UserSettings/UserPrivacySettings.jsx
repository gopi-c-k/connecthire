import React, { useState } from "react";
import CustomSelect from "../../../../components/CustomSelect";

export default function UserPrivacySettings() {
  // States
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [resumeVisible, setResumeVisible] = useState(true);
  const [jobPreference, setJobPreference] = useState("remote");
  const [messagePreference, setMessagePreference] = useState("anyone");
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [blockedList, setBlockedList] = useState([
    "ABC Recruiters",
    "XYZ Pvt Ltd",
  ]); // mock data for now
  const [newBlock, setNewBlock] = useState("");

  const handleBlock = () => {
    if (newBlock.trim() === "") return;
    if (blockedList.includes(newBlock)) {
      alert("⚠️ This company is already blocked");
      return;
    }
    setBlockedList([...blockedList, newBlock.trim()]);
    setNewBlock("");
    alert(`🚫 ${newBlock} blocked`);
  };

  const handleUnblock = (company) => {
    setBlockedList(blockedList.filter((item) => item !== company));
    alert(`✅ ${company} unblocked`);
  };

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

        {/* -------- Show Online Status -------- */}
        <section className="flex items-center gap-3">
          <input
            id="onlineStatus"
            type="checkbox"
            checked={showOnlineStatus}
            onChange={(e) => setShowOnlineStatus(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="onlineStatus" className="text-sm">
            Show my online status
          </label>
        </section>

        {/* -------- Blocked Companies/Recruiters -------- */}
        <section className="space-y-3">
          <h3 className="text-lg font-medium">Blocked Companies / Recruiters</h3>

          {/* Add new block input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter company or recruiter name"
              value={newBlock}
              onChange={(e) => setNewBlock(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText"
            />
            <button
              type="button"
              onClick={handleBlock}
              className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500/10"
            >
              Block
            </button>
          </div>

          {/* Blocked list display */}
          {blockedList.length === 0 ? (
            <p className="text-sm text-muted">No companies blocked</p>
          ) : (
            <ul className="space-y-2">
              {blockedList.map((company, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center px-3 py-2 rounded-lg bg-bg border border-slate-700"
                >
                  <span>{company}</span>
                  <button
                    type="button"
                    onClick={() => handleUnblock(company)}
                    className="px-2 py-1 text-xs border border-red-500 text-red-500 rounded hover:bg-red-500/10"
                  >
                    Unblock
                  </button>
                </li>
              ))}
            </ul>
          )}
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
