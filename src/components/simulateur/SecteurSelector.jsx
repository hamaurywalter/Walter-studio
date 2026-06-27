const SECTEURS = [
  { id: 'coiffeur',   icon: '✂️',  label: 'Coiffeur / Institut' },
  { id: 'garagiste',  icon: '🔧',  label: 'Garagiste'           },
  { id: 'artisan',    icon: '⚡',  label: 'Artisan'              },
  { id: 'restaurant', icon: '🍽️', label: 'Restaurant / Café'    },
  { id: 'btp',        icon: '🏗️', label: 'BTP / Construction'   },
  { id: 'commerce',   icon: '🛍️', label: 'Commerce'             },
]

const NAVY = '#0D1033'

export default function SecteurSelector({ value, onChange }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      {SECTEURS.map(s => {
        const active = value === s.id
        return (
          <button
            key={s.id}
            onClick={() => onChange(s.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 12px',
              border: `1.5px solid ${active ? NAVY : '#e5e7eb'}`,
              borderRadius: 12,
              cursor: 'pointer',
              textAlign: 'left',
              background: active ? NAVY : '#fff',
              transition: 'all 0.15s',
            }}>
            <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{s.icon}</span>
            <span style={{
              fontSize: 12, fontWeight: 600, lineHeight: 1.3,
              color: active ? '#fff' : '#444',
            }}>
              {s.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
