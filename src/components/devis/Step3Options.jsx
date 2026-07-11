import { OPTIONS, MAINTENANCES, getCodePromo } from './devisData.js'

export default function Step3Options({ devis, setDevis }) {
  const toggle = id =>
    setDevis(d => ({
      ...d,
      options: d.options.includes(id) ? d.options.filter(o => o !== id) : [...d.options, id],
    }))

  return (
    <div>
      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-minuit mb-2">
        Options complémentaires
      </h2>
      <p className="text-minuit/50 text-sm mb-8">
        Quelques précisions pour affiner votre devis.
      </p>

      <div className="flex flex-col gap-3">
        {OPTIONS.map(o => {
          const checked = devis.options.includes(o.id)
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => toggle(o.id)}
              className={`flex items-center gap-4 p-4 rounded-xl border text-left text-sm font-medium transition-all ${
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
              {o.label}
            </button>
          )
        })}

        {devis.options.includes('autre') && (
          <textarea
            autoFocus
            rows={3}
            placeholder="Précisez votre demande…"
            value={devis.optionAutre}
            onChange={e => setDevis(d => ({ ...d, optionAutre: e.target.value }))}
            className="w-full bg-white border border-brume/30 text-minuit placeholder:text-minuit/30 rounded-xl px-5 py-4 text-sm outline-none focus:border-laiton/60 transition-colors resize-none"
          />
        )}
      </div>

      {/* Code parrainage / promo */}
      <p className="font-util text-xs tracking-widest uppercase text-minuit/35 mt-10 mb-3">
        Code parrainage / promo <span className="normal-case tracking-normal text-minuit/25">(optionnel)</span>
      </p>
      <input
        type="text"
        placeholder="Ex : STUDIO"
        value={devis.codePromo}
        onChange={e => setDevis(d => ({ ...d, codePromo: e.target.value }))}
        className="w-full bg-white border border-brume/30 text-minuit placeholder:text-minuit/30 rounded-xl px-5 py-4 text-sm outline-none focus:border-laiton/60 transition-colors"
      />
      {getCodePromo(devis.codePromo) && (
        <div className="mt-3 bg-laiton/10 border border-laiton/30 text-minuit rounded-xl px-4 py-3 text-xs leading-relaxed">
          {getCodePromo(devis.codePromo).message}
        </div>
      )}

      {/* Maintenance mensuelle */}
      <p className="font-util text-xs tracking-widest uppercase text-minuit/35 mt-10 mb-3">
        Votre maintenance mensuelle
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {MAINTENANCES.map(m => {
          const selected = devis.maintenance === m.id
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setDevis(d => ({ ...d, maintenance: m.id }))}
              className={`p-5 rounded-xl border text-left transition-all ${
                selected
                  ? 'bg-minuit text-white border-minuit'
                  : 'bg-white text-minuit/70 border-brume/30 hover:border-laiton/50'
              }`}>
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <span className="text-sm font-semibold">{m.label}</span>
                <span className={`font-util text-lg shrink-0 ${selected ? 'text-laiton' : 'text-minuit/60'}`}>
                  {m.prix}€/mois
                </span>
              </div>
              <p className={`text-xs leading-relaxed ${selected ? 'text-white/50' : 'text-minuit/40'}`}>
                {m.desc}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
