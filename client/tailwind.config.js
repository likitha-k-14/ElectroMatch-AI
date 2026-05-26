export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        glow: "0 0 80px rgba(20,184,166,.28)",
        glass: "0 24px 80px rgba(0,0,0,.32)"
      }
    }
  },
  plugins: []
};
