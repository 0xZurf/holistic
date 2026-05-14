/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0a0a0a',
        'dark-bg': '#0f0e0c',
        'card-dark': '#1a1814',
        'card-border': '#2a2520',
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e8d48b',
          dim: '#8b7a3a',
          border: 'rgba(201,168,76,0.25)',
        },
        cream: '#f5efe0',
        sand: '#bfb49a',
        'warm-gray': '#7a7265',
        white: '#faf8f4',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Garamond', 'serif'],
        accent: ['"Cormorant SC"', 'serif'],
        body: ['"DM Sans"', '"Helvetica Neue"', 'sans-serif'],
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '4px',
        md: '4px',
        lg: '4px',
        xl: '4px',
        '2xl': '4px',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
