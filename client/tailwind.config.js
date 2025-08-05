// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        accent: "#6366F1",
        success: "#10B981",
        bg: "#0F172A",
        surface: "#1F2E55",
        lightText: "#F1F5FE",
        muted: "#94A3B8",
        errorBg: "#4C1C1C",
        errorText: "#FCA5A5",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
