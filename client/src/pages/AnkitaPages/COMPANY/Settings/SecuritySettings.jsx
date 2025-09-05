import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * src/pages/AnkitaPages/COMPANY/settings/SecuritySettings.jsx
 *
 * Minimal & focused company Security/Privacy page.
 * Keeps only:
 * - Privacy toggles (show in search, allow direct messages, application emails, data sharing)
 * - Block / Unblock list (emails or recruiter names)
 * - Save privacy settings
 *
 * Replace TODO comments with your companyService API calls when ready.
 */

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

  const handleBlock = () => {
    const val = newBlock.trim();
    if (!val) return setToast({ type: "warning", message: "Enter a value to block" });
    if (blockedList.includes(val)) return setToast({ type: "warning", message: "Already blocked" });
    // TODO: call API to add block => await companyService.blockEntry(val)
    setBlockedList((p) => [...p, val]);
    setNewBlock("");
    setToast({ type: "success", message: `${val} blocked` });
  };

  const handleUnblock = (entry) => {
    // TODO: call API to remove block => await companyService.unblockEntry(entry)
    setBlockedList((p) => p.filter((x) => x !== entry));
    setToast({ type: "success", message: `${entry} unblocked` });
  };

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

      {/* Blocked list */}
      <section className=" rounded-2xl border border-slate-700 p-6">
        <h3 className="text-lg font-medium text-lightText mb-2">Blocked users / recruiters</h3>
        <p className="text-sm text-muted mb-3">Block specific emails or recruiter names so they can't contact your company.</p>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Enter email or name to block"
            value={newBlock}
            onChange={(e) => setNewBlock(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-bg border border-slate-700 text-lightText focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button type="button" onClick={handleBlock} className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500/10">
            Block
          </button>
        </div>

        {blockedList.length === 0 ? (
          <p className="text-sm text-muted">No blocked entries</p>
        ) : (
          <ul className="space-y-2">
            {blockedList.map((entry, idx) => (
              <li key={idx} className="flex items-center justify-between bg-bg px-3 py-2 rounded-lg border border-slate-700">
                <span className="text-sm text-lightText">{entry}</span>
                <button type="button" onClick={() => handleUnblock(entry)} className="px-2 py-1 text-xs border border-red-500 text-red-500 rounded hover:bg-red-500/10">
                  Unblock
                </button>
              </li>
            ))}
          </ul>
        )}
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
