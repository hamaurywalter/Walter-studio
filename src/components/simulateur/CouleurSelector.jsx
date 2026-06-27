import { useRef } from 'react'

const COULEURS = [
  '#1E3A5F', '#2D6A4F', '#C0392B', '#E67E22', '#6C3483',
  '#D4AC0D', '#C2185B', '#455A64', '#0288D1', '#5D4037',
]

export default function CouleurSelector({ label, value, onChange }) {
  const pickerRef = useRef(null)

  return (
    <div>
      <p style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: '#aaa', marginBottom: 10,
      }}>
        {label}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        {COULEURS.map(c => (
          <button
            key={c}
            onClick={() => onChange(c)}
            title={c}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              border: 'none', cursor: 'pointer',
              background: c,
              outline: value === c ? `3px solid ${c}` : '2px solid transparent',
              outlineOffset: 2,
              transform: value === c ? 'scale(1.18)' : 'scale(1)',
              transition: 'transform 0.12s, outline 0.12s',
            }}
          />
        ))}

        {/* Picker personnalisé */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => pickerRef.current?.click()}
            title="Couleur personnalisée"
            style={{
              width: 32, height: 32, borderRadius: '50%',
              border: '2px dashed #ccc', cursor: 'pointer',
              background: '#fff', fontSize: 17, color: '#bbb',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            +
          </button>
          <input
            ref={pickerRef}
            type="color"
            value={value}
            onChange={e => onChange(e.target.value)}
            style={{
              position: 'absolute', opacity: 0,
              width: 0, height: 0, top: 0, left: 0,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </div>
  )
}
