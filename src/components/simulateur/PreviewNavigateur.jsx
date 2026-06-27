function slugify(str) {
  const s = (str || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return s || 'votre-site'
}

export default function PreviewNavigateur({ iframeRef, src, nom, onLoad }) {
  const domain = `www.${slugify(nom)}.fr`

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', borderRadius: 14, overflow: 'hidden',
      boxShadow: '0 12px 48px rgba(0,0,0,0.22)',
    }}>

      {/* Barre navigateur */}
      <div style={{
        background: '#EBEBEB',
        padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
        flexShrink: 0,
        borderBottom: '1px solid #ddd',
      }}>
        {/* Feux macOS */}
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
        </div>

        {/* Barre URL */}
        <div style={{
          flex: 1, background: '#fff', borderRadius: 7,
          padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 6,
          border: '1px solid #d5d5d5', fontSize: 12, color: '#333',
          overflow: 'hidden',
        }}>
          <span style={{ fontSize: 10, color: '#22a745', flexShrink: 0 }}>🔒</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {domain}
          </span>
        </div>
      </div>

      {/* iframe */}
      <iframe
        ref={iframeRef}
        src={src}
        onLoad={onLoad}
        title="Prévisualisation du site"
        style={{ flex: 1, border: 'none', background: '#fff', display: 'block' }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  )
}
