/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        earth: '#5C4033',
        sage: '#8A9A5B',
        sand: '#E8DCC8',
        cream: '#FAF6F0',
        clay: '#C4956A',
        charcoal: '#2C2C2C',
        gold: '#B8860B',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        accent: ['"Dancing Script"', 'cursive'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
