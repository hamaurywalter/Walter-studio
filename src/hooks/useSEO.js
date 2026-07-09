import { useEffect } from 'react'

// ─── Valeurs par défaut (page d'accueil) ─────────────────────────────────────
const DEFAULTS = {
  title: 'Création de site web à Rennes – WALTER Studio',
  description:
    'Création de sites internet sur-mesure pour artisans et professionnels locaux à Rennes. Livré en 2 semaines, à partir de 299€.',
  canonical: 'https://walter-studio.fr',
  ogImage: 'https://walter-studio.fr/og-image.png',
}

/**
 * useSEO — met à jour dynamiquement les balises meta au changement de route.
 *
 * @param {Object} options
 * @param {string} [options.title]       - Titre de la page (max ~60 caractères)
 * @param {string} [options.description] - Meta description (max ~155 caractères)
 * @param {string} [options.canonical]   - URL canonique complète de la page
 * @param {string} [options.ogImage]     - URL absolue de l'image Open Graph
 *
 * @example
 * // Dans SimulateurPage.jsx
 * useSEO({
 *   title: 'Simulateur de site web – WALTER Studio',
 *   description: 'Visualisez votre futur site avant de commander. Choisissez votre secteur et personnalisez.',
 *   canonical: 'https://walter-studio.fr/simulateur',
 * })
 */
export function useSEO({ title, description, canonical, ogImage } = {}) {
  useEffect(() => {
    const t = title || DEFAULTS.title
    const d = description || DEFAULTS.description
    const c = canonical || DEFAULTS.canonical
    const img = ogImage || DEFAULTS.ogImage

    // ── Title ──────────────────────────────────────────────────────────────
    document.title = t

    // ── Meta description ───────────────────────────────────────────────────
    setMeta('name', 'description', d)

    // ── Canonical ──────────────────────────────────────────────────────────
    setLink('canonical', c)

    // ── Open Graph ─────────────────────────────────────────────────────────
    setMeta('property', 'og:title', t)
    setMeta('property', 'og:description', d)
    setMeta('property', 'og:url', c)
    setMeta('property', 'og:image', img)

    // ── Twitter Card ───────────────────────────────────────────────────────
    setMeta('name', 'twitter:title', t)
    setMeta('name', 'twitter:description', d)
    setMeta('name', 'twitter:image', img)

    // ── Reset au démontage ─────────────────────────────────────────────────
    return () => {
      document.title = DEFAULTS.title
    }
  }, [title, description, canonical, ogImage])
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}
