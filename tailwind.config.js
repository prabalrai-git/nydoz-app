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
        appRedHover: "#db0f04",
        appBrown: "#977254",
        appBrownHover: "#673E0F",
        appSideBar: "#1d273b",
        appLightGreen: "#ebf7ee",
        appLightRed: "#FBEDED",
      },
      screens: {
        xsm: "10px",
        mmd: "990px",
      },
    },
  },
  plugins: [],
};
