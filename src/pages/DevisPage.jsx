import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

import StepperBar    from '../components/devis/StepperBar.jsx'
import Step1Secteur  from '../components/devis/Step1Secteur.jsx'
import Step2Pages    from '../components/devis/Step2Pages.jsx'
import Step3Options  from '../components/devis/Step3Options.jsx'
import Step4Contact  from '../components/devis/Step4Contact.jsx'
import Step5Resultat from '../components/devis/Step5Resultat.jsx'
import { PAGES, OPTIONS, MAINTENANCES, getFormule, labelSecteur } from '../components/devis/devisData.js'

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const variants = {
  enter:  dir => (reduced ? { opacity: 1 } : { x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
}

export default function DevisPage() {
  const [devis, setDevis] = useState({
    secteur:      '',
    secteurAutre: '',
    pages:        [],
    options:      [],
    optionAutre:  '',
    maintenance:  'essentiel',
    contact: { prenom: '', nom: '', entreprise: '', ville: '', email: '', tel: '' },
  })
  const [step, setStep]           = useState(1)
  const [direction, setDirection] = useState(1)
  const [sent, setSent]           = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(false)

  const go = n => {
    setDirection(n > step ? 1 : -1)
    setStep(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* Validation par étape */
  const canNext = {
    1: devis.secteur !== '' && (devis.secteur !== 'autre' || devis.secteurAutre.trim() !== ''),
    2: devis.pages.length > 0,
    3: true,
    4: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(devis.contact.email),
  }[step]

  async function handleSend() {
    setLoading(true)
    setError(false)
    const formule = getFormule(devis.pages.length)
    const maint   = MAINTENANCES.find(m => m.id === devis.maintenance)
    const c = devis.contact
    const message = [
      'DEMANDE DE DEVIS — Configurateur WALTER Studio',
      '═══════════════════════════════════════════',
      '',
      `SECTEUR : ${labelSecteur(devis)}`,
      `FORMULE RECOMMANDÉE : ${formule.label} — ${formule.prix}€`,
      `MAINTENANCE : ${maint.label} — ${maint.prix}€/mois`,
      '',
      `PAGES SOUHAITÉES (${devis.pages.length}) :`,
      ...devis.pages.map(id => `  · ${PAGES.find(p => p.id === id)?.label}`),
      '  · Mentions légales (incluses)',
      '',
      'OPTIONS COMPLÉMENTAIRES :',
      ...(devis.options.length
        ? devis.options.map(id => {
            const label = OPTIONS.find(o => o.id === id)?.label
            return id === 'autre' && devis.optionAutre.trim()
              ? `  · ${label} : ${devis.optionAutre.trim()}`
              : `  · ${label}`
          })
        : ['  Aucune']),
      '',
      'CONTACT :',
      `  Nom : ${`${c.prenom} ${c.nom}`.trim() || 'Non renseigné'}`,
      `  Entreprise : ${c.entreprise || 'Non renseignée'}`,
      `  Ville : ${c.ville || 'Non renseignée'}`,
      `  Email : ${c.email}`,
      `  Tél : ${c.tel || 'Non renseigné'}`,
    ].join('\n')

    try {
      await emailjs.send('service_bp6mu9b', 'template_tssg0zr', {
        name:    [`${c.prenom} ${c.nom}`.trim(), c.entreprise, c.ville].filter(Boolean).join(' — ') || c.email,
        email:   c.email,
        tel:     c.tel || 'Non renseigné',
        message,
      }, '5SBrP57uZX8ptAwJW')
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-craie">

      {/* Header */}
      <header className="bg-white border-b border-brume/15">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/">
            <img src="/logoWS.png" alt="WALTER Studio" className="h-9 w-auto" />
          </Link>
          <Link to="/" className="text-sm text-minuit/50 hover:text-minuit transition-colors">
            ← Retour au site
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12 md:py-16">

        <div className="mb-10 text-center">
          <p className="font-util text-xs tracking-widest uppercase text-laiton mb-3">Devis en ligne</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-minuit">
            Estimez votre projet en 2 minutes
          </h1>
        </div>

        <StepperBar step={step} onStepClick={go} />

        <motion.div
          key={step}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          transition={{ duration: 0.3, ease: 'easeOut' }}>
            {step === 1 && <Step1Secteur devis={devis} setDevis={setDevis} />}
            {step === 2 && <Step2Pages   devis={devis} setDevis={setDevis} />}
            {step === 3 && <Step3Options devis={devis} setDevis={setDevis} />}
            {step === 4 && <Step4Contact devis={devis} setDevis={setDevis} />}
            {step === 5 && (
              <Step5Resultat
                devis={devis}
                sent={sent} loading={loading} error={error}
                onSend={handleSend}
              />
            )}
          </motion.div>

        {/* Navigation bas de page */}
        {!sent && (
          <div className="flex items-center justify-between gap-4 mt-10">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => go(step - 1)}
                className="inline-flex items-center gap-2 text-sm text-minuit/50 hover:text-minuit px-4 py-3 transition-colors">
                ← Retour
              </button>
            ) : <span />}

            {step < 5 && (
              <button
                type="button"
                onClick={() => canNext && go(step + 1)}
                disabled={!canNext}
                className="inline-flex items-center gap-2 bg-minuit text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-encre transition-colors disabled:opacity-35 disabled:cursor-not-allowed">
                Continuer →
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
