// frontend/postcss.config.js

module.exports = {
  plugins: {
    // 🚨 문제 발생 지점: 'tailwindcss'를 직접 플러그인으로 사용
    // 'tailwindcss': {},
    // ✅ 수정: 분리된 PostCSS 플러그인 패키지 사용
    '@tailwindcss/postcss': {}, 

    'autoprefixer': {},
  },
};
