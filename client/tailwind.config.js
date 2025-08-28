// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Existing colors
        primary: "#2563EB", // Rich blue
        accent: "#6366F1",  // Indigo
        success: "#10B981", // Emerald
        bg: "#0F172A",      // Deep navy
        surface: "#1F2E55", // Card background
        lightText: "#F1F5FE",
        muted: "#94A3B8",
        errorBg: "#4C1C1C",
        errorText: "#FCA5A5",

        // Enhanced palette
        primaryLight: "#3B82F6",
        primaryDark: "#1E40AF",
        accentLight: "#818CF8",
        accentDark: "#4F46E5",
        successLight: "#34D399",
        successDark: "#065F46",

        warning: "#F59E0B",
        warningLight: "#FBBF24",
        warningDark: "#B45309",

        info: "#0EA5E9",
        infoLight: "#38BDF8",
        infoDark: "#0369A1",

        // Unique tones for visual variety
        cyan: "#06B6D4",
        pink: "#EC4899",
        purple: "#8B5CF6",
        teal: "#14B8A6",

        // Neutral shades
        darkGray: "#1E293B",
        mediumGray: "#475569",
        lightGray: "#CBD5E1",
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      boxShadow: {
        soft: "0 4px 6px rgba(0, 0, 0, 0.08)",
        medium: "0 6px 12px rgba(0, 0, 0, 0.12)",
        deep: "0 10px 25px rgba(0, 0, 0, 0.15)",
        glowPrimary: "0 0 10px rgba(37, 99, 235, 0.6)",
        glowAccent: "0 0 10px rgba(99, 102, 241, 0.6)",
        glowSuccess: "0 0 10px rgba(16, 185, 129, 0.6)",
      },
    },
  },
  plugins: [],
};
