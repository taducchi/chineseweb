/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#137fec",
        "primary-dark": "#0b5ed7",
        "background-light": "#f6f7f8",
        "background-dark": "#101922",
        "text-main": "#0d141b",
        "text-sub": "#4c739a",
      },
      fontFamily: {
        "display": ["Lexend", "Noto Sans", "sans-serif"],
        "body": ["Noto Sans", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "full": "9999px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      backgroundImage: {
        'chinese-pattern': 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
        'modal-gradient': 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)'
      },
      backgroundSize: {
        'pattern': '24px 24px'
      },
    },
  },
  plugins: [],
}