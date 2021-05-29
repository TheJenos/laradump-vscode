const colors = require('tailwindcss/colors');

module.exports = {
  // purge: [
  //   './src/**/*.html',
  //   './src/**/*.js',
  // ],
  purge: false,
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      blue: colors.blue,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      green: colors.green,
      red: colors.rose,
      yellow: colors.amber,
      ccblue: {
        DEFAULT: '#1A2238',
      },
      cclavendel: {
        DEFAULT: '#9DAAF2',
      },
      ccorange: {
        DEFAULT: '#FF6A3D',
      },
      ccyellow: {
        DEFAULT: '#F4DB7D',
      },
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
