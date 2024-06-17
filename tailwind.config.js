const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#9BCDB0",
          light: "#C0E0CD",
          dark: "#99CC99",
        },
        green: "#8CC63F",
        gray: {
          dark: "#534741",
        },
        yellow: {
          DEFAULT: "#FFFF00",
          light: "#FEF6C5",
          dark: "#FF931E",
        },
        brown: "#603813",
      },
      scale: {
        50: "60%",
        80: "80%",
        100: "100%",
        110: "110%",
        120: "120%",
        130: "130%",
        140: "140%",
        160: "160%",
        230: "230%",
        240: "240%",
        280: "280%",
        290: "290%",
        320: "360%",
        330: "370%",
        101: "1.01",
        101.5: "1.015",
        102: "1.02",
        102.5: "1.025",
        103: "1.03",
      },
      dropShadow: {
        "3xl": "5px 2px 6px rgba(0, 0, 0, 0.7)",
        "4xl": "2px 2px 8px rgba(0, 0, 0, 1)",
        "5xl": "2px 2px 2px rgba(0, 0, 0, 1)",
        "6xl": [
          "20px 35px 35px rgba(0, 0, 0, 0.65)",
          "20px 45px 65px rgba(0, 0, 0, 0.45)",
        ],
      },
      skew: {
        40: "40deg",
      },
      width: {
        180: "58rem",
        160: "50rem",
        140: "44rem",
      },
      screens: {
        '3xl': '1550px', 
        '2xxl': '1150px',
        'xs':'500px',
      },
    },
  },

  plugins: [],
};
