import React, { useState } from "react";
import CustomSelect from "../../../../components/CustomSelect";
import { Eye, EyeOff } from "lucide-react";

export default function UserAccountSettings() {
  // Prefilled from backend (mock for now)
  const [email, setEmail] = useState("user@example.com");
  const [phone, setPhone] = useState("9876543210");
  const [emailVerified, setEmailVerified] = useState(false);

  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Toggle states for show/hide password
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  // Preferences
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("IST");

  // ✅ Live password match validation
  const passwordMismatch =
    confirmPassword.length > 0 && confirmPassword !== newPassword;

  const handleSave = (e) => {
    e.preventDefault();

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      return; // inline error already showing
    }

    alert("✅ Account settings saved (frontend only)");
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("⚠️ Please fill all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      return; // ❌ inline error already visible
    }
    alert("✅ Password changed successfully");
    // API call for password change yaha add karna
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-10">
      <h2 className="text-xl font-semibold">Account Settings</h2>

      <form onSubmit={handleSave} className="space-y-10">
        {/* -------- Account Info -------- */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Account Information</h3>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                className="flex-1 px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailVerified ? (
                <span className="px-3 py-2 rounded-lg bg-green-600 text-white text-sm">
                  Verified
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    alert("📧 Verification link sent to your email!");
                    setEmailVerified(true); // ✅ ab use ho raha hai
                  }}
                  className="px-4 py-2 rounded-lg border border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 transition"
                >
                  Verify Email
                </button>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <input
              type="tel"
              className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText focus:outline-none focus:ring-2 focus:ring-primary"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </section>

        {/* -------- Change Password -------- */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Change Password</h3>
          <div className="space-y-3">
            {/* Current Password */}
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Current Password"
                className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-slate-400"
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* New Password */}
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                placeholder="New Password"
                className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-slate-400"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                placeholder="Confirm New Password"
                className={`w-full px-3 py-2 rounded-lg bg-bg border ${
                  passwordMismatch ? "border-red-500" : "border-slate-700"
                } text-lightText`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {passwordMismatch && (
                <p className="text-red-500 text-sm mt-1">
                  ❌ Confirm password does not match new password
                </p>
              )}
            </div>

            {/* Change Password Button */}
            <button
              type="button"
              onClick={handleChangePassword}
              disabled={passwordMismatch}
              className={`px-4 border py-2 rounded-lg transition ${
                passwordMismatch
                  ? "border-gray-500 text-gray-500 cursor-not-allowed"
                  : "border-red-500 text-red-500 hover:bg-red-500/10"
              }`}
            >
              Change Password
            </button>
          </div>
        </section>

        {/* -------- Preferences -------- */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Preferences</h3>

          {/* Language */}
          <div>
            <label className="block text-sm mb-1">Language</label>
            <CustomSelect
              value={language}
              onChange={setLanguage}
              options={[
                { value: "en", label: "English" },
                { value: "hi", label: "Hindi" },
                { value: "es", label: "Spanish" },
              ]}
            />
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm mb-1">Timezone</label>
            <CustomSelect
              value={timezone}
              onChange={setTimezone}
              options={[
                { value: "IST", label: "IST (India)" },
                { value: "EST", label: "EST (US Eastern)" },
                { value: "GMT", label: "GMT" },
              ]}
            />
          </div>
        </section>

        {/* -------- Linked Accounts -------- */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Linked Accounts</h3>
          <p className="text-sm text-muted">
            Connect your social accounts for faster login.
          </p>
          <div className="flex gap-3 flex-wrap">
            {/* Google Button */}
            <button
              type="button"
              onClick={() => alert(" Google account linked")}
              className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500/10 transition"
            >
              Connect Google
            </button>

            {/* LinkedIn Button */}
            <button
              type="button"
              onClick={() => alert(" LinkedIn account linked")}
              className="px-4 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-500/10 transition"
            >
              Connect LinkedIn
            </button>
          </div>
        </section>

        {/* Save Button */}
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
