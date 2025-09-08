import React from "react";

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-lightText">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">
        Have questions, feedback, or partnership ideas? We’d love to hear from you.
      </p>
      <ul className="space-y-2">
        <li>Email: <a href="mailto:support@connecthire.com" className="text-primary underline">support@connecthire.com</a></li>
        <li>Phone: +91-9876543210</li>
        <li>Address: ConnectHire HQ, Bengaluru, India</li>
      </ul>
    </div>
  );
}
