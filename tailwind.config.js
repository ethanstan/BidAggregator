module.exports = {
  purge: ["./src/**/*.svelte"],
  theme: {
    extend: {
      colors: {
        unit: {
          100: '#f2dccb',
          300: '#f2c5a2',
          600: '#e8995c',
          900: '#e88131',
        },
        unitdark: {
          300: '#a7a9b5',
          700: '#23242a',
          900: '#1c1d22',
        }
      },
      fontFamily: {
        'hobo': ['"Hobo Std"'],
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui')
  ],
}
