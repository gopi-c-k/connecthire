import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function UserAccountSettings() {

  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Toggle states for show/hide password
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);


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
      <h2 className="text-xl font-semibold">Security Settings</h2>

      <form onSubmit={handleSave} className="space-y-10">

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
