/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        border: "rgba(var(--border))",
        primary: "rgba(var(--primary))",
        btnone: "rgba(var(--btnone))",
        btntwo: "rgba(var(--btntwo))",
        secondary: "rgba(var(--secondary))",
      },
    },
  },
  plugins: [],
  darkMode: "media",
};
