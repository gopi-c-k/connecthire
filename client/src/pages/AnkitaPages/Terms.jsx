import React from "react";

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-lightText">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="mb-4">
        By using ConnectHire, you agree to follow these terms. Please read them carefully.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Users are responsible for the accuracy of their profiles and job posts.</li>
        <li>Companies must comply with fair hiring practices.</li>
        <li>Freelancers/jobseekers must deliver genuine work and communication.</li>
        <li>Any misuse of the platform may lead to suspension or termination.</li>
      </ul>
      <p className="mt-4 text-sm text-muted">Last updated: {new Date().getFullYear()}</p>
    </div>
  );
}
