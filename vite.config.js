import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    // ── Chunk splitting — évite un bundle monolithique ──────────────────────
    rollupOptions: {
      output: {
        manualChunks: {
          vendor:  ['react', 'react-dom'],
          router:  ['react-router-dom'],
          motion:  ['framer-motion'],
          emailjs: ['@emailjs/browser'],
        },
      },
    },

    // ── Seuil d'inline des assets (images < 4kb intégrées en base64) ───────
    assetsInlineLimit: 4096,

    // ── Taille cible par chunk (avertissement Vite si dépassé) ──────────────
    chunkSizeWarningLimit: 600,

    // ── Minification CSS + JS activée par défaut en prod ───────────────────
    // (esbuild est utilisé automatiquement par Vite — rien à ajouter)

    // ── Source maps désactivés en prod (sécurité + poids) ──────────────────
    sourcemap: false,
  },
})
