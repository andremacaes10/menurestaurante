/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fdf8ee',
          100: '#f9edcf',
          200: '#f2d898',
          300: '#e6bb5c',
          400: '#d9a03a',
          500: '#c48526',
          600: '#a86c20',
          700: '#8a541e',
          800: '#71411c',
          900: '#5d351a',
          950: '#351a0a',
        },
        dark:  '#0c0a07',
        ink:   '#1c1810',
        cream: '#faf6ee',
        sand:  '#f0ebe0',
        stone: '#7a6e62',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        title:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
