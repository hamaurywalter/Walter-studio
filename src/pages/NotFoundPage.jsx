import { Link } from 'react-router-dom'
import { Navbar, Footer } from '../App.jsx'
import { useSEO } from '../hooks/useSEO'

export default function NotFoundPage() {
  useSEO({
    title:       'Page introuvable – WALTER Studio',
    description: `La page que vous recherchez n'existe pas ou a été déplacée.`,
    canonical:   'https://walter-studio.fr/',
  })

  return (
    <div className="min-h-screen flex flex-col bg-minuit">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 pt-28 pb-20">
        <div className="max-w-lg text-center">
          <p className="font-display font-bold text-laiton leading-none mb-6"
             style={{ fontSize: 'clamp(5rem, 18vw, 9rem)' }}>
            404
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Page introuvable
          </h1>
          <p className="text-brume/70 leading-relaxed mb-10">
            La page que vous recherchez n'existe pas ou a été déplacée.
            Vérifiez l'adresse ou revenez à l'accueil.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-laiton text-minuit text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-laiton/80 transition-colors">
            ← Retour à l'accueil
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
