import { Navbar, Footer } from '../App.jsx'
import { useSEO } from '../hooks/useSEO'

export default function ConfidentialitePage() {
  useSEO({
    title:       'Politique de confidentialité – WALTER Studio',
    description: 'Comment WALTER Studio collecte, utilise et protège vos données personnelles, conformément au RGPD.',
    canonical:   'https://walter-studio.fr/confidentialite',
  })

  return (
    <div className="min-h-screen flex flex-col bg-craie">
      <Navbar solid />

      <main className="flex-1 pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">

          <p className="font-util text-xs tracking-widest uppercase text-laiton mb-4">Légal</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-minuit mb-10">
            Politique de Confidentialité
          </h1>

          <div className="prose-legal">

            <p>La présente politique de confidentialité décrit la manière dont <strong>WALTER Studio</strong> (ci-après « nous ») collecte, utilise et protège les données personnelles des utilisateurs du site <strong>walter-studio.fr</strong> (ci-après « le Site »), conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi française « Informatique et Libertés ».</p>

            <h2>1. Responsable du traitement</h2>
            <p>Le responsable du traitement des données est <strong>WALTER Studio</strong>, joignable à l'adresse <a href="mailto:contact@walter-studio.fr">contact@walter-studio.fr</a>.</p>
            <blockquote>
              <strong>Mentions légales en cours de rédaction.</strong> L'identité complète et le statut juridique du responsable du traitement seront précisés dans les mentions légales, en cours de création et disponibles sur le Site dans moins d'un mois, à l'issue de l'immatriculation de WALTER Studio.
            </blockquote>

            <h2>2. Données collectées</h2>
            <p>Nous collectons uniquement les données que la personne nous transmet volontairement, dans deux cadres distincts.</p>
            <p><strong>a) Visiteurs et prospects — via les formulaires de contact et de devis du Site :</strong></p>
            <ul>
              <li>nom ;</li>
              <li>adresse e-mail ;</li>
              <li>numéro de téléphone (facultatif) ;</li>
              <li>contenu de la demande (message, informations sur le projet).</li>
            </ul>
            <p><strong>b) Clients — dans le cadre de la relation contractuelle</strong> (commande d'une prestation régie par nos Conditions Générales de Vente) :</p>
            <ul>
              <li>coordonnées d'identification et de facturation (nom, dénomination, adresse) ;</li>
              <li>éléments nécessaires à l'exécution de la prestation (contenus, textes, images, logos et accès fournis par le Client) ;</li>
              <li>données relatives au suivi de la commande, à la facturation et aux paiements.</li>
            </ul>
            <p>Aucune donnée n'est collectée à l'insu de la personne. Le Site ne pratique aucun profilage ni aucune décision automatisée.</p>

            <h2>3. Finalités et base légale</h2>
            <p>Les données sont utilisées exclusivement pour :</p>
            <ul>
              <li>répondre aux demandes de contact et d'information et établir un devis <em>(base légale : exécution de mesures précontractuelles prises à la demande de la personne — art. 6.1.b du RGPD)</em> ;</li>
              <li>assurer le suivi commercial des prospects <em>(base légale : intérêt légitime de WALTER Studio à répondre à ses prospects)</em> ;</li>
              <li>exécuter la prestation commandée et gérer la relation client <em>(base légale : exécution du contrat — art. 6.1.b du RGPD)</em> ;</li>
              <li>respecter nos obligations légales, notamment comptables et fiscales, liées à la facturation <em>(base légale : obligation légale — art. 6.1.c du RGPD)</em>.</li>
            </ul>

            <h2>4. Destinataires et sous-traitant</h2>
            <p>Les données ne sont <strong>jamais cédées, vendues ou louées</strong> à des tiers à des fins commerciales.</p>
            <p>Seul WALTER Studio a accès aux données transmises. L'acheminement technique des messages issus des formulaires est assuré par le sous-traitant <strong>EmailJS</strong>, agissant uniquement pour transmettre les demandes.</p>

            <h2>5. Transfert hors Union européenne</h2>
            <p>Le service <strong>EmailJS</strong> peut héberger ou faire transiter des données sur des serveurs situés en dehors de l'Union européenne. Ce transfert est limité à ce qui est strictement nécessaire à l'acheminement de la demande de l'utilisateur. Nous veillons à recourir à des prestataires présentant des garanties appropriées conformément au RGPD.</p>

            <h2>6. Durée de conservation</h2>
            <p>Les données sont conservées selon leur nature :</p>
            <ul>
              <li><strong>Données de prospection (formulaires de contact et de devis)</strong> : conservées pendant une durée maximale de <strong>2 ans à compter du dernier contact</strong>, sauf relation commerciale en cours, puis supprimées.</li>
              <li><strong>Données clients et pièces liées à l'exécution du contrat</strong> : conservées le temps de la relation commerciale.</li>
              <li><strong>Factures et pièces comptables</strong> : conservées <strong>10 ans</strong>, conformément à nos obligations légales (article L123-22 du Code de commerce).</li>
            </ul>

            <h2>7. Cookies</h2>
            <p>Le Site <strong>ne dépose aucun cookie</strong> à des fins publicitaires ou de suivi, et n'utilise pas d'outil de mesure d'audience. Seuls d'éventuels éléments techniques strictement nécessaires au fonctionnement du Site peuvent être utilisés, sans collecte de données personnelles à des fins de traçage.</p>

            <h2>8. Sécurité</h2>
            <p>Nous mettons en œuvre des mesures raisonnables pour protéger les données contre tout accès, altération ou divulgation non autorisés. L'utilisateur reste toutefois informé qu'aucune transmission de données sur internet ne peut être garantie totalement sécurisée.</p>

            <h2>9. Vos droits</h2>
            <p>Conformément au RGPD, l'utilisateur dispose des droits suivants sur ses données :</p>
            <ul>
              <li>droit d'accès ;</li>
              <li>droit de rectification ;</li>
              <li>droit à l'effacement (« droit à l'oubli ») ;</li>
              <li>droit à la limitation du traitement ;</li>
              <li>droit d'opposition ;</li>
              <li>droit à la portabilité des données.</li>
            </ul>
            <p>Ces droits s'exercent en écrivant à <a href="mailto:contact@walter-studio.fr">contact@walter-studio.fr</a>. Une réponse est apportée dans un délai maximal d'un mois.</p>
            <p>L'utilisateur dispose également du droit d'introduire une réclamation auprès de la <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés — www.cnil.fr) s'il estime que ses droits ne sont pas respectés.</p>

            <h2>10. Modification de la politique</h2>
            <p>La présente politique de confidentialité peut être modifiée à tout moment afin de refléter les évolutions du Site ou de la réglementation. La version applicable est celle en vigueur à la date de consultation.</p>

            <p className="text-sm text-minuit/35 mt-10 pt-6 border-t border-minuit/10">Dernière mise à jour : 10/07/2026</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
