/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }
      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }
      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }
      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    colors: {
      yellow: "#fff03b",
      "gray-light": "#d8d8d8",
      black: "#000",
      "gray-dark": "#273444",
      gray: "#8492a6",
      red: "#FA8E73",
      green: "#92DB5E",
      white: "#FFFFFF",
    },
    fontSize: {
      "5xl": "48px",
      "3xl": "36px",
      "2xl": "24px",
      xl: "16px",
      l: "14px",
      m: "12px",
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    fontWeight: {
      "2xl": "600",
      "5xl": "800",
    },
  },
  plugins: [],
};
