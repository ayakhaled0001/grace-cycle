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
        darkOrange: "#ba6612",
        veryLightPink: "#f6dbd5",
        lightGrey: "#808080",
        verylightGrey: "#F5F5EE",
        lightBrownYellow: "#816404",
        black: "#000000",
        lightBasicGreen: "#47685e",
        lightBiege: "#cccac54a",
        darkBiege: "#EEEADF",
        darkGreen: "#5C8277",
        paleWhite: "#D9D9D9",
        paleWhiteGrey: "#EFF0E9",
        darkYellow: "#BC870B",
        paleBarkYellow: "#A7A49C",
        palewLightBrownYellow: "#7C724B",
        semiDarkBeige: "#F4F1EA",
        semiBrightYellow: "#F8BD00",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0px 0px 3px  1px  rgba(0, 0, 0, 0.20), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        none: "none",
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
