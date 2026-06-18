import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'

/*
  Palette :
  #090428 — bleu nuit (fond sombre, textes forts)
  #ffffff — blanc (fond clair, textes sur fond sombre)
  #F8F5F0 — crème chaud (sections claires intermédiaires)
  #C4A26A — or doux (accents, numéros, badges, highlights)
  #4A4465 — violet nuit (textes secondaires sur fond blanc)
*/

/* ─── Navbar ─────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#realisations', label: 'Réalisations' },
    { href: '#services', label: 'Services' },
    { href: '#tarifs', label: 'Tarifs' },
    { href: '#apropos', label: 'À propos' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur border-b border-[#F8F5F0] shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#">
          <img
            src="/logoWS.png"
            alt="WALTER Studio"
            className={`w-auto transition-all duration-300 ${scrolled ? 'h-11' : 'h-40'}`}
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#4A4465]/70 hover:text-[#090428] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 bg-[#090428] text-white text-sm px-5 py-2.5 rounded-full hover:bg-[#090428]/85 transition-colors"
        >
          Devis gratuit
        </a>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-[#090428] transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#090428] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#090428] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#F8F5F0] px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-base text-[#4A4465] hover:text-[#090428]"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex justify-center bg-[#090428] text-white text-sm px-5 py-3 rounded-full mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Devis gratuit
          </a>
        </div>
      )}
    </header>
  )
}

/* ─── Hero ───────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center bg-[#090428] text-white px-6 pt-48 md:pt-28 pb-24">
      <div className="max-w-5xl mx-auto w-full">
        <p className="text-sm tracking-widest uppercase text-[#C4A26A]/80 mb-8">
          Web design · Rennes & alentours
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight mb-8">
          Votre site web.<br />
          <span className="font-semibold">Livré en 2 semaines.</span>
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-xl mb-12 leading-relaxed">
          Je crée des sites internet sur-mesure pour les artisans et professionnels
          locaux. Conçus avec l'IA, livrés vite, à un prix juste.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#090428] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#F8F5F0] transition-colors"
          >
            Demander un devis gratuit
          </a>
          <a
            href="#realisations"
            className="inline-flex items-center justify-center gap-2 border border-[#C4A26A]/40 text-white px-8 py-4 rounded-full text-sm hover:border-[#C4A26A] transition-colors"
          >
            Voir les réalisations
          </a>
        </div>

        <div className="mt-20 pt-10 border-t border-[#C4A26A]/20 grid grid-cols-3 gap-8 max-w-md">
          {[
            { value: '< 2 sem.', label: 'Délai de livraison' },
            { value: '299€', label: 'À partir de' },
            { value: '100%', label: 'Sur-mesure' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl md:text-3xl font-semibold text-[#C4A26A]">{s.value}</p>
              <p className="text-xs text-white/40 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Réalisations ───────────────────────────────────────────── */
function Realisations() {
  return (
    <section id="realisations" className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-[#C4A26A] mb-3">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#090428]">
            Réalisations
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative overflow-hidden rounded-2xl bg-[#F8F5F0] aspect-[4/3]">
            <img
              src="/elles-vitrine.png"
              alt="Site vitrine Elles – Maison de Beauté"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-4 left-4 bg-[#090428] text-white text-xs px-3 py-1.5 rounded-full">
              Site complet
            </div>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-[#C4A26A] mb-4">01</p>
            <h3 className="text-2xl md:text-3xl font-semibold text-[#090428] mb-4">
              Elles — Maison de Beauté
            </h3>
            <p className="text-[#4A4465]/80 leading-relaxed mb-6">
              Site vitrine pour un institut de beauté rennais. Présentation des
              soins, galerie photos, horaires et prise de contact directe.
              Design sobre, mobile first, optimisé pour le référencement local.
            </p>
            <ul className="flex flex-wrap gap-2 mb-8">
              {['Design sur-mesure', 'Mobile first', 'SEO local', 'Galerie photo'].map((tag) => (
                <li
                  key={tag}
                  className="text-xs border border-[#C4A26A]/30 text-[#4A4465] px-3 py-1 rounded-full"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <div className="h-px bg-[#F8F5F0] mb-6" />
            <p className="text-sm text-[#4A4465]/50 italic">
              Institut situé à Rennes · Livré en 10 jours
            </p>
          </div>
        </div>

        <div className="mt-20 border border-dashed border-[#C4A26A]/20 rounded-2xl p-12 text-center">
          <p className="text-[#4A4465]/60 text-sm">D'autres projets arrivent bientôt.</p>
          <p className="text-[#4A4465]/60 text-sm mt-1">
            Vous pouvez être le prochain.{' '}
            <a href="#contact" className="text-[#C4A26A] underline underline-offset-2 hover:text-[#090428] transition-colors">
              Parlons de votre projet →
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── Services ───────────────────────────────────────────────── */
function Services() {
  const services = [
    {
      num: '01',
      title: 'Site Vitrine',
      desc: 'Une page élégante pour présenter votre activité, vos services et vos coordonnées.',
      features: ['Page unique', 'Design sur-mesure', 'Mobile first'],
    },
    {
      num: '02',
      title: 'Site Complet',
      desc: 'Un site multi-pages pour développer votre présence et présenter votre univers.',
      features: ['3 à 5 pages', 'Galerie photo', 'SEO de base'],
      highlight: true,
    },
    {
      num: '03',
      title: 'Maintenance',
      desc: "Je m'occupe des mises à jour pour que votre site reste à jour et performant.",
      features: ['Mises à jour', 'Modifications', 'Support'],
    },
  ]

  return (
    <section id="services" className="py-28 px-6 bg-[#090428]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-[#C4A26A]/80 mb-3">Prestations</p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
            Trois façons de<br />
            <span className="font-semibold">travailler ensemble</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.num}
              className={`p-8 rounded-2xl border transition-colors ${
                s.highlight
                  ? 'bg-white text-[#090428] border-white'
                  : 'bg-white/5 text-white border-white/10 hover:border-[#C4A26A]/30'
              }`}
            >
              <p className={`text-xs tracking-widest font-medium mb-6 ${s.highlight ? 'text-[#C4A26A]' : 'text-[#C4A26A]/60'}`}>
                {s.num}
              </p>
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className={`text-sm leading-relaxed mb-8 ${s.highlight ? 'text-[#4A4465]/80' : 'text-white/50'}`}>
                {s.desc}
              </p>
              <ul className="space-y-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span className={`w-1 h-1 rounded-full ${s.highlight ? 'bg-[#C4A26A]' : 'bg-[#C4A26A]/50'}`} />
                    <span className={s.highlight ? 'text-[#4A4465]' : 'text-white/70'}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-[#C4A26A]/40 text-white text-sm px-7 py-3.5 rounded-full hover:border-[#C4A26A] transition-colors"
          >
            Prendre rendez-vous — c'est gratuit
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── Tarifs ─────────────────────────────────────────────────── */
function Tarifs() {
  const creation = [
    {
      title: 'Vitrine Solo',
      price: '299€',
      popular: false,
      features: [
        'Site 1 – 2 pages',
        'Design professionnel',
        'Intégration prise de RDV',
        'Optimisé mobile',
      ],
    },
    {
      title: 'Site Complet',
      price: '499€',
      popular: true,
      features: [
        '3 à 5 pages',
        'Galerie photo',
        'Formulaire de contact',
        'Optimisation SEO de base',
      ],
    },
  ]

  const maintenance = [
    {
      title: 'Essentiel',
      price: '19€/mois',
      features: ['Mises à jour textes', 'Mises à jour photos', 'Mise à jour horaires'],
    },
    {
      title: 'Sérénité',
      price: '35€/mois',
      features: ["Tout l'Essentiel", 'Petites modif. de design', 'Réponse prioritaire'],
    },
  ]

  return (
    <section id="tarifs" className="py-28 px-6 bg-[#F8F5F0]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-[#C4A26A] mb-3">Tarifs</p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#090428]">
            Des prix clairs,<br />
            <span className="font-semibold">sans surprise</span>
          </h2>
        </div>

        <p className="text-xs tracking-widest uppercase text-[#4A4465]/50 mb-6">01 — Création</p>
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          {creation.map((p) => (
            <div
              key={p.title}
              className={`relative p-8 rounded-2xl border ${
                p.popular
                  ? 'bg-[#090428] text-white border-[#090428]'
                  : 'bg-white text-[#090428] border-white'
              }`}
            >
              {p.popular && (
                <span className="absolute top-6 right-6 text-xs bg-[#C4A26A] text-white px-3 py-1 rounded-full font-medium">
                  Populaire
                </span>
              )}
              <h3 className={`text-xl font-semibold mb-2 ${!p.popular && 'text-[#090428]'}`}>
                {p.title}
              </h3>
              <p className={`text-4xl font-light mb-8 ${p.popular ? 'text-[#C4A26A]' : 'text-[#090428]'}`}>
                {p.price}
              </p>
              <ul className="space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <svg
                      className={`w-4 h-4 mt-0.5 shrink-0 ${p.popular ? 'text-[#C4A26A]' : 'text-[#C4A26A]'}`}
                      viewBox="0 0 16 16" fill="none"
                    >
                      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className={p.popular ? 'text-white/80' : 'text-[#4A4465]'}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl px-6 py-4 text-sm text-[#4A4465]/70 mb-16 text-center border border-[#C4A26A]/20">
          <span className="text-[#C4A26A]">✦</span>{' '}
          Domaine personnalisé et mise en ligne{' '}
          <strong className="text-[#090428]">offerts</strong> pour les deux offres
        </div>

        <p className="text-xs tracking-widest uppercase text-[#4A4465]/50 mb-6">02 — Maintenance mensuelle</p>
        <div className="grid sm:grid-cols-2 gap-6">
          {maintenance.map((m) => (
            <div key={m.title} className="bg-white border border-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-[#090428] mb-2">{m.title}</h3>
              <p className="text-3xl font-light text-[#C4A26A] mb-8">{m.price}</p>
              <ul className="space-y-3">
                {m.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#C4A26A]" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-[#4A4465]">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#090428] text-white text-sm px-8 py-4 rounded-full hover:bg-[#090428]/85 transition-colors"
          >
            Demander un devis gratuit
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── À propos ───────────────────────────────────────────────── */
function Apropos() {
  const atouts = [
    { num: '01', title: 'Présence locale', desc: 'Basé à Rennes, je rencontre mes clients en personne.' },
    { num: '02', title: 'Livraison rapide', desc: 'Votre site en ligne en moins de 2 semaines.' },
    { num: '03', title: 'Tarifs accessibles', desc: 'Pensés pour les petits pros, sans rogner sur la qualité.' },
    { num: '04', title: 'Suivi personnalisé', desc: 'Un interlocuteur unique, du devis à la mise en ligne.' },
  ]

  return (
    <section id="apropos" className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#F8F5F0]">
              <img
                src="/pdp.jpeg"
                alt="Hamaury Walter — WALTER Studio"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement.classList.add('flex', 'items-center', 'justify-center')
                  const p = document.createElement('p')
                  p.textContent = 'Ajoutez votre photo ici (public/walter.jpg)'
                  p.className = 'text-gray-400 text-sm text-center px-4'
                  e.currentTarget.parentElement.appendChild(p)
                }}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-[#C4A26A] text-white px-5 py-3 rounded-xl text-sm font-medium">
              Basé à Rennes 📍
            </div>
          </div>

          <div className="pt-4">
            <p className="text-xs tracking-widest uppercase text-[#C4A26A] mb-3">À propos</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#090428] mb-6">
              Un freelance,<br />
              <span className="font-semibold">pas une agence</span>
            </h2>
            <p className="text-[#4A4465]/80 leading-relaxed mb-4">
              Je suis Hamaury Walter, freelance à Rennes. Je crée des sites web
              modernes en m'appuyant sur des outils IA pour livrer plus vite, à
              un prix juste, sans intermédiaires.
            </p>
            <p className="text-[#4A4465]/80 leading-relaxed mb-12">
              Je cible les artisans, coiffeurs, esthéticiennes et professionnels
              locaux qui n'ont pas encore de site — ou qui méritent mieux que
              ce qu'ils ont.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {atouts.map((a) => (
                <div key={a.num} className="border-t border-[#F8F5F0] pt-5">
                  <p className="text-xs text-[#C4A26A] font-medium mb-2">{a.num}</p>
                  <p className="text-sm font-semibold text-[#090428] mb-1">{a.title}</p>
                  <p className="text-sm text-[#4A4465]/70 leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[#C4A26A] text-sm font-medium hover:text-[#090428] transition-colors"
              >
                Prendre un appel découverte →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Méthode ────────────────────────────────────────────────── */
function Methode() {
  const etapes = [
    {
      num: '01',
      title: 'Échange découverte',
      desc: 'On discute de votre activité, vos besoins et vos envies. Gratuit, sans engagement.',
    },
    {
      num: '02',
      title: 'Devis & maquette',
      desc: 'Je vous propose une direction visuelle et un devis clair sous 24h.',
    },
    {
      num: '03',
      title: 'Création express',
      desc: "Je conçois votre site avec l'IA et un soin manuel. Vous suivez l'avancée en direct.",
    },
    {
      num: '04',
      title: 'Mise en ligne',
      desc: "Domaine, hébergement, mise en ligne : je m'occupe de tout. Visible en moins de 2 semaines.",
    },
  ]

  return (
    <section className="py-28 px-6 bg-[#F8F5F0]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-[#C4A26A] mb-3">Méthode</p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#090428]">
            De l'idée au site,<br />
            <span className="font-semibold">en 4 étapes</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {etapes.map((e, i) => (
            <div key={e.num} className="relative">
              {i < etapes.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(100%+12px)] w-[calc(100%-24px)] h-px bg-[#C4A26A]/20 z-10 pointer-events-none" />
              )}
              <div className="bg-white rounded-2xl p-7 h-full border border-white">
                <p className="text-3xl font-light text-[#C4A26A]/30 mb-6">{e.num}</p>
                <h3 className="text-base font-semibold text-[#090428] mb-3">{e.title}</h3>
                <p className="text-sm text-[#4A4465]/70 leading-relaxed">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Contact ────────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', tel: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      await emailjs.send(
        'service_bp6mu9b',
        'template_tssg0zr',
        { name: form.name, email: form.email, tel: form.tel, message: form.message },
        '5SBrP57uZX8ptAwJW'
      )
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-28 px-6 bg-[#090428]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="text-xs tracking-widest uppercase text-[#C4A26A]/80 mb-3">Contact</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6">
              On démarre<br />
              <span className="font-semibold">votre projet ?</span>
            </h2>
            <p className="text-white/50 leading-relaxed mb-12">
              Décrivez-moi votre activité en quelques mots. Je vous réponds
              sous 24h avec un devis clair et une première idée visuelle.
              C'est gratuit, sans engagement.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#C4A26A]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#C4A26A]/70" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4l6 4 6-4M2 4h12v9H2V4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <a href="mailto:hamaury.walter@icloud.com" className="text-white/70 text-sm hover:text-white transition-colors">
                  hamaury.walter@icloud.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#C4A26A]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#C4A26A]/70" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.5A4.5 4.5 0 0 0 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5A4.5 4.5 0 0 0 8 1.5zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" stroke="currentColor" strokeWidth="1.2"/>
                  </svg>
                </div>
                <span className="text-white/70 text-sm">Rennes, Bretagne</span>
              </div>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="bg-white/5 border border-[#C4A26A]/20 rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center">
                <p className="text-[#C4A26A] text-xl font-light mb-2">Message envoyé !</p>
                <p className="text-white/50 text-sm">Je vous réponds dans les 24h.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Votre nom"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-xl px-5 py-4 text-sm outline-none focus:border-[#C4A26A]/50 transition-colors"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Votre email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-xl px-5 py-4 text-sm outline-none focus:border-[#C4A26A]/50 transition-colors"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Téléphone (optionnel)"
                  value={form.tel}
                  onChange={(e) => setForm({ ...form, tel: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-xl px-5 py-4 text-sm outline-none focus:border-[#C4A26A]/50 transition-colors"
                />
                <textarea
                  required
                  rows={5}
                  placeholder="Décrivez votre activité et ce que vous recherchez..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-xl px-5 py-4 text-sm outline-none focus:border-[#C4A26A]/50 transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C4A26A] text-white text-sm font-medium py-4 rounded-xl hover:bg-[#C4A26A]/85 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Envoi en cours…' : "Envoyer ma demande — c'est gratuit"}
                </button>
                {error && (
                  <p className="text-red-400 text-xs text-center">
                    Une erreur est survenue. Réessaie ou écris-moi directement par email.
                  </p>
                )}
                <p className="text-xs text-white/30 text-center">
                  Réponse sous 24h · Sans engagement
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#090428] border-t border-[#C4A26A]/10 px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/60 text-sm">
          © {new Date().getFullYear()}{' '}
          <span className="text-[#C4A26A]">WALTER Studio</span> · Rennes
        </p>
        <p className="text-white/30 text-xs">
          Sites web sur-mesure pour les professionnels locaux
        </p>
      </div>
    </footer>
  )
}

/* ─── App ────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Realisations />
      <Services />
      <Tarifs />
      <Apropos />
      <Methode />
      <Contact />
      <Footer />
    </div>
  )
}
