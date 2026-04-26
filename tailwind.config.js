export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        boxing: {
          dark: '#0a0a0a',
          ring: '#1a1a1a',
          panel: '#252525',
          neon: '#00ff88',
          neonDim: '#00cc6a',
          accent: '#ff3366',
          accentDim: '#cc2952',
        }
      }
    },
  },
  plugins: [],
}