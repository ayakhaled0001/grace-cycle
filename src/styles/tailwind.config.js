/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        btnsGreen: '#225a4b',
        bgBeigeWhite: '#fffcf6',
        orange: '#d57b21',
        lightGrey: '#808080',
      },
      fontFamily: {
        nunitoExtralight: ['Nunito-extralight', 'sans-serif'],
        nunitoBold: ['Nunito-bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
}