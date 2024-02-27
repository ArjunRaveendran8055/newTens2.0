/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: '360px',
      md: '768px',
      lg: '976px',
      xl: '1280px',
    },
    colors: {
      "darkblue":"#001861",
      "black":"#000000",
      "white":"#ffffff",
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'darkpink':"#FF1493",
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'navyblue':"#000080",
      "fluegreen":"#00FF15",
      "specialgray":"#B4D9EF",
      "cyan500":"#00BCD4",
      "darkpurple":"#301934",
      "violet":"#5800e3",
      "crimson":"#DC143C",
      "red":"#FF0000",
      "whitesmoke":"#F5F5F5"

    },
    extend: {},
  },
  plugins: [],
});
