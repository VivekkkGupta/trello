/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        scrollbar: {
          hidden: "scrollbar-hide",
          visible: "scrollbar-show",
        },
      },
    },
  },
  plugins: [],
};
