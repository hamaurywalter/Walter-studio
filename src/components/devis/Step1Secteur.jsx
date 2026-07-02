import { SECTEURS } from './devisData.js'

export default function Step1Secteur({ devis, setDevis }) {
  return (
    <div>
      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-minuit mb-2">
        Votre secteur d'activité
      </h2>
      <p className="text-minuit/50 text-sm mb-8">Sélectionnez le domaine qui correspond le mieux à votre activité.</p>

      <div className="grid sm:grid-cols-2 gap-3">
        {SECTEURS.map(s => {
          const selected = devis.secteur === s.id
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setDevis(d => ({ ...d, secteur: s.id }))}
              className={`flex items-center gap-3 p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                selected
                  ? 'bg-minuit text-white border-minuit'
                  : 'bg-white text-minuit/70 border-brume/30 hover:border-laiton/50'
              }`}>
              <span className="text-xl shrink-0">{s.icon}</span>
              {s.label}
            </button>
          )
        })}
      </div>

      {devis.secteur === 'autre' && (
        <input
          type="text"
          autoFocus
          placeholder="Précisez votre activité…"
          value={devis.secteurAutre}
          onChange={e => setDevis(d => ({ ...d, secteurAutre: e.target.value }))}
          className="mt-4 w-full bg-white border border-brume/30 text-minuit placeholder:text-minuit/30 rounded-xl px-5 py-4 text-sm outline-none focus:border-laiton/60 transition-colors"
        />
      )}
    </div>
  )
}
