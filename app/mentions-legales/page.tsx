import Link from 'next/link'
import PagePending from '@/components/layout/PagePending'
import { TextPage, TextBlock } from '@/components/layout/TextPage'
import ProtectedEmail from '@/components/ui/ProtectedEmail'
import { LEGAL, LEGAL_UPDATED, formatDateFr, legalReady } from '@/lib/content'
import { PHONE, telLink } from '@/lib/config'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Mentions légales',
  description:
    'Mentions légales de NEWLIFE STUDIO, création de sites web à Rouen et alentours : éditeur du site, SIREN, hébergeur, propriété intellectuelle, droit applicable.',
  path: '/mentions-legales',
  noindex: !legalReady(),
})

export default function MentionsLegalesPage() {
  if (!legalReady()) return <PagePending title="Mentions légales" />

  const { editeur, hebergeur } = LEGAL
  const [user, domain] = editeur.email.split('@')

  return (
    <TextPage title="Mentions légales">
      <TextBlock title="Éditeur du site">
        <p>
          {editeur.nom}, {editeur.statut}
          <br />
          Nom commercial : {editeur.nomCommercial}
          <br />
          {editeur.adresse}
        </p>
        <p>
          SIREN {editeur.siren} – {editeur.rcs}
          <br />
          {editeur.tva}
        </p>
        <p>
          Email : <ProtectedEmail user={user} domain={domain} />
          <br />
          Téléphone : <a href={telLink()}>{PHONE.display}</a>
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
          <a href={hebergeur.site} target="_blank" rel="noopener noreferrer">
            {hebergeur.site.replace('https://', '')}
            <span className="sr-only"> (nouvel onglet)</span>
          </a>
        </p>
      </TextBlock>

      <TextBlock title="Propriété intellectuelle">
        <p>
          Les textes, visuels, le logo et le code de ce site appartiennent à {editeur.nomCommercial}, sauf mention
          contraire. Toute reproduction, totale ou partielle, sans mon autorisation écrite est interdite.
        </p>
        <p>
          Les sites présentés dans « Concepts » sont des démonstrations que j&rsquo;ai créées : leurs contenus sont
          fictifs. Les composants open source utilisés restent la propriété de leurs auteurs, sous leur licence.
        </p>
      </TextBlock>

      <TextBlock title="Limitation de responsabilité">
        <p>
          Je fais de mon mieux pour que les informations de ce site soient exactes et à jour, sans pouvoir garantir
          qu&rsquo;elles soient complètes ou exemptes d&rsquo;erreur. Les tarifs affichés sont des prix « à partir
          de » : seul le devis fait foi.
        </p>
        <p>
          Le site contient des liens vers d&rsquo;autres sites (WhatsApp, Instagram, TikTok, démos…). Je ne contrôle
          pas leur contenu et ne peux pas en être tenu responsable.
        </p>
      </TextBlock>

      <TextBlock title="Médiation de la consommation">
        <p>{LEGAL.mediation}</p>
      </TextBlock>

      <TextBlock title="Droit applicable">
        <p>
          Ce site et les présentes mentions sont soumis au droit français. En cas de litige, et à défaut de
          solution amiable, les tribunaux français sont compétents.
        </p>
      </TextBlock>

      <TextBlock title="Données personnelles">
        <p>
          Pour savoir ce que je fais des informations que tu m&rsquo;envoies, lis la{' '}
          <Link href="/politique-confidentialite">politique de confidentialité</Link>.
        </p>
      </TextBlock>

      <p className="text-sm text-text-muted">
        Dernière mise à jour : <time dateTime={LEGAL_UPDATED}>{formatDateFr(LEGAL_UPDATED)}</time>
      </p>
    </TextPage>
  )
}
