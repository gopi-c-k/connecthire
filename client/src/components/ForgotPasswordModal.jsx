// src/components/ForgotPasswordModal.jsx
import React, { useState } from "react";
import Button from "./Button";
import { auth } from "../firebase"; // make sure the path is correct
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ loading: false, message: "", error: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", error: "" });

    if (!/\S+@\S+\.\S+/.test(email)) {
      setStatus({ loading: false, error: "Please enter a valid email address." });
      return;
    }

    try {
      // Send Firebase password reset email
      await sendPasswordResetEmail(auth, email);
      setStatus({
        loading: false,
        message: "If this email exists, a password reset link has been sent.",
      });
    } catch (err) {
      const msg = err?.message || "Failed to send reset link. Please try again.";
      setStatus({ loading: false, error: msg });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-surface text-lightText p-6 rounded-xl shadow-xl w-80">
        <h3 className="text-lg font-semibold mb-3">Reset Password</h3>

        {status.message ? (
          <div className="text-sm text-center text-success p-2 bg-success/10 rounded">
            {status.message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {status.error && (
              <div className="text-sm text-errorText bg-errorBg p-2 rounded">
                {status.error}
              </div>
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your email"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800"
              required
            />
            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={status.loading}>
                {status.loading ? "Sending..." : "Send reset link"}
              </Button>
              <Button type="button" variant="ghost" onClick={onClose}>
                Close
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
