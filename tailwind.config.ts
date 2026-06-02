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
        // Sumi-e ink + washi paper + a single traditional hanko (seal) red.
        // Yin-yang black & white with Scandinavian restraint.
        indigo: {
          DEFAULT: "#17171B",
          deep: "#0A0A0C",
          soft: "#26262C",
        },
        chilli: {
          DEFAULT: "#B23A2E", // muted seal red
          dark: "#8C2A20",
          glow: "#C2453A",
        },
        gold: {
          DEFAULT: "#BCB2A0", // warm stone (elegant mono accent)
          soft: "#D8D0C0",
          deep: "#9A8F7B",
        },
        ink: {
          DEFAULT: "#0B0B0C",
          800: "#131315",
          700: "#1B1B1E",
          deep: "#060607",
        },
        cream: "#ECE6DA", // washi / bone white
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
          "linear-gradient(110deg, transparent 30%, rgba(188,178,160,0.6) 50%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
