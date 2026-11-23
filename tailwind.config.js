/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-surface": "#111c2d",
        "surface": "#f9f9ff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f0f3ff",
        "surface-container": "#e7eeff",
        "surface-container-high": "#dee8ff",
        "surface-container-highest": "#d8e3fb",
        "primary": "#005f49",
        "primary-container": "#0d7a5f",
        "on-primary": "#ffffff",
        "on-primary-container": "#a8ffdf",
        "secondary": "#32647e",
        "secondary-container": "#b0e0ff",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#32647f",
        "tertiary": "#005886",
        "amber-accent": "#f4a300",
        "outline": "#6e7a74",
        "outline-variant": "#bdc9c2",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
