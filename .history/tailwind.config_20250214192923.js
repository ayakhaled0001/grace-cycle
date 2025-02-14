/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        offWhite: "#FFFCF6",
        darkgray: "#5b5e5b",
        gray: "#5B5B5BCC",
        btnsGreen: "#225a4b",
        bgBeigeWhite: "#fffcf6",
        whiteIntoGreen: "#dee9e4",
        orange: "#d57b21",
        veryLightPink: "#f6dbd5",
        lightGrey: "#808080",
        lightBrownYellow: "#816404",
        black: "#000000",
        lightBasicGreen: "#47685e",
        lightBiege: "#cccac54a",
        darkBiege: " #EEEADF",
        darkGreen: "#5C8277",
        paleWhite: "#D9D9D9",
        paleWhiteGrey: "#EFF0E9",
        darkYellow: "#BC870B",
        paleBarkYellow: "#A7A49C",
        palwLightBrownYellow: "#7C724B",
      },

      fontFamily: {
        nunitoExtralight: ["Nunito-extralight", "sans-serif"],
        nunitoBold: ["Nunito-bold", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        sans: ["Nunito", "sans-serif"],
        otoma: ["OtomanopeeOne"],
      },

      filter: {
        gray: "grayscale(100%)",
        none: "grayscale(0)",
      },
      fill: {
        darkGreen: "#5C8277",
        paleWhite: "#D9D9D9",
      },
    },
  },
  plugins: [],
};
