/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        offWhite: "#FFFCF6",
        gray: "#5B5B5BCC",
        btnsGreen: #225a4b ,
        bgBeigeWhite: #fffcf6,
            whiteIntoGreen: #dee9e4,
        orange: #d57b21;
        veryLightPink: #f6dbd5,
        lightGrey: #808080,
        lightBrownYellow: #816404,
        black: #000000;
        lightbasicgreen: #47685e;
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
