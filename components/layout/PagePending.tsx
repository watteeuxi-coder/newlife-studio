/** Page dont le texte n'est pas encore fourni : on n'invente rien, on l'annonce. */
export default function PagePending({ title }: { title: string }) {
  return (
    <section>
      <div className="wrap">
        <div className="section-head">
          <h1>{title}</h1>
          <p>Page en préparation.</p>
        </div>
      </div>
    </section>
  )
}
