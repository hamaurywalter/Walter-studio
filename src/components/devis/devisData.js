/* ── Données du configurateur de devis ─────────────────────── */

export const SECTEURS = [
  { id: 'artisan',    label: 'Artisan / BTP',        icon: '🔨' },
  { id: 'beaute',     label: 'Beauté / Bien-être',   icon: '💆' },
  { id: 'restaurant', label: 'Restaurant',           icon: '🍽️' },
  { id: 'commerce',   label: 'Commerce local',       icon: '🛍️' },
  { id: 'liberale',   label: 'Profession libérale',  icon: '💼' },
  { id: 'autre',      label: 'Autre',                icon: '✨' },
]

export const PAGES = [
  { id: 'hero',         label: 'Hero / Accueil' },
  { id: 'apropos',      label: "À propos / L'équipe" },
  { id: 'services',     label: 'Services / Prestations' },
  { id: 'galerie',      label: 'Galerie / Réalisations' },
  { id: 'tarifs',       label: 'Tarifs' },
  { id: 'temoignages',  label: 'Témoignages clients' },
  { id: 'faq',          label: 'FAQ' },
  { id: 'contact',      label: 'Contact' },
  { id: 'localisation', label: "Localisation / Plan d'accès" },
  { id: 'blog',         label: 'Blog / Actualités' },
  { id: 'equipe',       label: 'Équipe détaillée' },
  { id: 'partenaires',  label: 'Partenaires / Références' },
]

export const OPTIONS = [
  { id: 'photos',     label: 'Demande de séance photo' },
  { id: 'formulaire', label: 'Formulaire de contact' },
  { id: 'maps',       label: 'Intégration Google Maps' },
  { id: 'autre',      label: 'Autre demande particulière' },
]

export const MAINTENANCES = [
  {
    id: 'essentiel', label: 'Essentielle', prix: 19,
    desc: "3 modifications de texte · 3 modifications d'image",
  },
  {
    id: 'serenite', label: 'Sérénité', prix: 35,
    desc: '15 modifications textes/images · Réponse prioritaire · 1 modification de design',
  },
]

export function getFormule(nbPages) {
  if (nbPages <= 3) return {
    label: 'Essentiel', prix: 299,
    pourquoi: `Avec ${nbPages} page${nbPages > 1 ? 's' : ''}, la formule Essentiel couvre votre besoin sans superflu : un site efficace, livré en 5 jours.`,
  }
  if (nbPages <= 6) return {
    label: 'Pro', prix: 490,
    pourquoi: `Avec ${nbPages} pages, la formule Pro est idéale : jusqu'à 6 sections, formulaire de contact et référencement Google de base.`,
  }
  return {
    label: 'Premium', prix: 790,
    pourquoi: `Avec ${nbPages} pages, votre projet mérite la formule Premium : sections illimitées, prise de RDV en ligne et référencement avancé.`,
  }
}

export function labelSecteur(devis) {
  if (devis.secteur === 'autre') return devis.secteurAutre || 'Autre'
  return SECTEURS.find(s => s.id === devis.secteur)?.label || ''
}
