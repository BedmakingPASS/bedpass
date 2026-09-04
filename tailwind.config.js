/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cba: {
          dark: '#1F3A2E',    // sidebar / primary dark green
          DEFAULT: '#2E5B44', // primary green (buttons)
          light: '#E8EFE8',   // light backgrounds
          cream: '#F6F3EC',   // page background
          gold: '#C9A24B',    // status "Baik/Kompeten" accent
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
}
