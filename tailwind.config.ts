import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      // === Palette premium claire ===
      colors: {
        // Indigo premium (primary)
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        // Surface claire
        surface: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
        },
        // Ink (typographie)
        ink: {
          900: "#0f172a",
          700: "#334155",
          500: "#64748b",
          300: "#cbd5e1",
        },
        // Accents
        violet: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d9a",
        },
        // Neutres clairs
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": "0.625rem",
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
        "7xl": "4.5rem",
        "8xl": "6rem",
        "9xl": "8rem",
      },
      lineHeight: {
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        wide: "1.75",
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "9999px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(15 23 42 / 0.08), 0 1px 2px -1px rgb(15 23 42 / 0.04)",
        lift: "0 10px 30px -10px rgb(79 70 229 / 0.25)",
        premium: "0 4px 6px -1px rgb(15 23 42 / 0.10), 0 2px 4px -2px rgb(15 23 42 / 0.06)",
        "card-hover": "0 10px 25px -5px rgb(15 23 42 / 0.08), 0 4px 6px -2px rgb(15 23 42 / 0.04)",
      },
      // Animations
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease-out both",
        fade: "fade 0.3s ease-out both",
        float: "float 3s ease-in-out infinite",
      },
      // Gradients
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
        "gradient-secondary": "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
        "gradient-subtle": "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.025em",
        wider: "0.05em",
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        ".container-page": {
          "@apply mx-auto max-w-7xl px-4 lg:px-8": {},
        },
        ".btn": {
          "@apply inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50": {},
        },
        ".btn-primary": {
          "@apply btn bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200/50": {},
        },
        ".btn-secondary": {
          "@apply btn border border-indigo-200 text-indigo-700 hover:bg-indigo-50": {},
        },
        ".btn-ghost": {
          "@apply btn text-indigo-700 hover:bg-indigo-50": {},
        },
        ".btn-danger": {
          "@apply btn bg-red-600 text-white hover:bg-red-700": {},
        },
        ".input": {
          "@apply flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-neutral-400 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500": {},
        },
        ".label": {
          "@apply text-sm font-medium text-neutral-700": {},
        },
        ".card": {
          "@apply rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm": {},
        },
        ".badge": {
          "@apply inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold": {},
        },
      });
    }),
    require("tailwindcss-animate"),
  ],
};

export default config;
