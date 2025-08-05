import React from "react";

const benefits = [
  { title: "Smart Matching", desc: "Algorithmic filtering to pair the right talent with the right projects." },
  { title: "Secure Contracts", desc: "Trust layer with verified companies and freelancers." },
  { title: "Real-time Collaboration", desc: "Communicate, apply, and hire without friction." },
];

export default function Benefits() {
  return (
    <section className="py-16 bg-[#0F1F3A]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-lightText">Why ConnectHire?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((b) => (
            <div key={b.title} className="p-6 bg-surface rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2 text-lightText">{b.title}</h3>
              <p className="text-sm text-muted">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
