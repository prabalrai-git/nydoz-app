/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  prefix: "tw-",
  theme: {
    extend: {
      colors: {
        btnPrimary: "#70B541",
        btnPrimaryHover: "#5e9937",
        appViolet: "#8b5cf6",
        appBlue: "#1778ff",
        appBlueHover: "#1266db",
        appRed: "#fc0f03",
        appBrown: "#977254",
        appBrownHover: "#673E0F",
      },
    },
  },
  plugins: [],
};
