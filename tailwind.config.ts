import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pulled from the original Kowloon logo.svg
        indigo: {
          DEFAULT: "#2C2276",
          deep: "#1A153F",
          soft: "#3B318F",
        },
        chilli: {
          DEFAULT: "#DD2627",
          dark: "#A81718",
          glow: "#FF3B3C",
        },
        gold: {
          DEFAULT: "#E8B873",
          soft: "#F2D6A8",
          deep: "#C8923F",
        },
        ink: {
          DEFAULT: "#0B0A14",
          800: "#13111F",
          700: "#1C1930",
        },
        cream: "#F7F1E6",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "steam-rise": {
          "0%": { opacity: "0", transform: "translateY(0) scaleX(1)" },
          "40%": { opacity: "0.5" },
          "100%": { opacity: "0", transform: "translateY(-40px) scaleX(1.6)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "steam-rise": "steam-rise 3s ease-out infinite",
      },
      backgroundImage: {
        "gold-shimmer":
          "linear-gradient(110deg, transparent 30%, rgba(232,184,115,0.6) 50%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
