/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './*.{js,ts,jsx,tsx,mdx,html}'],
  theme: {
    extend: {
      colors: {
        'gh-bg': '#0d1117',
        'gh-bg-secondary': '#161b22',
        'gh-bg-tertiary': '#21262d',
        'gh-border': '#30363d',
        'gh-border-muted': '#21262d',
        'gh-text': '#f0f6fc',
        'gh-text-secondary': '#7d8590',
        'gh-text-muted': '#656d76',
        'gh-accent': '#58a6ff',
        'gh-accent-emphasis': '#1f6feb',
        'gh-success': '#3fb950',
        'gh-attention': '#d29922',
        'gh-severe': '#db6d28',
        'gh-danger': '#f85149',
      },
    },
  },
  plugins: [],
}
