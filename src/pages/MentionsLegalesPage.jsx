import { Navbar, Footer } from '../App.jsx'
import { useSEO } from '../hooks/useSEO'

export default function MentionsLegalesPage() {
  useSEO({
    title:       'Mentions légales – WALTER Studio',
    description: 'Mentions légales du site walter-studio.fr — éditeur, hébergeur, contact.',
    canonical:   'https://walter-studio.fr/mentions-legales',
  })

  return (
    <div className="min-h-screen flex flex-col bg-craie">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">

          <p className="font-util text-xs tracking-widest uppercase text-laiton mb-4">Légal</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-minuit mb-10">
            Mentions légales
          </h1>

          <div className="bg-white border border-laiton/20 rounded-2xl p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-laiton/10 border border-laiton/25 flex items-center justify-center mx-auto mb-6">
              <svg className="w-5 h-5 text-laiton" viewBox="0 0 24 24" fill="none">
                <path d="M12 8v4m0 4h.01M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-minuit/70 leading-relaxed mb-5">
              Les mentions légales sont en cours de rédaction et seront disponibles ici dans moins d'un mois, à l'issue de l'immatriculation de WALTER Studio.
            </p>
            <p className="text-minuit/50 text-sm">
              Pour toute demande :{' '}
              <a href="mailto:contact@walter-studio.fr" className="text-laiton hover:underline transition-colors">
                contact@walter-studio.fr
              </a>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
