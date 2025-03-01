import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   base: './', // ここで base パスを設定
  plugins: [react()],
})


