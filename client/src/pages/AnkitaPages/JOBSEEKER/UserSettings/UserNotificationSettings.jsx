import React, { useState } from "react";
import CustomSelect from "../../../../components/CustomSelect";

export default function UserNotificationSettings() {
  // States
  const [jobAlerts, setJobAlerts] = useState(true);
  const [jobAlertFrequency, setJobAlertFrequency] = useState("daily");

  const [applicationUpdates, setApplicationUpdates] = useState({
    submitted: true,
    shortlisted: true,
    interview: true,
    offer: true,
    rejected: false,
  });

  const [recruiterMessages, setRecruiterMessages] = useState(true);

  const [systemNotifications, setSystemNotifications] = useState({
    login: true,
    passwordChange: true,
  });

  const [channels, setChannels] = useState({
    email: true,
    inApp: true,
  });

  const [reminderIncomplete, setReminderIncomplete] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      jobAlerts,
      jobAlertFrequency,
      applicationUpdates,
      recruiterMessages,
      systemNotifications,
      channels,
      reminderIncomplete,
      marketingEmails,
    };
    console.log("Saving notification settings:", payload);
    alert("✅ Notification settings saved (frontend only)");
  };

  // ✅ Toggle UI Component
  const Toggle = ({ enabled, onChange }) => (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${
        enabled ? "bg-green-500" : "bg-gray-500"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          enabled ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Notification Settings</h2>

      <form onSubmit={handleSave} className="space-y-8">
        {/* -------- Job Alerts -------- */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Receive job alerts</span>
            <Toggle enabled={jobAlerts} onChange={setJobAlerts} />
          </div>

          {jobAlerts && (
            <div className="ml-2">
              <label className="block text-sm mb-1">Alert Frequency</label>
              <CustomSelect
                value={jobAlertFrequency}
                onChange={setJobAlertFrequency}
                options={[
                  { value: "instant", label: "Instantly" },
                  { value: "daily", label: "Daily" },
                  { value: "weekly", label: "Weekly" },
                ]}
              />
            </div>
          )}
        </section>

        {/* -------- Application Updates -------- */}
        <section className="space-y-3">
          <h3 className="text-lg font-medium">Application Updates</h3>
          {Object.keys(applicationUpdates).map((key) => (
            <div
              key={key}
              className="flex justify-between items-center border-b border-slate-700 pb-2"
            >
              <span className="text-sm capitalize">
                {key === "submitted" && "Application Submitted"}
                {key === "shortlisted" && "Shortlisted"}
                {key === "interview" && "Interview Scheduled"}
                {key === "offer" && "Offer Received"}
                {key === "rejected" && "Rejected"}
              </span>
              <Toggle
                enabled={applicationUpdates[key]}
                onChange={(val) =>
                  setApplicationUpdates({
                    ...applicationUpdates,
                    [key]: val,
                  })
                }
              />
            </div>
          ))}
        </section>

        {/* -------- Recruiter Messages -------- */}
        <section className="flex justify-between items-center">
          <span className="text-sm">Allow recruiters to send me messages</span>
          <Toggle
            enabled={recruiterMessages}
            onChange={setRecruiterMessages}
          />
        </section>

        {/* -------- System/Security Notifications -------- */}
        <section className="space-y-3">
          <h3 className="text-lg font-medium">System / Security Notifications</h3>
          <div className="flex justify-between items-center">
            <span className="text-sm">Logins from new devices</span>
            <Toggle
              enabled={systemNotifications.login}
              onChange={(val) =>
                setSystemNotifications({ ...systemNotifications, login: val })
              }
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Password change alerts</span>
            <Toggle
              enabled={systemNotifications.passwordChange}
              onChange={(val) =>
                setSystemNotifications({
                  ...systemNotifications,
                  passwordChange: val,
                })
              }
            />
          </div>
        </section>

        {/* -------- Notification Channels -------- */}
        <section className="space-y-3">
          <h3 className="text-lg font-medium">Notification Channels</h3>
          <div className="flex justify-between items-center">
            <span className="text-sm">Email Notifications</span>
            <Toggle
              enabled={channels.email}
              onChange={(val) =>
                setChannels({ ...channels, email: val })
              }
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">In-App Notifications</span>
            <Toggle
              enabled={channels.inApp}
              onChange={(val) =>
                setChannels({ ...channels, inApp: val })
              }
            />
          </div>
        </section>

        {/* -------- Reminder Notifications -------- */}
        <section className="flex justify-between items-center">
          <span className="text-sm">Remind me about incomplete applications</span>
          <Toggle
            enabled={reminderIncomplete}
            onChange={setReminderIncomplete}
          />
        </section>

        {/* -------- Marketing Emails -------- */}
        <section className="flex justify-between items-center">
          <span className="text-sm">Receive career tips & promotional emails</span>
          <Toggle
            enabled={marketingEmails}
            onChange={setMarketingEmails}
          />
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
