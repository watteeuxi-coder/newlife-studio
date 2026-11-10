import PagePending from '@/components/layout/PagePending'
import { TextPage, TextBlock } from '@/components/layout/TextPage'
import { LEGAL, legalReady } from '@/lib/content'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Mentions légales',
  description:
    'Mentions légales du site NEWLIFE STUDIO, studio de création de sites web à Rouen et alentours : éditeur du site, hébergement et propriété intellectuelle.',
  path: '/mentions-legales',
  noindex: !legalReady(),
})

export default function MentionsLegalesPage() {
  if (!legalReady()) return <PagePending title="Mentions légales" />

  const { editeur, hebergeur } = LEGAL
  return (
    <TextPage title="Mentions légales">
      <TextBlock title="Éditeur du site">
        <p>
          {editeur.nom} — {editeur.statut}
          <br />
          SIRET : {editeur.siret}
          <br />
          {editeur.adresse}
          <br />
          Email : <a href={`mailto:${editeur.email}`}>{editeur.email}</a>
        </p>
      </TextBlock>
      <TextBlock title="Directeur de la publication">
        <p>{LEGAL.directeurPublication}</p>
      </TextBlock>
      <TextBlock title="Hébergement">
        <p>
          {hebergeur.nom}
          <br />
          {hebergeur.adresse}
          <br />
          <a href={hebergeur.site} target="_blank" rel="noopener noreferrer">{hebergeur.site.replace('https://', '')}</a>
        </p>
      </TextBlock>
      <TextBlock title="Propriété intellectuelle">
        <p>
          Les textes, visuels et le code de ce site appartiennent à NEWLIFE STUDIO, sauf mention contraire.
          Toute reproduction sans autorisation est interdite.
        </p>
      </TextBlock>
    </TextPage>
  )
}
