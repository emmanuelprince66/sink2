/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      // You can add more font families here
    },
    colors: {
      text_white: "#fff",
      general: "#171717",
      primary_grey: "#919191",
      primary_grey_2: "#5E5E5E",
      primary_red: "#E52929",
      primary_green: "#02981D",
    },
  },
  plugins: [],
};
