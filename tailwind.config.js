const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        splashRotate: {
          "0%": { transform: "rotate(0deg) scale(1)", filter: "blur(0px)" },
          "25%": {
            transform: "scale(1.5)",
            filter: "blur(5px) sepia(1)",
          },
          "35%": {
            transform: "scale(1.5)",
            filter: "blur(5px) sepia (1)",
          },
          "55%": {
            transform: "scale(1.5) rotate(3deg)",
            filter: "blur(5px) sepia(1)",
          },
          "80%": {
            transform: "rotate(0deg) scale(1)",
          },
          "100%": { transform: "rotate(0deg) scale(1)", filter: "blur(0px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "splash-rotate": "splashRotate 20s ease-in-out infinite",
      },
      typography: {
        quoteless: {
          css: {
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        /* Hide scrollbar for Chrome, Safari and Opera */
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },

        /* Hide scrollbar for IE, Edge and Firefox */
        ".no-scrollbar": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      });
    }),
  ],
};
