// frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Next.js 프로젝트의 모든 .js, .ts, .jsx, .tsx 파일 스캔
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
