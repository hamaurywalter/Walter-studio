import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import emailjs from '@emailjs/browser'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Routes, Route, Link } from 'react-router-dom'
import SimulateurPage from './pages/SimulateurPage.jsx'

/* ═══════════════════════════════════════════════════════════════
   HELPERS ANIMATION
═══════════════════════════════════════════════════════════════ */
const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Fade + montée au scroll */
function FadeUp({ children, delay = 0, className = '', fromX = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24, x: fromX }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

/* Texte mot par mot */
function WordReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const words = String(children).split(' ')
  return (
    <span ref={ref} className={`inline ${className}`} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={reduced ? false : { y: 28, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.45, delay: delay + i * 0.06, ease: 'easeOut' }}>
            {word}{i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#realisations', label: 'Réalisations' },
    { href: '#services',     label: 'Services'     },
    { href: '#tarifs',       label: 'Tarifs'       },
    { href: '#apropos',      label: 'À propos'     },
    { href: '#contact',      label: 'Contact'      },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/96 backdrop-blur-sm border-b border-craie shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <a href="/">
          <img
            src={scrolled ? '/logoWS.png' : '/logoWS-white.png'}
            alt="WALTER Studio"
            className={`w-auto transition-all duration-300 ${scrolled ? 'h-11' : 'h-12'}`}
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className={`nav-link text-sm transition-colors ${
                scrolled ? 'text-minuit/60 hover:text-minuit' : 'text-white/60 hover:text-white'
              }`}>
              {l.label}
            </a>
          ))}
          <Link to="/simulateur"
            className={`nav-link text-sm font-medium transition-colors ${
              scrolled ? 'text-laiton hover:text-minuit' : 'text-laiton hover:text-white'
            }`}>
            Simulateur
          </Link>
        </nav>

        <a href="#contact"
          className="hidden md:inline-flex items-center gap-2 bg-laiton text-minuit text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-laiton/80 transition-colors">
          Devis gratuit
        </a>

        <button className="md:hidden p-2" onClick={() => setMenuOpen(true)} aria-label="Ouvrir le menu">
          <span className={`block w-6 h-0.5 mb-1.5 ${scrolled ? 'bg-minuit' : 'bg-white'}`} />
          <span className={`block w-6 h-0.5 mb-1.5 ${scrolled ? 'bg-minuit' : 'bg-white'}`} />
          <span className={`block w-4 h-0.5 ${scrolled ? 'bg-minuit' : 'bg-white'}`} />
        </button>
      </div>

      {menuOpen && createPortal(
        <div
          style={{ backgroundColor: '#0B0530' }}
          className="fixed inset-0 z-[200] flex flex-col px-8 py-10">
          <button
            className="absolute top-6 right-6 text-white/50 hover:text-white text-3xl leading-none"
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer">✕</button>
          <nav className="flex flex-col gap-8 mt-20">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="font-display text-4xl font-bold text-white hover:text-laiton transition-colors"
                onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <Link to="/simulateur"
              className="font-display text-4xl font-bold text-laiton hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}>
              Simulateur
            </Link>
          </nav>
          <a href="#contact"
            className="mt-auto inline-flex justify-center bg-laiton text-minuit font-semibold px-6 py-4 rounded-full"
            onClick={() => setMenuOpen(false)}>
            Devis gratuit
          </a>
        </div>,
        document.body
      )}
    </header>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HERO — typewriter + ticker + entrée orchestrée + parallax
═══════════════════════════════════════════════════════════════ */
function Hero() {
  const professions = [
    'boulangerie', 'salon de coiffure', 'cabinet de kiné',
    'restaurant', 'plomberie', 'menuiserie',
  ]
  const [profIdx,   setProfIdx]   = useState(0)
  const [typed,     setTyped]     = useState('')
  const [typePhase, setTypePhase] = useState('typing')
  const [typeOn,    setTypeOn]    = useState(false)
  const [show, setShow] = useState({ ticker: false, title: false, body: false, ctas: false })
  const timerRef  = useRef(null)
  const sectionRef = useRef(null)

  /* Parallax */
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : -60])

  /* Séquence d'entrée */
  useEffect(() => {
    if (reduced) {
      setShow({ ticker: true, title: true, body: true, ctas: true })
      setTypeOn(true)
      setTyped('site web')
      return
    }
    const t1 = setTimeout(() => setShow(s => ({ ...s, ticker: true  })), 150)
    const t2 = setTimeout(() => setShow(s => ({ ...s, title:  true  })), 320)
    const t3 = setTimeout(() => setShow(s => ({ ...s, body:   true  })), 480)
    const t4 = setTimeout(() => { setShow(s => ({ ...s, ctas: true })); setTypeOn(true) }, 680)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  /* Boucle typewriter */
  useEffect(() => {
    if (!typeOn || reduced) return
    const prof = professions[profIdx]
    if (typePhase === 'typing') {
      if (typed.length < prof.length) {
        timerRef.current = setTimeout(() => setTyped(prof.slice(0, typed.length + 1)), 85)
      } else {
        timerRef.current = setTimeout(() => setTypePhase('pausing'), 2000)
      }
    } else if (typePhase === 'pausing') {
      timerRef.current = setTimeout(() => setTypePhase('deleting'), 100)
    } else {
      if (typed.length > 0) {
        timerRef.current = setTimeout(() => setTyped(typed.slice(0, -1)), 45)
      } else {
        setProfIdx(i => (i + 1) % professions.length)
        setTypePhase('typing')
      }
    }
    return () => clearTimeout(timerRef.current)
  }, [typeOn, typed, typePhase, profIdx])

  const TICKER = 'BOULANGERIES · PLOMBIERS · KINÉSITHÉRAPEUTES · COIFFEURS · RESTAURATEURS · ARTISANS DU BÂTIMENT · PHOTOGRAPHES · AVOCATS · OSTÉOPATHES · ARCHITECTES · '

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col bg-minuit text-white overflow-hidden">
      <motion.div
        style={{ y: heroY }}
        className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full px-6 pt-52 md:pt-36 pb-16">

        <div className={`transition-all duration-700 ${show.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="font-display font-bold leading-[1.0] tracking-tight mb-4">
            <span className="text-4xl md:text-6xl lg:text-7xl text-white/35">Votre </span>
            <span className="text-4xl md:text-6xl lg:text-7xl text-white">{typed}</span>
            <span className="tw-cursor" style={{ height: '0.85em' }} aria-hidden="true" />
            <br />
            <span className="text-4xl md:text-6xl lg:text-7xl text-laiton">
              vient d'apparaître en ligne.
            </span>
          </h1>
        </div>

        <div className={`transition-all duration-700 ${show.body ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mb-10">
            Les professionnels locaux perdent des clients chaque jour parce qu'ils sont introuvables sur Google.
            Je règle ça en 2 semaines, à partir de 299€ — sans agence, sans intermédiaire.
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${show.ctas ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-laiton text-minuit px-8 py-4 rounded-full text-sm font-semibold hover:bg-laiton/80 transition-colors">
            Obtenir mon site →
          </a>
          <a href="#realisations"
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-full text-sm hover:border-laiton/60 transition-colors">
            Voir un exemple
          </a>
        </div>
      </motion.div>

      <div className={`border-t border-brume/20 overflow-hidden transition-all duration-700 ${show.ticker ? 'opacity-100' : 'opacity-0'}`}>
        <div className="ticker-track py-4" aria-hidden="true">
          {[0, 1].map(i => (
            <span key={i} className="font-util text-xs tracking-[0.25em] text-brume/40 whitespace-nowrap">
              {TICKER}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   RÉALISATIONS
═══════════════════════════════════════════════════════════════ */
function Realisations() {
  const tagsRef = useRef(null)
  const tagsInView = useInView(tagsRef, { once: true, amount: 0.5 })

  const tags = ['Design sur-mesure', 'Mobile first', 'SEO local', 'Galerie photo']

  return (
    <section id="realisations" className="py-28 px-6 bg-craie">
      <div className="max-w-6xl mx-auto">

        <FadeUp className="mb-16">
          <p className="font-util text-xs tracking-widest uppercase text-laiton mb-3">Portfolio</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-minuit">
            <WordReveal>Réalisations</WordReveal>
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          <FadeUp fromX={-20}>
            <div className="rounded-xl overflow-hidden border border-brume/20 shadow-xl shadow-minuit/10 card-lift">
              <div className="bg-encre px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBE2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 bg-minuit/60 rounded-md px-3 py-1 font-util text-xs text-brume/50 truncate">
                  ellesmaisondebeaute.com
                </div>
              </div>
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="/elles-vitrine.png"
                  alt="Site Elles – Maison de Beauté"
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            </div>
          </FadeUp>

          <FadeUp fromX={20} delay={0.1}>
            <p className="font-util text-xs tracking-widest text-laiton uppercase mb-3">
              Site complet · 2024
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-minuit mb-4">
              Elles — Maison de Beauté
            </h3>
            <p className="text-minuit/60 leading-relaxed mb-6">
              Institut de beauté rennais. Présentation des soins, galerie photos, horaires
              et contact direct. Design sobre, mobile first, optimisé pour le référencement local.{' '}
              <a href="https://ellesmaisondebeaute.com" target="_blank" rel="noopener noreferrer"
                className="text-laiton hover:text-minuit transition-colors underline underline-offset-4">
                ellesmaisondebeaute.com
              </a>
            </p>

            <ul ref={tagsRef} className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag, i) => (
                <motion.li
                  key={tag}
                  initial={reduced ? false : { opacity: 0, scale: 0.85 }}
                  animate={tagsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: i * 0.07, ease: 'easeOut' }}
                  className="font-util text-xs border border-laiton/30 text-laiton px-3 py-1 rounded-full">
                  {tag}
                </motion.li>
              ))}
            </ul>

            <div className="h-px bg-brume/20 mb-5" />
            <p className="font-util text-xs text-minuit/35">Livré en 10 jours · Rennes</p>
          </FadeUp>
        </div>

        <FadeUp delay={0.1} className="mt-20">
          <div className="border border-dashed border-laiton/20 rounded-xl p-10 text-center">
            <p className="text-minuit/40 text-sm mb-2">Votre activité ici, bientôt.</p>
            <a href="#contact"
              className="text-laiton text-sm hover:text-minuit transition-colors underline underline-offset-4">
              Parlons de votre projet →
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SERVICES
═══════════════════════════════════════════════════════════════ */
function Services() {
  const services = [
    {
      title: 'Essentiel',
      price: '299',
      delay: '5 jours',
      desc: "L'essentiel pour être visible en ligne rapidement.",
      features: ["Site one-page", "Jusqu'à 3 sections", "Design responsive", "1 série de retouches"],
    },
    {
      title: 'Pro',
      price: '490',
      delay: '2 semaines',
      desc: 'La formule complète pour une présence professionnelle.',
      features: ["Jusqu'à 6 sections", "Formulaire de contact", "Référencement Google de base", "2 séries de retouches"],
      highlight: true,
    },
    {
      title: 'Premium',
      price: '790',
      delay: '2-3 semaines',
      desc: 'La solution sur-mesure sans compromis.',
      features: ["Sections illimitées", "Prise de RDV en ligne", "Référencement avancé", "3 mois de maintenance offerts"],
    },
  ]

  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 })

  return (
    <section id="services" className="py-28 px-6 bg-minuit">
      <div className="max-w-6xl mx-auto">

        <FadeUp className="mb-16">
          <p className="font-util text-xs tracking-widest uppercase text-brume/50 mb-3">Prestations</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white">
            <WordReveal>Trois formules,</WordReveal>
            <br />
            <WordReveal delay={0.18}>un seul interlocuteur</WordReveal>
          </h2>
        </FadeUp>

        <div
          ref={gridRef}
          className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-encre rounded-xl overflow-hidden border border-encre">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12, ease: 'easeOut' }}
              className={`relative p-8 transition-colors ${s.highlight ? 'bg-encre' : 'bg-encre/30 hover:bg-encre/50'}`}>
              {s.highlight && <div className="absolute top-0 left-0 right-0 h-0.5 bg-laiton" />}
              {s.highlight && (
                <p className="font-util text-xs tracking-widest text-laiton uppercase mb-4">Le plus demandé</p>
              )}
              <h3 className="font-display text-2xl font-bold text-white mb-1">{s.title}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-util text-3xl text-laiton">{s.price}€</span>
              </div>
              <p className="font-util text-xs text-brume/45 mb-6">Livré en {s.delay}</p>
              <p className="text-sm text-white/45 leading-relaxed mb-7">{s.desc}</p>
              <ul className="space-y-3">
                {s.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-laiton/70" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <FadeUp delay={0.2} className="mt-10 text-center">
          <a href="#contact"
            className="inline-flex items-center gap-2 border border-laiton/30 text-white text-sm px-7 py-3.5 rounded-full hover:border-laiton transition-colors">
            Discuter de mon projet — c'est gratuit
          </a>
        </FadeUp>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   TARIFS
═══════════════════════════════════════════════════════════════ */
function Tarifs() {
  const plans  = ['Essentiel', 'Pro', 'Premium']
  const prices = ['299€', '490€', '790€']
  const delays = ['5 jours', '2 semaines', '2–3 semaines']

  const features = [
    { label: 'Sections / pages',      values: ["Jusqu'à 3", "Jusqu'à 6", 'Illimitées']   },
    { label: 'Design responsive',     values: [true,  true,  true]                        },
    { label: 'Formulaire de contact', values: [false, true,  true]                        },
    { label: 'Référencement Google',  values: [false, 'Base', 'Avancé']                   },
    { label: 'Prise de RDV en ligne', values: [false, false, true]                        },
    { label: 'Séries de retouches',   values: ['1',   '2',   '3']                         },
    { label: 'Domaine + hébergement', values: [true,  true,  true]                        },
    { label: 'Maintenance offerte',   values: [false, false, '3 mois']                    },
  ]

  const Cell = ({ value }) => {
    if (value === true)  return <span className="text-laiton font-semibold text-base">✓</span>
    if (value === false) return <span className="text-brume/25 text-base">—</span>
    return <span className="text-minuit/65 text-sm font-util">{value}</span>
  }

  const maintenance = [
    { title: 'Essentiel', price: '19€/mois', features: ['3 modifications de texte', "3 modifications d'image"] },
    { title: 'Sérénité',  price: '35€/mois', features: ['15 modifications textes/images', 'Réponse prioritaire', '1 modification de design'] },
  ]

  const maintRef = useRef(null)
  const maintInView = useInView(maintRef, { once: true, amount: 0.3 })

  return (
    <section id="tarifs" className="py-28 px-6 bg-craie">
      <div className="max-w-6xl mx-auto">

        <FadeUp className="mb-16">
          <p className="font-util text-xs tracking-widest uppercase text-laiton mb-3">Tarifs</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-minuit">
            <WordReveal>Des prix clairs,</WordReveal>
            <br />
            <WordReveal delay={0.18}>sans surprise</WordReveal>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="font-util text-xs tracking-widest uppercase text-minuit/35 mb-4">Création</p>
          <div className="overflow-x-auto rounded-xl border border-brume/20 mb-5">
            <table className="w-full min-w-[540px]">
              <thead>
                <tr className="border-b border-brume/20">
                  <th className="text-left p-5 font-util text-xs tracking-widest uppercase text-minuit/35 w-[38%]" />
                  {plans.map((plan, i) => (
                    <th key={plan} className={`p-5 text-center ${i === 1 ? 'bg-laiton/5' : 'bg-white/60'}`}>
                      <p className="font-display font-bold text-minuit text-lg">{plan}</p>
                      <p className="font-util text-laiton text-xl mt-0.5">{prices[i]}</p>
                      <p className="font-util text-minuit/35 text-xs mt-1">{delays[i]}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((f, fi) => (
                  <tr key={f.label} className={`border-b border-brume/10 ${fi % 2 === 0 ? 'bg-white/50' : ''}`}>
                    <td className="p-5 text-sm text-minuit/60">{f.label}</td>
                    {f.values.map((v, vi) => (
                      <td key={vi} className={`p-5 text-center ${vi === 1 ? 'bg-laiton/5' : ''}`}>
                        <Cell value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white/60 border border-laiton/15 rounded-xl px-6 py-4 text-sm text-minuit/55 mb-16 text-center">
            <span className="text-laiton">✦</span>{' '}
            Domaine personnalisé et mise en ligne{' '}
            <strong className="text-minuit">offerts</strong> pour toutes les formules
          </div>
        </FadeUp>

        <p className="font-util text-xs tracking-widest uppercase text-minuit/35 mb-5">Maintenance mensuelle</p>
        <div ref={maintRef} className="grid sm:grid-cols-2 gap-5">
          {maintenance.map((m, i) => (
            <motion.div
              key={m.title}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={maintInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.13, ease: 'easeOut' }}
              className="bg-white/60 border border-brume/20 rounded-xl p-7 card-lift">
              <h3 className="font-display font-bold text-minuit text-xl mb-1">{m.title}</h3>
              <p className="font-util text-laiton text-3xl mb-6">{m.price}</p>
              <ul className="space-y-3">
                {m.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-minuit/60">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-laiton" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <FadeUp delay={0.1} className="mt-12 text-center">
          <a href="#simulateur"
            className="inline-flex items-center gap-2 bg-minuit text-white text-sm px-8 py-4 rounded-full hover:bg-encre transition-colors">
            Estimer mon projet →
          </a>
        </FadeUp>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   À PROPOS
═══════════════════════════════════════════════════════════════ */
function Apropos() {
  const atouts = [
    { title: 'Présence locale',    desc: 'Basé à Rennes, je rencontre mes clients en personne.'    },
    { title: 'Livraison rapide',   desc: 'Votre site en ligne en moins de 2 semaines.'              },
    { title: 'Tarifs accessibles', desc: 'Pensés pour les petits pros, sans rogner sur la qualité.' },
    { title: 'Suivi personnalisé', desc: 'Un interlocuteur unique, du devis à la mise en ligne.'    },
  ]

  const atoutsRef = useRef(null)
  const atoutsInView = useInView(atoutsRef, { once: true, amount: 0.3 })

  return (
    <section id="apropos" className="py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[52%_48%] gap-0 items-start">

          <FadeUp fromX={-20} className="md:-ml-6 lg:-ml-16">
            <div className="aspect-[3/4] md:rounded-r-2xl overflow-hidden bg-craie">
              <img
                src="/pdp.jpeg"
                alt="Hamaury Walter — WALTER Studio"
                className="w-full h-full object-cover"
                onError={e => { e.currentTarget.parentElement.classList.add('flex','items-center','justify-center'); e.currentTarget.remove() }}
              />
            </div>
          </FadeUp>

          <FadeUp fromX={20} delay={0.15} className="relative pl-8 md:pl-12 pt-10 md:pt-0">
            <div
              className="absolute -top-6 right-0 font-display font-bold select-none pointer-events-none leading-none"
              style={{ fontSize: '22rem', color: '#A9A4C9', opacity: 0.07 }}
              aria-hidden="true">W</div>

            <div className="relative z-10">
              <p className="font-util text-xs tracking-widest uppercase text-laiton mb-4">À propos</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-minuit mb-6">
                <WordReveal>Un freelance,</WordReveal>
                <br />
                <WordReveal delay={0.12}>pas une agence</WordReveal>
              </h2>
              <p className="text-minuit/60 leading-relaxed mb-4">
                Je suis Hamaury Walter, freelance à Rennes. Je crée des sites web
                modernes en m'appuyant sur des outils IA pour livrer plus vite, à
                un prix juste, sans intermédiaires.
              </p>
              <p className="text-minuit/60 leading-relaxed mb-10">
                J'accompagne les artisans, coiffeurs, esthéticiennes et professionnels
                locaux qui n'ont pas encore de site — ou qui méritent mieux.
              </p>

              <div ref={atoutsRef} className="grid grid-cols-2 gap-5 mb-10">
                {atouts.map((a, i) => (
                  <motion.div
                    key={a.title}
                    initial={reduced ? false : { opacity: 0, y: 20 }}
                    animate={atoutsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: i * 0.1, ease: 'easeOut' }}
                    className="border-t-2 border-laiton/20 pt-4">
                    <p className="text-sm font-semibold text-minuit mb-1">{a.title}</p>
                    <p className="text-sm text-minuit/50 leading-relaxed">{a.desc}</p>
                  </motion.div>
                ))}
              </div>

              <a href="#contact"
                className="text-laiton text-sm font-semibold hover:text-minuit transition-colors">
                Prendre un appel découverte →
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MÉTHODE
═══════════════════════════════════════════════════════════════ */
function Methode() {
  const etapes = [
    { num: 'I',   title: 'Échange découverte', desc: "On discute de votre activité, vos besoins et vos envies. Gratuit, sans engagement." },
    { num: 'II',  title: 'Devis & maquette',   desc: "Je vous propose une direction visuelle et un devis clair sous 24h."                  },
    { num: 'III', title: 'Création express',    desc: "Je conçois votre site avec l'IA et un soin manuel. Vous suivez l'avancée en direct." },
    { num: 'IV',  title: 'Mise en ligne',       desc: "Domaine, hébergement, mise en ligne : je m'occupe de tout en moins de 2 semaines."  },
  ]

  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 })

  return (
    <section className="py-28 px-6 bg-encre">
      <div className="max-w-6xl mx-auto">

        <FadeUp className="mb-16">
          <p className="font-util text-xs tracking-widest uppercase text-brume/45 mb-3">Méthode</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white">
            <WordReveal>De l'idée au site,</WordReveal>
            <br />
            <WordReveal delay={0.2}>en 4 étapes</WordReveal>
          </h2>
        </FadeUp>

        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brume/10 rounded-xl overflow-hidden">
          {etapes.map((e, i) => (
            <motion.div
              key={e.num}
              initial={reduced ? false : { opacity: 0, y: 28 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.11, ease: 'easeOut' }}
              className="bg-encre p-8 hover:bg-encre/80 transition-colors">
              <div className="w-12 h-12 rounded-full border border-laiton/30 flex items-center justify-center mb-7">
                <span className="font-util text-laiton text-xs">{e.num}</span>
              </div>
              <h3 className="font-semibold text-white text-base mb-3">{e.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{e.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SIMULATEUR DE DEVIS
═══════════════════════════════════════════════════════════════ */
function Simulateur({ onDevis }) {
  const [siteType,    setSiteType]    = useState('essentiel')
  const [maintenance, setMaintenance] = useState('essentiel')
  const [photo,       setPhoto]       = useState(false)

  const siteOptions = {
    essentiel: { label: 'Essentiel', price: 299 },
    pro:       { label: 'Pro',       price: 490 },
    premium:   { label: 'Premium',   price: 790 },
  }
  const sitePrice  = siteOptions[siteType].price
  const siteLabel  = siteOptions[siteType].label
  const maintPrice = maintenance === 'essentiel' ? 19 : 35
  const maintLabel = maintenance === 'essentiel' ? 'Maintenance Essentielle' : 'Maintenance Sérénité'
  const photoPrice = photo ? 40 : 0
  const total      = sitePrice + photoPrice

  const handleDevis = () => {
    const recap = `${siteLabel} (${sitePrice}€)${photo ? ' + Séance photo (40€)' : ''} + ${maintLabel} (${maintPrice}€/mois)`
    onDevis(recap)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const Opt = ({ selected, onClick, children }) => (
    <button type="button" onClick={onClick}
      className={`flex-1 py-3 px-3 rounded-lg border text-sm font-medium transition-all text-center ${
        selected
          ? 'bg-minuit text-white border-minuit'
          : 'bg-white text-minuit/60 border-brume/30 hover:border-laiton/40'
      }`}>
      {children}
    </button>
  )

  return (
    <section id="simulateur" className="py-28 px-6 bg-craie">
      <div className="max-w-4xl mx-auto">

        <FadeUp className="mb-12">
          <p className="font-util text-xs tracking-widest uppercase text-laiton mb-3">Simulateur</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-minuit">
            <WordReveal>Estimez votre projet</WordReveal>
            <br />
            <WordReveal delay={0.2}>en 30 secondes</WordReveal>
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <FadeUp fromX={-15} delay={0.1} className="space-y-7">
            <div>
              <p className="font-util text-xs tracking-widest uppercase text-minuit/35 mb-3">Type de site</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Opt selected={siteType === 'essentiel'} onClick={() => setSiteType('essentiel')}>Essentiel · 299€</Opt>
                <Opt selected={siteType === 'pro'}       onClick={() => setSiteType('pro')}>Pro · 490€</Opt>
                <Opt selected={siteType === 'premium'}   onClick={() => setSiteType('premium')}>Premium · 790€</Opt>
              </div>
            </div>

            <div>
              <p className="font-util text-xs tracking-widest uppercase text-minuit/35 mb-3">Maintenance mensuelle</p>
              <div className="flex gap-2">
                <Opt selected={maintenance === 'essentiel'} onClick={() => setMaintenance('essentiel')}>Essentielle · 19€/mois</Opt>
                <Opt selected={maintenance === 'serenite'}  onClick={() => setMaintenance('serenite')}>Sérénité · 35€/mois</Opt>
              </div>
            </div>

            <div>
              <p className="font-util text-xs tracking-widest uppercase text-minuit/35 mb-3">Option séance photo</p>
              <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                photo ? 'bg-minuit border-minuit' : 'bg-white border-brume/30 hover:border-laiton/40'
              }`}>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                  photo ? 'bg-laiton border-laiton' : 'border-brume/40'
                }`}>
                  {photo && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <input type="checkbox" className="sr-only" checked={photo} onChange={e => setPhoto(e.target.checked)} />
                <div>
                  <p className={`text-sm font-medium ${photo ? 'text-white' : 'text-minuit'}`}>Séance photo professionnelle</p>
                  <p className={`text-xs mt-0.5 ${photo ? 'text-white/55' : 'text-minuit/45'}`}>Photos de votre activité pour illustrer le site — +40€</p>
                </div>
              </label>
            </div>
          </FadeUp>

          <FadeUp fromX={15} delay={0.2}>
            <div className="bg-minuit rounded-2xl p-8 text-white sticky top-20">
              <p className="font-util text-xs tracking-widest uppercase text-brume/50 mb-6">Récapitulatif</p>
              <ul className="space-y-3 mb-6">
                <li className="flex justify-between text-sm">
                  <span className="text-white/60">{siteLabel}</span>
                  <span className="font-util">{sitePrice}€</span>
                </li>
                {photo && (
                  <li className="flex justify-between text-sm">
                    <span className="text-white/60">Séance photo</span>
                    <span className="font-util">40€</span>
                  </li>
                )}
                <li className="pt-3 border-t border-white/10 flex justify-between text-sm">
                  <span className="text-white/60">{maintLabel}</span>
                  <span className="font-util">{maintPrice}€/mois</span>
                </li>
              </ul>
              <div className="border-t border-laiton/20 pt-5 space-y-1.5 mb-8">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-white/45">Total création</span>
                  <span className="font-util text-3xl text-laiton">{total}€</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-white/45">Puis chaque mois</span>
                  <span className="font-util text-lg">{maintPrice}€</span>
                </div>
              </div>
              <button onClick={handleDevis}
                className="w-full bg-laiton text-minuit text-sm font-semibold py-4 rounded-xl hover:bg-laiton/80 transition-colors">
                Demander ce devis →
              </button>
              <p className="font-util text-xs text-white/25 text-center mt-3">Gratuit · Sans engagement</p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════════ */
function Contact({ prefillMessage }) {
  const [form, setForm]       = useState({ name: '', email: '', tel: '', message: '' })
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(false)

  useEffect(() => {
    if (prefillMessage) setForm(f => ({ ...f, message: prefillMessage }))
  }, [prefillMessage])

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      // ── Option Formspree (à activer) ──────────────────────────
      // const res = await fetch('https://formspree.io/f/PLACEHOLDER', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name: form.name, email: form.email, tel: form.tel, message: form.message }),
      // })
      // if (!res.ok) throw new Error()
      // ── Option EmailJS (active) ───────────────────────────────
      await emailjs.send('service_bp6mu9b', 'template_tssg0zr',
        { name: form.name, email: form.email, tel: form.tel, message: form.message },
        '5SBrP57uZX8ptAwJW')
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const inputCls = "w-full bg-white/5 border border-white/10 text-white placeholder:text-white/25 rounded-xl px-5 py-4 text-sm outline-none focus:border-laiton/50 transition-colors"

  return (
    <section id="contact" className="py-28 px-6 bg-minuit">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">

          <FadeUp fromX={-15}>
            <p className="font-util text-xs tracking-widest uppercase text-brume/50 mb-3">Contact</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              <WordReveal>On démarre</WordReveal>
              <br />
              <WordReveal delay={0.12}>votre projet ?</WordReveal>
            </h2>
            <p className="text-white/45 leading-relaxed mb-10">
              Décrivez-moi votre activité en quelques mots. Je vous réponds
              sous 24h avec un devis clair et une première idée visuelle.
              Gratuit, sans engagement.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-laiton/20 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-laiton/60" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4l6 4 6-4M2 4h12v9H2V4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <a href="mailto:hamaury.walter@icloud.com"
                  className="text-white/60 text-sm hover:text-white transition-colors">
                  hamaury.walter@icloud.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-laiton/20 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-laiton/60" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.5A4.5 4.5 0 0 0 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5A4.5 4.5 0 0 0 8 1.5zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" stroke="currentColor" strokeWidth="1.2"/>
                  </svg>
                </div>
                <span className="text-white/60 text-sm">Rennes, Bretagne</span>
              </div>
              <p className="font-util text-xs text-brume/35 pl-14">
                Je réponds généralement sous 24h en semaine
              </p>
            </div>
          </FadeUp>

          <FadeUp fromX={15} delay={0.15}>
            {sent ? (
              <div className="bg-white/5 border border-laiton/20 rounded-2xl p-10 h-full flex flex-col items-center justify-center text-center">
                <p className="font-display font-bold text-laiton text-2xl mb-2">Message envoyé !</p>
                <p className="text-white/45 text-sm">Je vous réponds dans les 24h.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text"  required placeholder="Votre nom"
                    value={form.name}  onChange={e => setForm({ ...form, name: e.target.value })}
                    className={inputCls} />
                  <input type="email" required placeholder="Votre email"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className={inputCls} />
                </div>
                <input type="tel" placeholder="Téléphone (optionnel)"
                  value={form.tel}   onChange={e => setForm({ ...form, tel: e.target.value })}
                  className={inputCls} />
                <textarea required rows={5} placeholder="Décrivez votre activité et ce que vous recherchez…"
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  className={`${inputCls} resize-none`} />
                <button type="submit" disabled={loading}
                  className="w-full bg-laiton text-minuit text-sm font-semibold py-4 rounded-xl hover:bg-laiton/80 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? 'Envoi en cours…' : "Envoyer ma demande — c'est gratuit"}
                </button>
                {error && (
                  <p className="text-red-400 text-xs text-center">
                    Une erreur est survenue. Réessaie ou écris-moi directement par email.
                  </p>
                )}
                <p className="font-util text-xs text-white/25 text-center">Réponse sous 24h · Sans engagement</p>
              </form>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-minuit border-t border-brume/10 px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/45 text-sm">
          © {new Date().getFullYear()}{' '}
          <span className="font-display font-bold text-laiton">WALTER Studio</span> · Rennes
        </p>
        <p className="font-util text-white/25 text-xs">
          Sites web sur-mesure pour les professionnels locaux
        </p>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════════ */
function HomePage() {
  const [prefillMessage, setPrefillMessage] = useState('')

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const t = setTimeout(() => {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Realisations />
      <Services />
      <Tarifs />
      <Apropos />
      <Methode />
      <Simulateur onDevis={setPrefillMessage} />
      <Contact prefillMessage={prefillMessage} />
      <Footer />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   APP — routing
═══════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <Routes>
      <Route path="/"           element={<HomePage />} />
      <Route path="/simulateur" element={<SimulateurPage />} />
    </Routes>
  )
}
