/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"], // include all components
  theme: {
    extend: {
      colors: {
        studioBg: "#1e1e2f",
        studioPanel: "#252536",
        studioBorder: "#3a3a4a",
        studioHighlight: "#2a2a3a",
        studioHover: "#33334a",
      },
    },
  },
  plugins: [],
};
