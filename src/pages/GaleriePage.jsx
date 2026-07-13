import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'

/* ═══════════════════════════════════════════════════════════════
   GALERIE DES MAQUETTES CLIENTS
   Lit /maquettes/clients/metadata.json et affiche chaque maquette.
   Lien vers /maquettes/clients/{id}.html
═══════════════════════════════════════════════════════════════ */
export default function GaleriePage() {
  useSEO({
    title:       'Galerie des maquettes – WALTER Studio',
    description: 'Aperçu des maquettes de sites réalisées par WALTER Studio.',
    canonical:   'https://walter-studio.fr/galerie',
  })

  const [maquettes, setMaquettes] = useState([])
  const [filtre,    setFiltre]    = useState('tous')
  const [recherche, setRecherche] = useState('')
  const [loading,   setLoading]   = useState(true)
  const [erreur,    setErreur]    = useState(null)

  useEffect(() => {
    fetch('/maquettes/clients/metadata.json')
      .then(res => {
        if (!res.ok) throw new Error('metadata.json introuvable')
        return res.json()
      })
      .then(data => { setMaquettes(data.maquettes || []); setLoading(false) })
      .catch(err => { setErreur(err.message); setLoading(false) })
  }, [])

  const q = recherche.toLowerCase()
  const filtrees = maquettes.filter(m => {
    const okFiltre = filtre === 'tous' || m.secteur === filtre
    const okRech =
      m.nom.toLowerCase().includes(q) ||
      (m.ville || '').toLowerCase().includes(q) ||
      (m.secteur || '').toLowerCase().includes(q)
    return okFiltre && okRech
  })

  const secteurs = ['tous', ...new Set(maquettes.map(m => m.secteur))]

  const badge = {
    'en-cours': { cls: 'bg-laiton/15 text-laiton border border-laiton/30', txt: 'En cours' },
    'livree':   { cls: 'bg-minuit text-craie',                             txt: 'Livrée'   },
    'revision': { cls: 'bg-brume/25 text-encre border border-brume/40',    txt: 'Révision' },
  }

  return (
    <div className="min-h-screen bg-craie text-minuit">

      {/* Barre haute */}
      <header className="bg-white/96 border-b border-brume/20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/">
            <picture>
              <source srcSet="/logoWS.webp" type="image/webp" />
              <img src="/logoWS.png" alt="WALTER Studio" className="h-10 w-auto" />
            </picture>
          </Link>
          <Link to="/"
            className="font-util text-xs tracking-widest uppercase text-minuit/50 hover:text-laiton transition-colors">
            ← Accueil
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-14">

        {/* Titre */}
        <div className="mb-10">
          <p className="font-util text-xs tracking-widest uppercase text-laiton mb-3">Portfolio</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-minuit mb-2">
            Galerie des maquettes
          </h1>
          <p className="text-minuit/55 text-sm">
            {loading ? 'Chargement…' : `${filtrees.length} maquette(s)`}
          </p>
        </div>

        {/* Recherche + filtres */}
        {!loading && !erreur && maquettes.length > 0 && (
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
            <input
              type="text"
              placeholder="Rechercher (nom, ville, secteur)…"
              value={recherche}
              onChange={e => setRecherche(e.target.value)}
              className="flex-1 bg-white/70 border border-brume/30 text-minuit placeholder:text-minuit/35 rounded-xl px-5 py-3 text-sm outline-none focus:border-laiton/60 transition-colors"
            />
            <div className="flex gap-2 overflow-x-auto pb-1">
              {secteurs.map(s => (
                <button
                  key={s}
                  onClick={() => setFiltre(s)}
                  className={`font-util text-xs tracking-wide uppercase whitespace-nowrap px-4 py-2.5 rounded-full transition-colors ${
                    filtre === s
                      ? 'bg-laiton text-minuit'
                      : 'bg-white/70 text-minuit/60 border border-brume/30 hover:border-laiton/50'
                  }`}>
                  {s === 'tous' ? 'Tous' : s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* États */}
        {loading && (
          <p className="text-minuit/50 text-sm py-12 text-center">Chargement des maquettes…</p>
        )}

        {erreur && (
          <div className="bg-white/60 border border-laiton/20 rounded-xl p-8 text-center">
            <p className="text-minuit/70 text-sm">
              Impossible de charger la liste ({erreur}).<br />
              Vérifie que <code className="font-util text-laiton">public/maquettes/clients/metadata.json</code> existe.
            </p>
          </div>
        )}

        {!loading && !erreur && filtrees.length === 0 && (
          <div className="border border-dashed border-laiton/25 rounded-xl p-10 text-center">
            <p className="text-minuit/45 text-sm">Aucune maquette ne correspond à ta recherche.</p>
          </div>
        )}

        {/* Grille */}
        {!loading && !erreur && filtrees.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtrees.map(m => {
              const b = badge[m.statut] || { cls: 'bg-brume/20 text-encre', txt: m.statut }
              return (
                <div key={m.id}
                  className="bg-white/60 border border-brume/20 rounded-xl overflow-hidden card-lift flex flex-col">

                  {/* Bandeau navigateur façon site */}
                  <div className="bg-encre px-4 py-3 flex items-center gap-3">
                    <div className="flex gap-1.5 shrink-0">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                      <div className="w-3 h-3 rounded-full bg-[#FFBE2E]" />
                      <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                    </div>
                    <div className="flex-1 bg-minuit/60 rounded-md px-3 py-1 font-util text-[11px] text-brume/50 truncate">
                      walter-studio.fr/…/{m.id}
                    </div>
                  </div>

                  {/* Corps */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-display text-xl font-bold text-minuit">{m.nom}</h3>
                      <span className={`shrink-0 font-util text-[10px] tracking-wide uppercase px-2 py-1 rounded ${b.cls}`}>
                        {b.txt}
                      </span>
                    </div>
                    <p className="font-util text-xs text-minuit/40 mb-4">
                      {m.ville ? `${m.ville} · ` : ''}{m.secteur}
                    </p>
                    <p className="text-sm text-minuit/60 leading-relaxed mb-6 flex-grow">
                      {m.description}
                    </p>

                    <a
                      href={`/maquettes/clients/${m.id}.html`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-laiton text-minuit text-sm font-semibold py-3 rounded-full hover:bg-laiton/80 transition-colors">
                      Voir la maquette →
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Pied */}
        {!loading && !erreur && (
          <p className="mt-14 pt-8 border-t border-brume/20 text-center font-util text-xs text-minuit/35">
            {maquettes.length} maquette(s) en base · WALTER Studio
          </p>
        )}
      </div>
    </div>
  )
}
