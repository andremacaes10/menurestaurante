/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0D2137',
          light: '#1A3A5C',
          dark: '#071523',
        },
        gold: {
          DEFAULT: '#C9A96E',
          light: '#DFC49A',
          dark: '#A68A4A',
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
