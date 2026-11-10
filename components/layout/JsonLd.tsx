/** Injecte un bloc JSON-LD (données structurées) rendu côté serveur. `<` échappé pour ne jamais fermer la balise. */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
