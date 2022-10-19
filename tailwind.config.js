/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    { pattern: /bg-\w+-[1-9]00/, },
    { pattern: /text-\w+-[1-9]00/, },
  ],
}
