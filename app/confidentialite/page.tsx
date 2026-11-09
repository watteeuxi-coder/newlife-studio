import PagePending from '@/components/layout/PagePending'
import { TextPage, TextBlock } from '@/components/layout/TextPage'
import { LEGAL, PRIVACY, privacyReady } from '@/lib/content'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Confidentialité',
  description: 'Politique de confidentialité du site NEWLIFE STUDIO.',
  path: '/confidentialite',
  noindex: !privacyReady(),
})

export default function ConfidentialitePage() {
  if (!privacyReady()) return <PagePending title="Confidentialité" />

  const { editeur } = LEGAL
  return (
    <TextPage title="Confidentialité" intro="Ce qu’on fait des informations que tu nous envoies.">
      <TextBlock title="Responsable du traitement">
        <p>
          {editeur.nom} ({editeur.statut}), {editeur.adresse}. Contact :{' '}
          <a href={`mailto:${editeur.email}`}>{editeur.email}</a>
        </p>
      </TextBlock>
      <TextBlock title="Données collectées">
        <p>
          Via le formulaire de contact : ton nom, ton email ou ton téléphone, la formule qui t’intéresse et ton
          message. Rien d’autre.
        </p>
      </TextBlock>
      <TextBlock title="Pourquoi">
        <p>Uniquement pour répondre à ta demande et, si tu le souhaites, préparer ton devis.</p>
      </TextBlock>
      <TextBlock title="Qui y a accès">
        <p>
          NEWLIFE STUDIO uniquement. Les messages du formulaire nous sont transmis par email via le service
          d’envoi Resend. Si tu nous écris sur WhatsApp, l’échange passe par WhatsApp et suit ses propres règles.
        </p>
      </TextBlock>
      <TextBlock title="Combien de temps">
        <p>{PRIVACY.conservation}</p>
      </TextBlock>
      <TextBlock title="Cookies">
        <p>Ce site n’utilise ni cookies de mesure d’audience, ni cookies publicitaires.</p>
      </TextBlock>
      <TextBlock title="Tes droits">
        <p>
          Tu peux demander à consulter, corriger ou supprimer tes données, ou t’opposer à leur utilisation, en
          écrivant à <a href={`mailto:${editeur.email}`}>{editeur.email}</a>. Si tu estimes que tes droits ne sont
          pas respectés, tu peux saisir la CNIL (
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">cnil.fr</a>).
        </p>
      </TextBlock>
    </TextPage>
  )
}
