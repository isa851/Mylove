import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        night: "#0F172A",
        dusk: "#1E293B",
        rose: "#F43F5E",
        blush: "#FB7185",
        snow: "#F8FAFC"
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 42px rgba(244, 63, 94, 0.35)",
        glass: "0 24px 80px rgba(2, 6, 23, 0.45)"
      },
      backgroundImage: {
        "radial-rose": "radial-gradient(circle at center, rgba(244, 63, 94, 0.32), transparent 55%)"
      }
    }
  },
  plugins: []
};

export default config;
