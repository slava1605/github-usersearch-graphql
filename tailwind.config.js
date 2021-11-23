module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      '0': '0',
      '10': '10px',
      '300': '300px',
    },
    maxHeight: {
      '0': '0',
      '500': '500px',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
