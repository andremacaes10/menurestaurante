/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fdf8f0',
          100: '#faefd9',
          200: '#f4d9a8',
          300: '#ecbc6c',
          400: '#e39d38',
          500: '#d4821e',
          600: '#b96615',
          700: '#994d14',
          800: '#7d3e17',
          900: '#683416',
          950: '#3c1a08',
        },
        dark: '#1a1008',
        cream: '#fdf8f0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
