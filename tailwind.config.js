/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'], 
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#ffffff',
          text: '#000000',
          primary: '#1d4ed8',
          secondary: '#64748b',
          border: '#e5e7eb',
        },
        dark: {
          bg: '#18181b',
          text: '#f9fafb',
          primary: '#3b82f6',
          secondary: '#94a3b8',
          border: '#334155',
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    require('daisyui'), 
  ],
};
