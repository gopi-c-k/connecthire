import React from "react";

export default function UserDangerSettings() {
  const handleDeactivate = () => {
    if (window.confirm("Are you sure you want to deactivate your account?")) {
      alert("Account deactivated (frontend only)");
    }
  };

  const handleDelete = () => {
    if (window.confirm("⚠️ This will permanently delete your account. Continue?")) {
      alert("Account deleted (frontend only)");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>

      {/* Deactivate Account */}
      <div className="p-4 border border-yellow-600 bg-yellow-900/20 rounded-lg">
        <h3 className="font-semibold mb-2">Deactivate Account</h3>
        <p className="text-sm text-muted mb-3">
          Temporarily deactivate your account. You can reactivate by logging in again.
        </p>
        <button
          onClick={handleDeactivate}
          className="px-4 py-2 rounded-lg bg-yellow-600 text-black hover:bg-yellow-500"
        >
          Deactivate Account
        </button>
      </div>

      {/* Delete Account */}
      <div className="p-4 border border-red-600 bg-red-900/20 rounded-lg">
        <h3 className="font-semibold mb-2">Delete Account</h3>
        <p className="text-sm text-muted mb-3">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
