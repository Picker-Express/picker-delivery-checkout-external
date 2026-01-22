/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        picker: {
          primary: '#00B2E3',
          'primary-hover': '#0099CC',
          'primary-light': '#E0F2FE',
        }
      }
    },
  },
  plugins: [],
}
