import { Link } from 'react-router-dom'
import SecteurSelector from './SecteurSelector.jsx'
import FormuleSelector from './FormuleSelector.jsx'
import CouleurSelector from './CouleurSelector.jsx'

const PRIX = { essentiel: 299, pro: 490, premium: 790 }
const GOLD = '#C9A84C'

const Label = ({ children }) => (
  <p style={{
    fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: '#aaa', marginBottom: 10,
  }}>
    {children}
  </p>
)

export default function PanneauControle({ config, setConfig }) {
  const prix = PRIX[config.formule] ?? 490

  return (
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 28, minHeight: '100%' }}>

      {/* Header */}
      <div>
        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          fontSize: 12, color: '#bbb', textDecoration: 'none', marginBottom: 18,
        }}>
          ← Retour au site
        </Link>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: '#0D1033', margin: '0 0 5px', letterSpacing: '-0.5px' }}>
          Choisissez la formule la plus adaptée à votre structure
        </h1>
        <p style={{ fontSize: 13, color: '#999', margin: 0 }}>
          Comprenez la différence entre nos 3 formules
        </p>
      </div>

      {/* Nom */}
      <div>
        <Label>Nom de votre entreprise</Label>
        <input
          type="text"
          value={config.nom}
          onChange={e => setConfig(c => ({ ...c, nom: e.target.value }))}
          placeholder="ex : Garage Martin"
          style={{
            width: '100%', padding: '12px 16px',
            border: '1.5px solid #e5e7eb', borderRadius: 12,
            fontSize: 14, outline: 'none', boxSizing: 'border-box',
            color: '#1a1a2e', fontFamily: 'inherit',
          }}
        />
      </div>

      {/* Secteur */}
      <div>
        <Label>Votre secteur</Label>
        <SecteurSelector
          value={config.secteur}
          onChange={s => setConfig(c => ({ ...c, secteur: s }))}
        />
      </div>

      {/* Formule */}
      <div>
        <Label>Votre formule</Label>
        <FormuleSelector
          value={config.formule}
          onChange={f => setConfig(c => ({ ...c, formule: f }))}
        />
      </div>

      {/* Couleur principale */}
      <CouleurSelector
        label="Couleur principale"
        value={config.couleurPrincipale}
        onChange={v => setConfig(c => ({ ...c, couleurPrincipale: v }))}
      />

      {/* Couleur accent */}
      <CouleurSelector
        label="Couleur accent"
        value={config.couleurAccent}
        onChange={v => setConfig(c => ({ ...c, couleurAccent: v }))}
      />

      {/* Encart informatif */}
      <div style={{
        background: 'rgba(201, 168, 76, 0.10)',
        border: '1.5px solid rgba(201, 168, 76, 0.35)',
        borderLeft: '4px solid #C9A84C',
        borderRadius: 10,
        padding: '18px 16px',
        boxShadow: '0 2px 14px rgba(201, 168, 76, 0.12)',
      }}>
        <p style={{ fontSize: 13, fontWeight: 800, color: '#0D1033', marginBottom: 8, letterSpacing: '-0.2px' }}>
          ✨ Ce que vous voyez est un exemple.
        </p>
        <p style={{ fontSize: 13, color: '#555', lineHeight: 1.65, margin: 0 }}>
          Le site conçu pour vous sera bien plus personnalisé : vos vraies photos, vos couleurs,
          vos sections choisies ensemble, et un contenu rédigé selon votre activité et mes conseils.
          Ce simulateur vous donne une idée du rendu — le résultat final va bien au-delà.
        </p>
      </div>

      {/* CTA */}
      <div style={{ marginTop: 'auto', paddingTop: 8 }}>
        <a
          href="/#simulateur"
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: GOLD, color: '#fff',
            padding: '16px 24px', borderRadius: 99,
            textDecoration: 'none', fontWeight: 800, fontSize: 15,
            boxShadow: `0 4px 16px ${GOLD}55`,
          }}>
          <span>Obtenir mon site personnalisé</span>
          <span>{prix}€</span>
        </a>
        <p style={{ textAlign: 'center', fontSize: 11, color: '#bbb', marginTop: 8 }}>
          Devis gratuit · Livraison en 2 semaines
        </p>
      </div>
    </div>
  )
}
