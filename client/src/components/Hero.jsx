import React from "react";

export default function Hero() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-[#1E293B] to-[#0F172A]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4 text-lightText">Hire smarter. Work faster.</h1>
          <p className="mb-6 text-lg text-muted">
            Connect companies with freelancers and developers with intelligent matching, secure workflows, and real-time collaboration.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-accent to-primary font-semibold text-white">
              Get Started
            </button>
            <button className="px-6 py-3 rounded-full border border-lightText font-semibold text-lightText">
              Learn More
            </button>
          </div>
        </div>
        <div className="flex-1">
          <div className="w-full h-64 bg-white/5 rounded-xl flex items-center justify-center">
            <span className="text-gray-300">Dashboard preview</span>
          </div>
        </div>
      </div>
    </section>
  );
}
