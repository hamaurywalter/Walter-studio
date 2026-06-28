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
  const [activeTab, setActiveTab] = useState('controls')
  const [isMobile,  setIsMobile]  = useState(() => window.innerWidth < 768)

  const iframeRef  = useRef(null)
  const readyRef   = useRef(false)
  const configRef  = useRef(config)
  configRef.current = config

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function send() {
    try {
      iframeRef.current?.contentWindow?.postMessage(configRef.current, '*')
    } catch {}
  }

  useEffect(() => {
    if (!readyRef.current) return
    const t = setTimeout(send, 80)
    return () => clearTimeout(t)
  }, [config.couleurPrincipale, config.couleurAccent, config.nom, config.formule])

  useEffect(() => {
    readyRef.current = false
  }, [config.secteur])

  function handleLoad() {
    readyRef.current = true
    setTimeout(send, 150)
  }

  /* ── Desktop : deux colonnes ── */
  if (!isMobile) {
    return (
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F5F6FA' }}>
        <div style={{
          width: 420, flexShrink: 0,
          height: '100vh', overflowY: 'auto',
          background: '#fff',
          boxShadow: '2px 0 20px rgba(0,0,0,0.07)',
        }}>
          <PanneauControle config={config} setConfig={setConfig} />
        </div>
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

  /* ── Mobile : onglets ── */
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#F5F6FA' }}>

      {/* Barre d'onglets */}
      <div style={{
        display: 'flex', flexShrink: 0,
        background: '#fff',
        borderBottom: '1px solid #E5E7EB',
      }}>
        {[
          { key: 'controls', label: 'Personnaliser' },
          { key: 'preview',  label: 'Aperçu' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1, padding: '14px 8px',
              fontSize: 14, fontWeight: 600,
              border: 'none', cursor: 'pointer',
              background: 'transparent',
              color: activeTab === tab.key ? '#0B0530' : '#9CA3AF',
              borderBottom: activeTab === tab.key ? '2px solid #B8924A' : '2px solid transparent',
              transition: 'all 0.2s',
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>

        {/* Panneau contrôle */}
        <div style={{
          position: 'absolute', inset: 0,
          overflowY: 'auto', background: '#fff',
          display: activeTab === 'controls' ? 'block' : 'none',
        }}>
          <PanneauControle config={config} setConfig={setConfig} />
        </div>

        {/* Preview */}
        <div style={{
          position: 'absolute', inset: 0,
          padding: 12,
          display: activeTab === 'preview' ? 'flex' : 'none',
          flexDirection: 'column',
        }}>
          <PreviewNavigateur
            iframeRef={iframeRef}
            src={SRCS[config.secteur]}
            nom={config.nom}
            onLoad={handleLoad}
          />
        </div>
      </div>
    </div>
  )
}
