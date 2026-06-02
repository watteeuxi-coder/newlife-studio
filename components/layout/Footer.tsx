import { waLink } from '@/lib/config'

export default function Footer() {
  const wa = waLink()
  return (
    <footer className="border-t border-white/[0.07] py-10">
      <div className="wrap flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2" aria-label="NEWLIFE STUDIO">
          <span className="w-6 h-6 text-accent">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L12 22M5 9L12 2L19 9" />
              <path d="M5 15L12 22L19 15" opacity={0.5} />
            </svg>
          </span>
          <span className="text-text-base text-sm font-semibold">
            <strong>NEWLIFE</strong>{' '}
            <span className="font-normal text-text-dim">STUDIO</span>
          </span>
        </a>

        <p className="text-text-muted text-xs text-center">
          © 2026 NEWLIFE STUDIO — On donne une nouvelle vie à ton business en ligne.
        </p>

        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted hover:text-accent transition-colors"
          aria-label="WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
