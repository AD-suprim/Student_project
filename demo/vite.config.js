// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
// import react from '@vitejs/plugin-react'
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
// })

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    
    react(),
 tailwindcss()

  ],
    
  server: {
    proxy: {
      '/api/students': {
        target: 'http://localhost:9091',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
