/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // appフォルダの中を見る
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // componentsフォルダの中を見る
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
