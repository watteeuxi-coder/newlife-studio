import { ImageResponse } from 'next/og'

export const alt = 'NEWLIFE STUDIO — Une nouvelle vie pour ton business en ligne'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Thème clair (palette validée) : fond #FAFAF7, texte #0B1220, accent #0E7490, cyan d'identité #22D3EE en déco.
// Pas de police manuscrite ici (pas de fichier de police dans le projet) : « nouvelle vie » en accent + surlignage cyan.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FAFAF7',
          backgroundImage:
            'radial-gradient(circle at 88% 8%, rgba(34,211,238,0.18), transparent 40%), radial-gradient(circle at 10% 95%, rgba(34,211,238,0.10), transparent 40%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 36 }}>
          <svg width="62" height="58" viewBox="18 16 56 52">
            <path d="M24 62V24l36 38V30" fill="none" stroke="#0B1220" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M52 30l8-8 8 8" fill="none" stroke="#06b6d4" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ display: 'flex', fontSize: 40, letterSpacing: 2 }}>
            <span style={{ color: '#0B1220', fontWeight: 700 }}>NEWLIFE</span>
            <span style={{ color: '#3D4A5C', fontWeight: 400, marginLeft: 12 }}>STUDIO</span>
          </div>
        </div>

        {/* Petit texte */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#0E7490',
            marginBottom: 24,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#22D3EE' }} />
          Studio web · Rouen et alentours
        </div>

        {/* Slogan */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 72, fontWeight: 700, lineHeight: 1.15, color: '#0B1220' }}>
            <span>Une</span>
            <span
              style={{
                color: '#0E7490',
                padding: '0 10px',
                backgroundImage: 'linear-gradient(to bottom, transparent 62%, rgba(34,211,238,0.35) 62%)',
              }}
            >
              nouvelle vie
            </span>
          </div>
          <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, lineHeight: 1.15, color: '#0B1220' }}>
            pour ton business en ligne
          </div>
        </div>
      </div>
    ),
    size
  )
}
