/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#4B0E86",
          purpleDark: "#3a0b6e",
          purpleMid: "#6d28d9",
          purpleLight: "#8B07F4",
          yellow: "#FBD63E",
          surface: "#F8F9FA"
        }
      }
    }
  },
  safelist: ["hidden", "block", "inline-block", "flex", "inline-flex", "fixed", "sticky", "relative", "absolute"],
  plugins: []
};
