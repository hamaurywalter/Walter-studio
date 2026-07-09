import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    // ── Chunk splitting — évite un bundle monolithique ──────────────────────
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-dom') || id.includes('react/') || id.includes('react-is')) return 'vendor'
          if (id.includes('react-router')) return 'router'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('@emailjs')) return 'emailjs'
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
