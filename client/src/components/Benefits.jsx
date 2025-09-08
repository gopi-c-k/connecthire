import React from "react";
import { motion } from "framer-motion";

const benefits = [
  {
    key: "jobseekers",
    title: "For Jobseekers",
    desc: "Build your profile, explore verified job postings, save opportunities, and apply with ease — all in one dashboard.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 12a5 5 0 100-10 5 5 0 000 10z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 20a8 8 0 1116 0H4z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    key: "companies",
    title: "For Employers",
    desc: "Post jobs, review applicants, manage company profiles, and communicate directly with talent through messages and notifications.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 21V5a2 2 0 012-2h4v18H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 3h10a2 2 0 012 2v16a2 2 0 01-2 2H9V3z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    key: "admin",
    title: "For Admins",
    desc: "Monitor reports, flag suspicious activity, manage users and employers, and keep the platform safe and moderated.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const container = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.09, ease: "easeOut" },
  },
};

const card = {
  hidden: { opacity: 0, y: 10, scale: 0.99 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

export default function Benefits() {
  return (
    <section className="py-16 bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-lightText">Why ConnectHire?</h2>
        <p className="max-w-2xl mx-auto text-center text-muted mb-8">
          A single platform connecting jobseekers, employers, and admins with the right tools to hire smarter and work faster.
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {benefits.map((b) => (
            <motion.article
              key={b.key}
              variants={card}
              role="article"
              tabIndex={0}
              className="relative p-6 rounded-2xl bg-gradient-to-br from-surface/80 to-surface shadow-soft transform transition focus:outline-none focus:ring-2 focus:ring-accent/40"
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.995 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-none w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary text-white flex items-center justify-center shadow-glowAccent">
                  <div className="w-6 h-6 text-white">{b.icon}</div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-lightText">{b.title}</h3>
                  <p className="text-sm text-muted mt-1">{b.desc}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
