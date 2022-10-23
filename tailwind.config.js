const plugin = require("tailwindcss/plugin")

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'),
            plugin(function({ addUtilities }) {
              addUtilities({
                /* Hide scrollbar for Chrome, Safari and Opera */
                '.no-scrollbar::-webkit-scrollbar': {
                  'display': 'none'
                },

                /* Hide scrollbar for IE, Edge and Firefox */
                '.no-scrollbar': {
                  '-ms-overflow-style': 'none',  /* IE and Edge */
                  'scrollbar-width': 'none'  /* Firefox */
                },
              })
            })],
}
