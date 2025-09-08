import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../../../secureApi"; 

export default function SecuritySettings() {
  const [showInSearch, setShowInSearch] = useState(true);
  const [allowDirectMessages, setAllowDirectMessages] = useState(true);
  const [receiveApplicationEmails, setReceiveApplicationEmails] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // ✅ Load from backend
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get("/company/privacy-settings");
        if (!mounted) return;

        // Map backend to state
        setShowInSearch(res.data.showInSearchResults);
        setAllowDirectMessages(res.data.allowApplicantsToMessage);
        setReceiveApplicationEmails(res.data.receiveEmailNotifications);
        setDataSharing(res.data.allowAnonymizedDataSharing);

      } catch (err) {
        console.error("Failed to load privacy settings", err);
        setToast({ type: "error", message: "Failed to load privacy settings" });
      }
    })();
    return () => (mounted = false);
  }, []);

  // ✅ Save to backend
  const handleSavePrivacy = async (e) => {
    e && e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        showInSearchResults: showInSearch,
        allowApplicantsToMessage: allowDirectMessages,
        receiveEmailNotifications: receiveApplicationEmails,
        allowAnonymizedDataSharing: dataSharing,
        // blockedList: blockedList // if you add it server-side
      };
      await api.put("/company/privacy-settings", payload);

      setToast({ type: "success", message: "Privacy settings saved" });
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Failed to save privacy settings" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 6, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.18 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-lightText">Privacy Settings</h2>

      <section className="rounded-2xl border border-slate-700 p-6">
        <h3 className="text-lg font-medium text-lightText">Privacy controls</h3>
        <p className="text-sm text-muted">
          Control visibility and how applicants or recruiters interact with your company.
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center gap-3">
            <input
              id="showInSearch"
              type="checkbox"
              checked={showInSearch}
              onChange={(e) => setShowInSearch(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-lightText">Show company in search results</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              id="allowDirectMessages"
              type="checkbox"
              checked={allowDirectMessages}
              onChange={(e) => setAllowDirectMessages(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-lightText">Allow applicants to message directly</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              id="receiveApplicationEmails"
              type="checkbox"
              checked={receiveApplicationEmails}
              onChange={(e) => setReceiveApplicationEmails(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-lightText">Receive email notifications for new applications</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              id="dataSharing"
              type="checkbox"
              checked={dataSharing}
              onChange={(e) => setDataSharing(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-lightText">Allow anonymized data sharing for analytics</span>
          </label>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={handleSavePrivacy}
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primaryDark"
          >
            {saving ? "Saving..." : "Save privacy settings"}
          </button>
        </div>
      </section>

      {toast && (
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`fixed right-6 bottom-6 z-50 px-4 py-3 rounded-xl ${
            toast.type === "success"
              ? "bg-primary text-white"
              : toast.type === "warning"
              ? "bg-yellow-600 text-black"
              : "bg-red-600 text-white"
          }`}
        >
          <div className="text-sm">{toast.message}</div>
        </motion.div>
      )}
    </motion.div>
  );
}
