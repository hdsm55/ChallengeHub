/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Cairo', 'sans-serif'], // مثال لإضافة خط عربي أنيق
      },
      colors: {
        primary: '#7C3AED',   // بنفسجي أساسي
        secondary: '#0EA5E9', // أزرق سماوي
      },
    },
  },
  plugins: [
    import('@tailwindcss/line-clamp'),
  ],
}
