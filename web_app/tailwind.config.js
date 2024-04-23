/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {      
        fontFamily: {
          palanquin: ['Palanquin', 'sans-serif'],
          montserrat: ['Montserrat', 'sans-serif'],
        },
        colors: {
          'primary': "#38e54d",
          "coral-ali": "#e74c3c",
          "slate-gray": "#6D6D6D",
          "pale-blue": "#F5F6FF",
          "white-400": "rgba(255, 255, 255, 0.80)"
        },
    },
  },
  plugins: [],
}