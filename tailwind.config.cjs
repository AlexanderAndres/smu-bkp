/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      animation: {
        fastPulse: 'fastPulse .8s ease-in-out infinite',
      },
      keyframes: {
        fastPulse: {
          '0%, 100': { opacity: 1 },
          '50%': { opacity: .6 },
        }
      }
    },
  },
  plugins: [
  ],
}