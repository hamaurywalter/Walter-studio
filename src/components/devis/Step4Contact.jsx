export default function Step4Contact({ devis, setDevis }) {
  const set = (key, value) =>
    setDevis(d => ({ ...d, contact: { ...d.contact, [key]: value } }))

  const inputCls = "w-full bg-white border border-brume/30 text-minuit placeholder:text-minuit/30 rounded-xl px-5 py-4 text-sm outline-none focus:border-laiton/60 transition-colors"
  const c = devis.contact

  return (
    <div>
      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-minuit mb-2">
        Vos coordonnées
      </h2>
      <p className="text-minuit/50 text-sm mb-8">
        Pour vous envoyer votre devis personnalisé sous 48h.
      </p>

      <div className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input type="text" placeholder="Prénom"
            value={c.prenom} onChange={e => set('prenom', e.target.value)}
            className={inputCls} />
          <input type="text" placeholder="Nom"
            value={c.nom} onChange={e => set('nom', e.target.value)}
            className={inputCls} />
        </div>
        <input type="text" placeholder="Nom de l'entreprise"
          value={c.entreprise} onChange={e => set('entreprise', e.target.value)}
          className={inputCls} />
        <input type="text" placeholder="Ville"
          value={c.ville} onChange={e => set('ville', e.target.value)}
          className={inputCls} />
        <input type="email" required placeholder="Email *"
          value={c.email} onChange={e => set('email', e.target.value)}
          className={inputCls} />
        <input type="tel" placeholder="Téléphone (optionnel)"
          value={c.tel} onChange={e => set('tel', e.target.value)}
          className={inputCls} />
      </div>

      <p className="font-util text-xs text-minuit/35 mt-4">* Champ obligatoire</p>
    </div>
  )
}
