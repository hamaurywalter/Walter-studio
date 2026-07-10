import { Link } from 'react-router-dom'
import { PAGES, OPTIONS, MAINTENANCES, getFormule, labelSecteur } from './devisData.js'

export default function Step5Resultat({ devis, sent, loading, error, onSend }) {
  const formule = getFormule(devis.pages.length)
  const maint   = MAINTENANCES.find(m => m.id === devis.maintenance)
  const c = devis.contact

  if (sent) {
    return (
      <div className="bg-white border border-laiton/25 rounded-2xl p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-laiton/10 border border-laiton/30 flex items-center justify-center mx-auto mb-5">
          <svg className="w-6 h-6 text-laiton" viewBox="0 0 24 24" fill="none">
            <path d="M4 12l5.5 5.5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="font-display font-bold text-minuit text-2xl mb-2">Demande envoyée !</p>
        <p className="text-minuit/50 text-sm">Je reviens vers vous sous 48h.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-minuit mb-2">
        Votre devis estimé
      </h2>
      <p className="text-minuit/50 text-sm mb-8">
        Vérifiez le récapitulatif — vous pouvez revenir en arrière pour ajuster.
      </p>

      {/* Formule recommandée */}
      <div className="bg-minuit rounded-2xl p-8 text-white mb-6">
        <p className="font-util text-xs tracking-widest uppercase text-brume/50 mb-3">Formule recommandée</p>
        <div className="flex items-baseline justify-between gap-4 mb-4">
          <span className="font-display text-3xl font-bold">{formule.label}</span>
          <span className="font-util text-4xl text-laiton shrink-0">{formule.prix}€</span>
        </div>
        <p className="text-sm text-white/55 leading-relaxed mb-5">{formule.pourquoi}</p>
        <div className="border-t border-white/10 pt-4 flex items-baseline justify-between gap-4 text-sm">
          <span className="text-white/55">Maintenance {maint.label}</span>
          <span className="font-util text-white shrink-0">{maint.prix}€/mois</span>
        </div>
      </div>

      {/* Récapitulatif */}
      <div className="bg-white border border-brume/25 rounded-2xl p-7 mb-8 space-y-5">
        <div>
          <p className="font-util text-[11px] tracking-widest uppercase text-minuit/35 mb-1.5">Secteur</p>
          <p className="text-sm text-minuit">{labelSecteur(devis)}</p>
        </div>
        <div>
          <p className="font-util text-[11px] tracking-widest uppercase text-minuit/35 mb-1.5">
            Pages ({devis.pages.length} + mentions légales)
          </p>
          <p className="text-sm text-minuit leading-relaxed">
            {devis.pages.map(id => PAGES.find(p => p.id === id)?.label).join(' · ')}
          </p>
        </div>
        <div>
          <p className="font-util text-[11px] tracking-widest uppercase text-minuit/35 mb-1.5">Options</p>
          <p className="text-sm text-minuit leading-relaxed">
            {devis.options.length
              ? devis.options.map(id => {
                  const label = OPTIONS.find(o => o.id === id)?.label
                  return id === 'autre' && devis.optionAutre.trim()
                    ? `${label} : ${devis.optionAutre.trim()}`
                    : label
                }).join(' · ')
              : 'Aucune'}
          </p>
        </div>
        <div>
          <p className="font-util text-[11px] tracking-widest uppercase text-minuit/35 mb-1.5">Maintenance</p>
          <p className="text-sm text-minuit">{maint.label} · {maint.prix}€/mois</p>
        </div>
        <div>
          <p className="font-util text-[11px] tracking-widest uppercase text-minuit/35 mb-1.5">Contact</p>
          <p className="text-sm text-minuit">
            {[`${c.prenom} ${c.nom}`.trim(), c.entreprise, c.ville].filter(Boolean).join(' · ')}
            {(c.prenom || c.nom || c.entreprise || c.ville) && <br />}
            {c.email}{c.tel ? ` · ${c.tel}` : ''}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onSend}
        disabled={loading}
        className="w-full bg-laiton text-minuit text-sm font-semibold py-4 rounded-xl hover:bg-laiton/80 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? 'Envoi en cours…' : 'Envoyer ma demande de devis'}
      </button>
      {error && (
        <p className="text-red-500 text-xs text-center mt-3">
          Une erreur est survenue. Réessayez ou écrivez-moi directement à hamaury.walter@icloud.com
        </p>
      )}
      <p className="font-util text-[11px] text-minuit/35 text-center mt-3 leading-relaxed">
        En envoyant ce formulaire, j'accepte que mes données soient traitées conformément à la{' '}
        <Link to="/confidentialite" className="underline underline-offset-2 hover:text-minuit/60 transition-colors">politique de confidentialité</Link>.
      </p>
      <p className="font-util text-xs text-minuit/30 text-center mt-2">Gratuit · Sans engagement · Réponse sous 48h</p>
    </div>
  )
}
