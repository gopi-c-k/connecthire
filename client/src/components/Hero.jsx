import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Hero() {
  const { openAuth } = useOutletContext() || {};

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-[#1E293B] to-[#0F172A]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-lightText">
            Hire smarter. Work faster.
          </h1>
          <p className="mb-6 text-base md:text-lg text-muted max-w-lg mx-auto md:mx-0">
            Connect companies with freelancers and developers with intelligent
            matching, secure workflows, and real-time collaboration.
          </p>
          <div className="flex justify-center md:justify-start">
            <button
              onClick={() => openAuth && openAuth("signup")}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-accent to-primary font-semibold text-white shadow-lg hover:opacity-90 transition"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="bg-white/5 rounded-xl shadow-xl p-6 flex items-center justify-center">
            <img
              src="/assets/company_logo.png"
              alt="Company Logo"
              className="w-56 md:w-80 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
