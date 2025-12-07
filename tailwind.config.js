/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "Inter", "sans-serif"],
      },
      keyframes: {
        "slow-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: 0.7 },
          "50%": { opacity: 1 },
        },
        "rain-fall": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "snow-fall": {
          "0%": { transform: "translateY(-100%) translateX(0)" },
          "100%": { transform: "translateY(100vh) translateX(40px)" },
        },
        "fog-move": {
          "0%": { transform: "translateX(-10%)" },
          "100%": { transform: "translateX(10%)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 0px rgba(255,255,255,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(255,255,255,0.6)" },
        },
      },
      animation: {
        "slow-spin": "slow-spin 40s linear infinite",
        float: "float 4s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "rain-fall": "rain-fall 1.8s linear infinite",
        "snow-fall": "snow-fall 4s linear infinite",
        "fog-move": "fog-move 10s ease-in-out infinite alternate",
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
