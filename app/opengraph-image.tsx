import { ImageResponse } from 'next/og'

export const alt = 'NEWLIFE STUDIO — On donne une nouvelle vie à ton business en ligne'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

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
          background: '#05070d',
          backgroundImage:
            'radial-gradient(circle at 20% 10%, rgba(34,211,238,0.16), transparent 45%), radial-gradient(circle at 85% 90%, rgba(34,211,238,0.12), transparent 45%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40 }}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L12 22M5 9L12 2L19 9" />
            <path d="M5 15L12 22L19 15" opacity="0.5" />
          </svg>
          <div style={{ display: 'flex', fontSize: 44, letterSpacing: 2 }}>
            <span style={{ color: '#e9eef7', fontWeight: 700 }}>NEWLIFE</span>
            <span style={{ color: '#aab6cc', fontWeight: 400, marginLeft: 14 }}>STUDIO</span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: 900,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, fontSize: 64, fontWeight: 700, lineHeight: 1.15, color: '#e9eef7' }}>
            <span>On donne une</span>
            <span style={{ color: '#22d3ee' }}>nouvelle vie</span>
          </div>
          <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, lineHeight: 1.15, color: '#e9eef7' }}>
            à ton business en ligne
          </div>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: 16, marginTop: 48 }}>
          {['Dès 299€', 'Livraison 5–10 jours', 'Propulsé par l’IA'].map((label) => (
            <div
              key={label}
              style={{
                display: 'flex',
                padding: '12px 28px',
                borderRadius: 999,
                border: '1px solid rgba(34,211,238,0.35)',
                background: 'rgba(34,211,238,0.08)',
                color: '#7df0ff',
                fontSize: 26,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  )
}
