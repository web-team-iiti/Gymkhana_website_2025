module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        float: {
          "0%,100%": { transform: "translate(0,0)" },
          "25%": { transform: "translate(10px,-20px)" },
          "50%": { transform: "translate(-10px,-10px)" },
          "75%": { transform: "translate(5px,-15px)" },
        },
      },
      animation: {
        blob: "blob 12s infinite",
        float: "float linear infinite",
      },
    },
  },
  plugins: [],
};
