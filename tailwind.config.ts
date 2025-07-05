import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: "#2563eb",
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#2563eb",
        600: "#1d4ed8",
        700: "#1e40af",
        800: "#1e3a8a",
        900: "#172554",
      },
      secondary: {
        DEFAULT: "#64748b",
        50: "#f8fafc",
        100: "#60a5fa",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
      },
      accent: {
        DEFAULT: "#f472b6",
        50: "#fdf2f8",
        100: "#fce7f3",
        200: "#fbcfe8",
        300: "#f9a8d4",
        400: "#f472b6",
        500: "#ec4899",
        600: "#db2777",
        700: "#be185d",
        800: "#9d174d",
        900: "#831843",
      },
      success: "#22c55e",
      warning: "#facc15",
      error: "#ef4444",
      info: "#38bdf8",
      dark: "#18181b",
      ...colors,
    },
    extend: {
      backgroundImage: {
        "gradient-x":
          "linear-gradient(to right, #2563eb, #1d4ed8, #1e40af, #1e3a8a, #172554)",
      },
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui"],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular"],
      },
      animation: {
        "gradient-x": "gradient-x 18s ease-in-out infinite",
        "gradient-y": "gradient-y 24s ease-in-out infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "gradient-y": {
          "0%, 100%": { backgroundPosition: "50% 0%" },
          "50%": { backgroundPosition: "50% 100%" },
        },
      },
      backgroundSize: {
        "200": "200% 200%",
      },
    },
  },
  plugins: [],
};

export default config;
