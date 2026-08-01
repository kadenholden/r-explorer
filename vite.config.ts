import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site — served from https://<user>.github.io/r-explorer/
export default defineConfig({
  base: '/r-explorer/',
  plugins: [react()],
})
