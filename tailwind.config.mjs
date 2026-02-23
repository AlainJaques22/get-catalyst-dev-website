/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#1e1e1e',
        surface: '#262626',
        'surface-hover': '#363636',
        border: '#363636',
        'text-primary': '#e3e0d8',
        'text-secondary': '#8a8a8a',
        'text-muted': '#888888',
        'text-dim': '#4a4a4a',
        primary: '#22d3ee',
        'primary-dark': '#06b6d4',
        'primary-light': '#67e8f9',
        success: '#50fa7b',
        warning: '#facc15',
        error: '#ff5555',
      },
      fontFamily: {
        geist: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'geist-mono': ['Geist Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
