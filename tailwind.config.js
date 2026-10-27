/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deliverable 3 — Exact Design System Color Tokens
        "bg-base": "var(--color-bg-base)",
        "bg-surface": "var(--color-bg-surface)",
        "bg-elevated": "var(--color-bg-elevated)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "accent-brand": "var(--color-accent-brand)",
        "accent-glow": "var(--color-accent-glow)",
        "accent-muted": "var(--color-accent-muted)",
        "border-subtle": "var(--color-border-subtle)",

        // Direct intuitive aliases

        surface: "var(--color-bg-surface)",
        elevated: "var(--color-bg-elevated)",
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        brand: {
          DEFAULT: "var(--color-accent-brand)",
          glow: "var(--color-accent-glow)",
          muted: "var(--color-accent-muted)",
        },

        // Backward compatibility mappings for legacy UI components to prevent styling crashes
        "stroke-1": "#1F1F2E",
        "custom-purple": "#5C45FD",
        n: {
          1: "#F2F2F5",
          2: "#CAC6DD",
          3: "#ADA8C3",
          4: "#757185",
          5: "#3F3A52",
          6: "#252134",
          7: "#14141A",
          8: "#030305",
          9: "#474060",
          10: "#43435C",
          11: "#1F1F2E",
          12: "#2E2A41",
          13: "#8A8A99",
        },
      },
      fontFamily: {
        // Deliverable 3 & 10 Typography
        sans: ["Inter", ...fontFamily.sans],
        body: ["Inter", ...fontFamily.sans],
        display: ['"Space Grotesk"', ...fontFamily.sans],
        grotesk: ['"Space Grotesk"', ...fontFamily.sans],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
        code: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
        sm: "0px",
        md: "0px",
        lg: "2px",
        xl: "2px",
        "2xl": "2px",
        full: "9999px",
        pill: "9999px",
      },
      boxShadow: {
        "brand-glow": "0 0 20px rgba(255, 107, 0, 0.15)",
        "brand-glow-lg": "0 0 30px rgba(255, 140, 0, 0.25)",
        "accent-glow": "0 0 20px rgba(255, 140, 0, 0.20)",
        "muted-glow": "0 0 20px rgba(92, 69, 253, 0.20)",
        "cyber-dock": "0 10px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 107, 0, 0.08)",
      },
      keyframes: {
        "spin-laser": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "glare-sweep": {
          "0%": { transform: "translateX(-150%) skewX(-15deg)" },
          "100%": { transform: "translateX(250%) skewX(-15deg)" },
        },
      },
      animation: {
        "spin-laser": "spin-laser 3.2s linear infinite",
        "glare-sweep": "glare-sweep 2.2s ease-in-out infinite",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tight: "-0.02em",
        section: "0.1em",
        tagline: ".15em",
      },
      spacing: {
        0.25: "0.0625rem",
        7.5: "1.875rem",
        15: "3.75rem",
      },
      borderWidth: {
        DEFAULT: "1px",
        subtle: "1px",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "linear",
      },
    },
  },
  plugins: [
    scrollbarHide,
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({});
      addComponents({
        // Deliverable 10 Primary Button
        ".btn-primary": {
          padding: "12px 24px",
          border: "1px solid var(--color-accent-brand)",
          backgroundColor: "transparent",
          color: "var(--color-text-primary)",
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: "600",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          cursor: "pointer",
          borderRadius: "0px",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "var(--color-accent-brand)",
            color: "#000000",
            boxShadow: "0 0 20px rgba(255, 107, 0, 0.25)",
          },
          "&:active": {
            transform: "scale(0.96)",
          },
        },
        // Deliverable 10 Section Header
        ".section-header-box": {
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          "& .section-square": {
            width: "24px",
            height: "24px",
            backgroundColor: "var(--color-accent-brand)",
            flexShrink: "0",
          },
          "& .section-title": {
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-text-primary)",
          },
        },
        ".container": {
          "@apply max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem]":
            {},
        },
      });
      addUtilities({
        ".tap-highlight-color": {
          "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
        },
      });
    }),
  ],
};
