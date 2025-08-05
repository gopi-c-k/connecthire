import React from "react";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-accent to-primary">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Ready to start hiring or get hired?
        </h2>
        <p className="mb-6 text-white/90">
          Join ConnectHire and get intelligent matches, faster onboarding, and secure connections.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="px-8 py-3 rounded-full bg-white text-accent font-semibold">
            Sign Up as Freelancer
          </button>
          <button className="px-8 py-3 rounded-full border border-white text-white font-semibold">
            Hire Talent
          </button>
        </div>
      </div>
    </section>
  );
}
