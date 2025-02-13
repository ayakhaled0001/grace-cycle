/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        offWhite: "#FFFCF6",
        gray: "#5B5B5BCC",
        btnsGreen:
      },

      fontFamily: {
        nunitoExtralight: ["Nunito-extralight", "sans-serif"],
        nunitoBold: ["Nunito-bold", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        sans: ["Nunito", "sans-serif"],
        otoma: ["OtomanopeeOne"],
      },
    },
  },
  plugins: [],
};
