/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./theme/**/*.{js,jsx,ts,tsx,md,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e8f8e8",
          100: "#d1f1d1",
          200: "#a3e3a3",
          300: "#75d575",
          400: "#47c847",
          500: "#81c869",
          600: "#2b7a2b",
          700: "#235c23",
          800: "#1a3d1a",
          900: "#121f12",
        },
        // Sprunki Pink Palette
        "sprunki-pink": {
          50: "#fdf4fa",
          100: "#fce8f5",
          200: "#f9d0ea",
          300: "#f5a8d8",
          400: "#ee77bf",
          500: "#e552aa",
          600: "#d2308a",
          700: "#ae246f",
          800: "#8f205c",
          900: "#771e4d",
        },
        // Sprunki Mint Palette
        "sprunki-mint": {
          50: "#f0fbf8",
          100: "#d6f5ec",
          200: "#b0ead9",
          300: "#81d9c1",
          400: "#4dbfa3",
          500: "#34a288",
          600: "#2a876f",
          700: "#266b5a",
          800: "#235649",
          900: "#1f483e",
        },
        // Sprunki Blue Palette
        "sprunki-blue": {
          50: "#eef6ff",
          100: "#dbeafe",
          200: "#bdd6fe",
          300: "#93b8fd",
          400: "#6590fc",
          500: "#4467fb",
          600: "#2f44f0",
          700: "#2735db",
          800: "#242db1",
          900: "#242d8a",
        },
        // Sprunki Purple Palette
        "sprunki-purple": {
          50: "#f7f3ff",
          100: "#ede5ff",
          200: "#decdfe",
          300: "#c8a6fb",
          400: "#af7af6",
          500: "#965dee",
          600: "#7e3fe0",
          700: "#6c33c4",
          800: "#592c9d",
          900: "#492a7c",
        },
        theme: {
          bg: {
            primary: "var(--bg-primary)",
            secondary: "var(--bg-secondary)",
          },
          text: {
            primary: "var(--text-primary)",
            secondary: "var(--text-secondary)",
          },
          border: "var(--border-color)",
        },
        dark: {
          DEFAULT: "#1a1a1a",
          secondary: "#242424",
          tertiary: "#2a2a2a",
        },
        success: {
          light: "#e6f4ea",
          DEFAULT: "#34a853",
          dark: "#1e8e3e",
        },
        warning: {
          light: "#fef7e0",
          DEFAULT: "#fbbc04",
          dark: "#f9ab00",
        },
        error: {
          light: "#fce8e6",
          DEFAULT: "#ea4335",
          dark: "#d93025",
        },
        info: {
          light: "#e8f0fe",
          DEFAULT: "#4285f4",
          dark: "#1967d2",
        },
        background: {
          light: "#ffffff",
          dark: "#111111",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
