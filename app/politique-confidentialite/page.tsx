import Link from 'next/link'
import PagePending from '@/components/layout/PagePending'
import { TextPage, TextBlock } from '@/components/layout/TextPage'
import ProtectedEmail from '@/components/ui/ProtectedEmail'
import { LEGAL, LEGAL_UPDATED, PRIVACY, formatDateFr, privacyReady } from '@/lib/content'
import { PHONE, telLink } from '@/lib/config'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Politique de confidentialité',
  description:
    'Politique de confidentialité de NEWLIFE STUDIO à Rouen : données du formulaire de contact, finalités, sous-traitants, durée de conservation et tes droits RGPD.',
  path: '/politique-confidentialite',
  noindex: !privacyReady(),
})

/*
 * Services réellement utilisés par le site (vérifié dans le code le 2026-11-24) :
 * - Hébergement : Vercel (vercel.json) — pages et route API /api/contact
 * - Envoi des emails du formulaire : Resend (app/api/contact/route.ts), reçus sur une boîte Gmail (SITE_CONFIG.email)
 * - Anti-spam : champ piège (honeypot) dans le formulaire, aucun service tiers
 * - Polices : servies par le site lui-même (next/font + fichier local), aucune requête vers Google Fonts
 * - Pas de base de données, pas de mesure d'audience, pas de cookie, pas de stockage local
 * Ajouter un service (analytics, captcha, pixel…) = mettre cette page à jour.
 */
export default function PolitiqueConfidentialitePage() {
  if (!privacyReady()) return <PagePending title="Politique de confidentialité" />

  const { editeur } = LEGAL
  const [user, domain] = editeur.email.split('@')
  const email = <ProtectedEmail user={user} domain={domain} />

  return (
    <TextPage title="Politique de confidentialité" intro="Ce que je fais des informations que tu m’envoies, en clair.">
      <TextBlock title="1. Responsable du traitement">
        <p>
          {editeur.nom}, {editeur.statut}, nom commercial {editeur.nomCommercial}
          <br />
          {editeur.adresse}
          <br />
          SIREN {editeur.siren} – {editeur.rcs}
        </p>
        <p>
          Email : {email}
          <br />
          Téléphone : <a href={telLink()}>{PHONE.display}</a>
        </p>
      </TextBlock>

      <TextBlock title="2. Données collectées et finalités">
        <p>Je collecte des données uniquement quand tu remplis le formulaire de contact :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>ton nom ;</li>
          <li>ton email ou ton numéro de téléphone (celui que tu choisis de laisser) ;</li>
          <li>la formule qui t&rsquo;intéresse ;</li>
          <li>ton message.</li>
        </ul>
        <p>
          Elles servent seulement à répondre à ta demande, à te recontacter et, si tu le souhaites, à préparer ton
          devis. Je ne les vends pas, je ne les utilise pas pour de la publicité et je ne t&rsquo;inscris à aucune
          newsletter.
        </p>
        <p>
          Si tu m&rsquo;écris directement sur WhatsApp ou par email, l&rsquo;échange passe par ces services et suit
          aussi leurs propres règles.
        </p>
      </TextBlock>

      <TextBlock title="3. Base légale">
        <p>
          Ton <strong className="font-semibold text-text-base">consentement</strong> : tu choisis d&rsquo;envoyer le
          formulaire. Et les <strong className="font-semibold text-text-base">mesures précontractuelles</strong> prises
          à ta demande : répondre à tes questions et préparer un devis avant un éventuel contrat.
        </p>
      </TextBlock>

      <TextBlock title="4. Sous-traitants et destinataires">
        <p>Tes données ne sont lues que par moi. Pour faire fonctionner le site, je passe par :</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="font-semibold text-text-base">Vercel Inc.</strong> (États-Unis) : héberge le site et
            fait transiter le formulaire.
          </li>
          <li>
            <strong className="font-semibold text-text-base">Resend</strong> (États-Unis) : m&rsquo;envoie ton
            message par email.
          </li>
          <li>
            <strong className="font-semibold text-text-base">Google</strong> (Gmail) : la boîte mail où je reçois ton
            message.
          </li>
        </ul>
        <p>
          Ces services peuvent traiter des données aux États-Unis, donc hors de l&rsquo;Union européenne. Ces
          transferts sont encadrés par le Data Privacy Framework UE–États-Unis (décision d&rsquo;adéquation de la
          Commission européenne), auquel ces entreprises sont certifiées, et par les clauses contractuelles types de
          la Commission européenne.
        </p>
      </TextBlock>

      <TextBlock title="5. Cookies et mesure d’audience">
        <p>
          Ce site ne dépose aucun cookie : pas de mesure d&rsquo;audience, pas de publicité, pas de pixel de réseau
          social. Les polices sont servies par le site lui-même, sans appel à un service externe. C&rsquo;est pour ça
          qu&rsquo;aucun bandeau de cookies ne s&rsquo;affiche : il n&rsquo;y a rien à accepter.
        </p>
        <p>
          Le formulaire est protégé contre le spam par un simple champ invisible, sans service tiers ni suivi.
        </p>
      </TextBlock>

      <TextBlock title="6. Durée de conservation">
        <p>{PRIVACY.conservation}</p>
      </TextBlock>

      <TextBlock title="7. Tes droits">
        <p>Conformément au RGPD, tu peux à tout moment :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>accéder à tes données ;</li>
          <li>les faire rectifier ;</li>
          <li>les faire effacer ;</li>
          <li>t&rsquo;opposer à leur traitement ;</li>
          <li>en demander la limitation ;</li>
          <li>les récupérer dans un format lisible (portabilité) ;</li>
          <li>retirer ton consentement.</li>
        </ul>
        <p>Écris-moi simplement à {email}, je te réponds sous un mois au plus tard.</p>
        <p>
          Si tu estimes que tes droits ne sont pas respectés, tu peux adresser une réclamation à la CNIL :{' '}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            cnil.fr<span className="sr-only"> (nouvel onglet)</span>
          </a>
          .
        </p>
      </TextBlock>

      <p className="text-sm text-text-muted">
        Dernière mise à jour : <time dateTime={LEGAL_UPDATED}>{formatDateFr(LEGAL_UPDATED)}</time>
        <br />
        Voir aussi les <Link href="/mentions-legales" className="text-accent hover:text-accent-bright">mentions légales</Link>.
      </p>
    </TextPage>
  )
}
