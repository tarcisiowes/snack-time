/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Inter_600SemiBold', 'sans-serif'],
        subTitle: ['Inter_500Medium', 'sans-serif'],
        body: ['Inter_400Regular', 'sans-serif'],
        bold: ['Inter_700Bold', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

