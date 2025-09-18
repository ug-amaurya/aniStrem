/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // important

  theme: {
    extend: {
      colors: {
        primary: "#FFD3AC",
        secondary: "#FFB5AB",
        tertiary: "#E39A7B",
        accent: "#DBB06B",
      },
    },
  },
  plugins: [],
};
