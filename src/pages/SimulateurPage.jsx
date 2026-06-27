import { useState, useRef, useEffect } from 'react'
import PanneauControle   from '../components/simulateur/PanneauControle.jsx'
import PreviewNavigateur from '../components/simulateur/PreviewNavigateur.jsx'

const SRCS = {
  coiffeur:   '/maquettes/coiffeur.html',
  garagiste:  '/maquettes/garagiste.html',
  artisan:    '/maquettes/artisan.html',
  restaurant: '/maquettes/restaurant.html',
  btp:        '/maquettes/btp.html',
  commerce:   '/maquettes/commerce.html',
}

export default function SimulateurPage() {
  const [config, setConfig] = useState({
    secteur:           'coiffeur',
    formule:           'pro',
    couleurPrincipale: '#8B5CF6',
    couleurAccent:     '#EC4899',
    nom:               '',
  })

  const iframeRef  = useRef(null)
  const readyRef   = useRef(false)
  const configRef  = useRef(config)
  configRef.current = config

  /* Envoyer la config courante à l'iframe */
  function send() {
    try {
      iframeRef.current?.contentWindow?.postMessage(configRef.current, '*')
    } catch {}
  }

  /* Quand des paramètres visuels changent (hors secteur), envoyer si prêt */
  useEffect(() => {
    if (!readyRef.current) return
    const t = setTimeout(send, 80)
    return () => clearTimeout(t)
  }, [config.couleurPrincipale, config.couleurAccent, config.nom, config.formule])

  /* Quand le secteur change, marquer l'iframe comme non prêt */
  useEffect(() => {
    readyRef.current = false
  }, [config.secteur])

  /* L'iframe a fini de charger : envoyer la config */
  function handleLoad() {
    readyRef.current = true
    setTimeout(send, 150)
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F5F6FA' }}>

      {/* Colonne gauche — panneau contrôle */}
      <div style={{
        width: 420, flexShrink: 0,
        height: '100vh', overflowY: 'auto',
        background: '#fff',
        boxShadow: '2px 0 20px rgba(0,0,0,0.07)',
      }}>
        <PanneauControle config={config} setConfig={setConfig} />
      </div>

      {/* Colonne droite — preview */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 24 }}>
        <PreviewNavigateur
          iframeRef={iframeRef}
          src={SRCS[config.secteur]}
          nom={config.nom}
          onLoad={handleLoad}
        />
      </div>

    </div>
  )
}
