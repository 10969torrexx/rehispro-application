/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
       colors: {
        primary: '#6B1B9A',   // Purple
        secondary: '#d582ff', // Light Purple
      },
    },
  },
  plugins: [],
}

