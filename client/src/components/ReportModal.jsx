import React, { useState } from "react";

const ReportModal = ({
  isOpen,
  onClose,
  pic,
  name,
  companyId,
  axiosInstance,
  url,
}) => {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axiosInstance.post(url, { companyId, reason, details });
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-2xl w-full max-w-md p-6 text-lightText">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={pic}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">Report {name}</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-lg bg-white/10 border border-white/20 p-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
              rows={2}
              placeholder="Write the reason..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full rounded-lg bg-white/10 border border-white/20 p-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
              rows={3}
              placeholder="Add more details..."
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-accent to-primary text-white font-semibold shadow-lg hover:opacity-90 transition"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
