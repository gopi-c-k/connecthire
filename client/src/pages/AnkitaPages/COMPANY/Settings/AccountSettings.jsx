import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CustomSelect from "../../../../components/CustomSelect";
import { Eye, EyeOff } from "lucide-react";


export default function AccountSettings({ initialData = {}, onSave }) {
  const [companyName, setCompanyName] = useState(initialData.companyName || "");
  const [website, setWebsite] = useState(initialData.website || "");
  const [address, setAddress] = useState(initialData.address || "");


  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);


  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const passwordMismatch = confirmPassword.length > 0 && confirmPassword !== newPassword;

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setToast({ type: "error", message: "Passwords do not match" });
      setSaving(false);
      return;
    }

    const payload = {
      companyName,
      website,
      address,
    };

    try {
      if (onSave) await onSave(payload);
      setToast({ type: "success", message: "Account settings saved" });
    } catch (err) {
      setToast({ type: "error", message: "Failed to save settings" });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setToast({ type: "error", message: "Please fill all password fields" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setToast({ type: "error", message: "New passwords do not match" });
      return;
    }

    setPasswordSaving(true);
    try {
      // placeholder for API call
      await new Promise((r) => setTimeout(r, 700));
      setToast({ type: "success", message: "Password changed successfully" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setToast({ type: "error", message: "Failed to update password" });
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="space-y-10"
    >
      <h2 className="text-xl font-semibold text-lightText">Account Settings</h2>

      <form onSubmit={handleSave} className="space-y-10">
        {/* Company Info */}
        <section className=" rounded-2xl shadow-medium border border-darkGray p-6">
          <h3 className="text-lg font-medium text-lightText mb-3">Company Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4">
            <label className="text-sm text-muted">Company Name</label>
            <div className="sm:col-span-2">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your company or organization name"
                aria-label="Company Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4">
            <label className="text-sm text-muted">Website</label>
            <div className="sm:col-span-2">
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://example.com"
                aria-label="Company Website"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start mb-4">
            <label className="text-sm text-muted pt-2">Address</label>
            <div className="sm:col-span-2">
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Office address or headquarters"
                aria-label="Company Address"
              />
            </div>
          </div>
        </section>

        

        {/* Change Password */}
        <section className=" rounded-2xl shadow-medium border border-darkGray p-6">
          <h3 className="text-lg font-medium text-lightText mb-3">Change Password</h3>

          <div className="space-y-3 mb-4">
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Current Password"
                className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText focus:outline-none focus:ring-2 focus:ring-primary"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-slate-400"
                onClick={() => setShowCurrent(!showCurrent)}
                aria-label={showCurrent ? "Hide current password" : "Show current password"}
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                placeholder="New Password"
                className="w-full px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText focus:outline-none focus:ring-2 focus:ring-primary"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-slate-400"
                onClick={() => setShowNew(!showNew)}
                aria-label={showNew ? "Hide new password" : "Show new password"}
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm New Password"
                className={`w-full px-3 py-2 rounded-lg bg-bg border ${
                  passwordMismatch ? "border-red-500" : "border-slate-700"
                } text-lightText focus:outline-none focus:ring-2 focus:ring-primary`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {passwordMismatch && (
                <p className="text-red-500 text-sm mt-1">❌ Confirm password does not match new password</p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleChangePassword}
                disabled={passwordMismatch || passwordSaving}
                className={`px-4 py-2 rounded-lg transition font-semibold ${
                  passwordMismatch
                    ? "border-gray-500 text-gray-500 cursor-not-allowed bg-transparent"
                    : "border-red-500  text-red-500 hover:bg-red-500/10 bg-transparent"
                } focus:outline-none focus:ring-2 focus:ring-primary`}
              >
                {passwordSaving ? "Updating..." : "Change Password"}
              </motion.button>

              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-transparent border border-darkGray text-muted hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => {
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </section>


        {/* Save Button */}
        <div className="pt-4 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </motion.button>
        </div>
      </form>

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          className={`fixed right-6 bottom-6 z-50 px-4 py-3 rounded-xl shadow-medium ${
            toast.type === "success" ? "bg-primary text-white" : ""
          } ${toast.type === "error" ? "bg-red-600 text-white" : ""} ${
            toast.type === "warning" ? "bg-yellow-600 text-black" : ""
          }`}
        >
          <div className="text-sm">{toast.message}</div>
        </motion.div>
      )}
    </motion.div>
  );
}
