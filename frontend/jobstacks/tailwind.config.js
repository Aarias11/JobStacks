/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: '#2B6FE5',
        background: '#171717',
        surface: '#262626',
        text: {
          primary: '#F3F3F3',
          secondary: '#B2B2B2',
        },
      },
    },
  },
  plugins: [],
}