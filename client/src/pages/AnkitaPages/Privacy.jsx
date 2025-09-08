import React from "react";

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-lightText">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At ConnectHire, your privacy matters. We are committed to protecting your
        personal information.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>We collect only the information necessary for providing our services.</li>
        <li>Your data will not be sold to third parties.</li>
        <li>We may use cookies and analytics to improve user experience.</li>
        <li>You can reach us anytime regarding your data at privacy@connecthire.com.</li>
      </ul>
      <p className="mt-4 text-sm text-muted">Last updated: {new Date().getFullYear()}</p>
    </div>
  );
}
