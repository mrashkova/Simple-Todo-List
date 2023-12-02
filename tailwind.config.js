/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
      "2xl": "24px",
      xl: "16px",
      l: "14px",
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
