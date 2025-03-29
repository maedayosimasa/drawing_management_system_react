// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//    base: './', // ここで base パスを設定
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // 'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
     'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  },
  server: {
    // サーバー設定など
  },
  build: {
    // その他の設定
  },
  optimizeDeps: {
    // ディペンデンシー設定
  },
});



