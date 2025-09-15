/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6', 
          900: '#1e3a8a'
        }
      },
      fontFamily: {
        'en': ['Inter', 'system-ui', 'sans-serif'],
        'zh': ['PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'sans-serif'],
        'ja': ['Hiragino Kaku Gothic ProN', 'Noto Sans JP', 'sans-serif'],
        'ko': ['Apple SD Gothic Neo', 'Noto Sans KR', 'sans-serif']
      }
    },
  },
  plugins: [],
}