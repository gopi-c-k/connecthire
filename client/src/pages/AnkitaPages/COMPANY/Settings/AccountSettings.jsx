import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import api from "../../../../secureApi"; // ✅ your axios instance

export default function AccountSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const passwordMismatch =
    confirmPassword.length > 6 && confirmPassword !== newPassword;

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("⚠️ Please fill all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      return; // inline error already visible
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      // 🔥 Call backend API with axios instance
      const res = await api.put("/user/change-password", {
        oldPassword: currentPassword,
        newPassword: newPassword,
      });

      setMessage(res.data.message || "✅ Password changed successfully");
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Error changing password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <h2 className="text-xl font-semibold">Security Settings</h2>

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

          {/* Messages */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}

          {/* Change Password Button */}
          <button
            type="button"
            onClick={handleChangePassword}
            disabled={passwordMismatch || loading}
            className={`px-4 border py-2 rounded-lg transition ${
              passwordMismatch || loading
                ? "border-gray-500 text-gray-500 cursor-not-allowed"
                : "border-red-500 text-red-500 hover:bg-red-500/10"
            }`}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </section>
    </div>
  );
}
