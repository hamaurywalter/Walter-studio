import { PAGES, getFormule } from './devisData.js'

export default function Step2Pages({ devis, setDevis }) {
  const toggle = id =>
    setDevis(d => ({
      ...d,
      pages: d.pages.includes(id) ? d.pages.filter(p => p !== id) : [...d.pages, id],
    }))

  const n = devis.pages.length
  const formule = n > 0 ? getFormule(n) : null

  return (
    <div>
      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-minuit mb-2">
        Les pages de votre site
      </h2>
      <p className="text-minuit/50 text-sm mb-8">
        Cochez tout ce dont vous avez besoin — les mentions légales sont toujours incluses.
      </p>

      <div className="grid sm:grid-cols-2 gap-3">
        {PAGES.map(p => {
          const checked = devis.pages.includes(p.id)
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => toggle(p.id)}
              className={`flex items-center gap-3 p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                checked
                  ? 'bg-minuit text-white border-minuit'
                  : 'bg-white text-minuit/70 border-brume/30 hover:border-laiton/50'
              }`}>
              <span className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                checked ? 'bg-laiton border-laiton' : 'border-brume/40'
              }`}>
                {checked && (
                  <svg className="w-3 h-3 text-minuit" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </span>
              {p.label}
            </button>
          )
        })}
      </div>

      {/* Formule live */}
      <div className={`mt-6 rounded-xl px-6 py-4 text-sm transition-all ${
        formule ? 'bg-minuit text-white' : 'bg-white border border-dashed border-brume/40 text-minuit/40'
      }`}>
        {formule ? (
          <div className="flex items-center justify-between gap-4">
            <span className="text-white/60">
              {n} page{n > 1 ? 's' : ''} sélectionnée{n > 1 ? 's' : ''} →{' '}
              <strong className="text-white">Formule {formule.label}</strong>
            </span>
            <span className="font-util text-laiton text-xl shrink-0">{formule.prix}€</span>
          </div>
        ) : (
          'Cochez au moins une page pour voir la formule recommandée.'
        )}
      </div>
    </div>
  )
}
