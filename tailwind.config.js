/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  prefix: "tw-",
  theme: {
    extend: {
      colors: {
        btnPrimary: "#70B541",
        btnPrimaryHover: "#5e9937",
      },
    },
  },
  plugins: [],
};
