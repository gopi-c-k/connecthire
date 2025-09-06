import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";


export default function SecuritySettings() {
  // Privacy toggles
  const [showInSearch, setShowInSearch] = useState(true);
  const [allowDirectMessages, setAllowDirectMessages] = useState(true);
  const [receiveApplicationEmails, setReceiveApplicationEmails] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  // Blocked list
  const [blockedList, setBlockedList] = useState(["spam.recruiter@fake.com"]);
  const [newBlock, setNewBlock] = useState("");

  // UI
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // Load initial privacy & blocked list (replace with real API calls)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // TODO: replace with companyService.getPrivacy() and companyService.getBlockedList()
        const mockPrivacy = {
          showInSearch: true,
          allowDirectMessages: true,
          receiveApplicationEmails: true,
          dataSharing: false,
        };
        const mockBlocked = ["spam.recruiter@fake.com"];

        if (!mounted) return;
        // small delay to simulate fetch
        setTimeout(() => {
          setShowInSearch(mockPrivacy.showInSearch);
          setAllowDirectMessages(mockPrivacy.allowDirectMessages);
          setReceiveApplicationEmails(mockPrivacy.receiveApplicationEmails);
          setDataSharing(mockPrivacy.dataSharing);
          setBlockedList(mockBlocked);
        }, 200);
      } catch (err) {
        console.error("Failed to load privacy settings", err);
      }
    })();
    return () => (mounted = false);
  }, []);

  const handleSavePrivacy = async (e) => {
    e && e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        showInSearch,
        allowDirectMessages,
        receiveApplicationEmails,
        dataSharing,
        blockedList,
      };
      // TODO: await companyService.updatePrivacy(payload)
      await new Promise((r) => setTimeout(r, 500));
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

      {/* Privacy toggles */}
      <section className=" rounded-2xl border border-slate-700 p-6">
        <h3 className="text-lg font-medium text-lightText">Privacy controls</h3>
        <p className="text-sm text-muted">Control visibility and how applicants or recruiters interact with your company.</p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center gap-3">
            <input id="showInSearch" type="checkbox" checked={showInSearch} onChange={(e) => setShowInSearch(e.target.checked)} className="w-4 h-4" />
            <span className="text-sm text-lightText">Show company in search results</span>
          </label>

          <label className="flex items-center gap-3">
            <input id="allowDirectMessages" type="checkbox" checked={allowDirectMessages} onChange={(e) => setAllowDirectMessages(e.target.checked)} className="w-4 h-4" />
            <span className="text-sm text-lightText">Allow applicants to message directly</span>
          </label>

          <label className="flex items-center gap-3">
            <input id="receiveApplicationEmails" type="checkbox" checked={receiveApplicationEmails} onChange={(e) => setReceiveApplicationEmails(e.target.checked)} className="w-4 h-4" />
            <span className="text-sm text-lightText">Receive email notifications for new applications</span>
          </label>

          <label className="flex items-center gap-3">
            <input id="dataSharing" type="checkbox" checked={dataSharing} onChange={(e) => setDataSharing(e.target.checked)} className="w-4 h-4" />
            <span className="text-sm text-lightText">Allow anonymized data sharing for analytics</span>
          </label>
        </div>

        <div className="pt-4 flex justify-end">
          <button onClick={handleSavePrivacy} disabled={saving} className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primaryDark">
            {saving ? "Saving..." : "Save privacy settings"}
          </button>
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`fixed right-6 bottom-6 z-50 px-4 py-3 rounded-xl ${toast.type === "success" ? "bg-primary text-white" : toast.type === "warning" ? "bg-yellow-600 text-black" : "bg-red-600 text-white"}`}>
          <div className="text-sm">{toast.message}</div>
        </motion.div>
      )}
    </motion.div>
  );
}
