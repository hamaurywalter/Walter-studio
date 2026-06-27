const FORMULES = [
  { id: 'essentiel', label: 'Essentiel', prix: 299, desc: 'Hero + services + infos'          },
  { id: 'pro',       label: 'Pro',       prix: 490, desc: 'Hero + 4 sections + formulaire', badge: 'La plus choisie' },
  { id: 'premium',   label: 'Premium',   prix: 790, desc: 'Tout + RDV + SEO avancé'         },
]

const NAVY = '#0D1033'
const GOLD = '#C9A84C'

export default function FormuleSelector({ value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {FORMULES.map(f => {
        const active = value === f.id
        return (
          <button
            key={f.id}
            onClick={() => onChange(f.id)}
            style={{
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px', marginTop: f.badge ? 10 : 0,
              border: `1.5px solid ${active ? NAVY : '#e5e7eb'}`,
              borderRadius: 14, cursor: 'pointer', textAlign: 'left',
              background: active ? NAVY : '#fff',
              transition: 'all 0.15s',
            }}>
            {f.badge && (
              <span style={{
                position: 'absolute', top: -11, left: 12,
                background: GOLD, color: '#fff',
                fontSize: 10, fontWeight: 800, letterSpacing: '0.04em',
                padding: '3px 9px', borderRadius: 99,
              }}>
                {f.badge}
              </span>
            )}
            <div>
              <p style={{
                fontSize: 14, fontWeight: 700, margin: '0 0 3px',
                color: active ? '#fff' : NAVY,
              }}>
                {f.label}
              </p>
              <p style={{
                fontSize: 12, margin: 0,
                color: active ? 'rgba(255,255,255,0.5)' : '#999',
              }}>
                {f.desc}
              </p>
            </div>
            <span style={{
              fontSize: 20, fontWeight: 800, color: GOLD,
              marginLeft: 12, flexShrink: 0,
            }}>
              {f.prix}€
            </span>
          </button>
        )
      })}
    </div>
  )
}
