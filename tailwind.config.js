/** @type {import('tailwindcss').Config} */
<<<<<<< HEAD
module.exports = {
=======
export default {
>>>>>>> 4e3a27c400f15b453e8f827c4f84a02e3a76f6e3
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        bounce: 'bounce 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
<<<<<<< HEAD
      backgroundColor: {
        'dark': '#1a1a1a',
      },
      aspectRatio: {
        'video': '16 / 9'
      }
=======
>>>>>>> 4e3a27c400f15b453e8f827c4f84a02e3a76f6e3
    },
  },
  plugins: [],
};