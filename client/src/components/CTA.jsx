// src/components/CTA.jsx
import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, ease: "easeOut", duration: 0.6 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.45 } },
};

export default function CTA({ onOpenSignup }) {
  return (
    <motion.section
      className="py-20 bg-gradient-to-r from-accent to-primary"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-5xl mx-auto text-center px-6">
        <motion.h2
          className="text-3xl font-bold mb-4 text-white"
          variants={item}
          aria-hidden={false}
        >
          Join ConnectHire today
        </motion.h2>

        <motion.p
          className="mb-6 text-white/90 max-w-2xl mx-auto"
          variants={item}
        >
          Create a free account to apply to jobs, post openings, or help keep the platform safe.
        </motion.p>

        <motion.div className="flex justify-center gap-4" variants={item}>
          <motion.button
            type="button"
            onClick={() => onOpenSignup && onOpenSignup()}
            className="px-8 py-3 rounded-full bg-white text-accent font-semibold shadow-glowPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/40"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Get started — open signup"
          >
            Get Started Free
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
