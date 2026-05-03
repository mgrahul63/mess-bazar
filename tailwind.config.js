/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          primary:  "#2dd4bf",
          dim:      "#1a9e8e",
          bg:       "#0f2e2c",
          border:   "#1e5050",
        },
        dark: {
          bg:       "#0d1f1f",
          surface:  "#112828",
          alt:      "#0f2323",
          raised:   "#163232",
          header:   "#091a1a",
          border:   "#1e3d3d",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
