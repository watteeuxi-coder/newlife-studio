import Image from 'next/image'

interface Props {
  title: string
  /** Métier et fonctionnalités, repris dans le texte alternatif */
  cat?: string
  image?: string
  bg: string
  sizes?: string
}

/** Capture d'un site dans un cadre de navigateur (placeholder dégradé si pas d'image). */
export default function ProjectShot({ title, cat, image, bg, sizes = '(min-width: 768px) 33vw, 100vw' }: Props) {
  return (
    <div className="rounded-lg overflow-hidden border border-line h-full flex flex-col">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-line shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-line-strong" />
        <span className="w-2.5 h-2.5 rounded-full bg-line-strong" />
        <span className="w-2.5 h-2.5 rounded-full bg-line-strong" />
      </div>
      <div className="relative flex-1 overflow-hidden bg-night">
        {image ? (
          <Image
            src={image}
            alt={`Page d’accueil du site de démo ${title}${cat ? ` (${cat.replace(' · ', ', ')})` : ''}`}
            fill
            loading="lazy"
            sizes={sizes}
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: bg }}
          >
            <span className="text-4xl font-bold text-text-base/15">{title.charAt(0)}</span>
          </div>
        )}
      </div>
    </div>
  )
}
