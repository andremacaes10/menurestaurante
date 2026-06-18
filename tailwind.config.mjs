/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#355E3B',
          light: '#4A7A52',
          dark: '#223D27',
        },
        gold: {
          DEFAULT: '#B86030',
          light: '#D08050',
          dark: '#8C3E18',
        },
        cream: {
          DEFAULT: '#FAF8F5',
          dark: '#EDE9E0',
          medium: '#E5DFD3',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garant"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
    },
  },
  plugins: [],
};
