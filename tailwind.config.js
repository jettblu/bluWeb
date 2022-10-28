const plugin = require("tailwindcss/plugin")

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {typography: {
      quoteless: {
        css: {
          'blockquote p:first-of-type::before': { content: 'none' },
          'blockquote p:first-of-type::after': { content: 'none' },
        },
      },
    },},
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
