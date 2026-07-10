import { Link } from 'react-router-dom'
import { Navbar, Footer } from '../App.jsx'
import { useSEO } from '../hooks/useSEO'

export default function CguPage() {
  useSEO({
    title:       `Conditions Générales d'Utilisation – WALTER Studio`,
    description: `Conditions générales d'utilisation du site walter-studio.fr — accès, propriété intellectuelle, données personnelles et droit applicable.`,
    canonical:   'https://walter-studio.fr/cgu',
  })

  return (
    <div className="min-h-screen flex flex-col bg-craie">
      <Navbar solid />

      <main className="flex-1 pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">

          <p className="font-util text-xs tracking-widest uppercase text-laiton mb-4">Légal</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-minuit mb-10">
            Conditions Générales d'Utilisation
          </h1>

          <div className="prose-legal">

            <p>Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») définissent les modalités d'accès et d'utilisation du site <strong>walter-studio.fr</strong> (ci-après « le Site »), édité par <strong>WALTER Studio</strong>. En accédant au Site, l'utilisateur accepte sans réserve les présentes CGU.</p>

            <h2>Article 1 — Éditeur et mentions légales</h2>
            <p>Le Site est édité par <strong>WALTER Studio</strong>, dont le contact est joignable à l'adresse <a href="mailto:contact@walter-studio.fr">contact@walter-studio.fr</a>.</p>
            <blockquote>
              <strong>Mentions légales en cours de rédaction.</strong> Les mentions légales complètes (identité et statut juridique de l'éditeur, numéro d'immatriculation, coordonnées de l'hébergeur, directeur de la publication) sont en cours de création et seront disponibles sur cette page dans moins d'un mois, à l'issue de l'immatriculation de WALTER Studio.
            </blockquote>

            <h2>Article 2 — Objet</h2>
            <p>Le Site a pour objet de présenter les services de création de sites internet proposés par WALTER Studio, et de permettre aux visiteurs de prendre contact ou de solliciter un devis. Il s'agit d'un site vitrine : aucune vente ni transaction financière n'est réalisée directement sur le Site.</p>

            <h2>Article 3 — Accès au Site</h2>
            <p>Le Site est accessible gratuitement à tout utilisateur disposant d'un accès à internet. Les frais liés à cet accès (matériel, connexion) sont à la charge de l'utilisateur.</p>
            <p>WALTER Studio s'efforce d'assurer la disponibilité du Site, sans y être tenu. L'accès peut être interrompu, notamment pour maintenance, mise à jour ou pour des raisons techniques indépendantes de sa volonté, sans que sa responsabilité puisse être engagée.</p>

            <h2>Article 4 — Propriété intellectuelle</h2>
            <p>L'ensemble des contenus du Site (structure, textes, visuels, logo, charte graphique, code source) est protégé par le droit de la propriété intellectuelle et demeure la propriété exclusive de WALTER Studio, sauf mention contraire. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable, est interdite.</p>

            <h2>Article 5 — Comportement de l'utilisateur</h2>
            <p>L'utilisateur s'engage à faire un usage du Site conforme à la loi et aux présentes CGU. Il s'interdit notamment toute tentative de perturbation du fonctionnement du Site, d'accès non autorisé à ses systèmes, ou d'extraction non autorisée de ses contenus.</p>

            <h2>Article 6 — Formulaires de contact et de devis</h2>
            <p>Le Site met à disposition des formulaires de contact et de devis. Les informations transmises via ces formulaires sont acheminées au moyen du service tiers <strong>EmailJS</strong>. L'utilisateur s'engage à fournir des informations exactes. Le traitement de ces données est décrit à l'article 8 des présentes CGU et dans la <Link to="/confidentialite">Politique de confidentialité</Link>.</p>

            <h2>Article 7 — Liens et services tiers</h2>
            <p>Le Site peut contenir des liens vers des sites tiers ou intégrer des services fournis par des tiers. WALTER Studio n'exerce aucun contrôle sur ces ressources externes et décline toute responsabilité quant à leur contenu ou leur fonctionnement.</p>

            <h2>Article 8 — Données personnelles</h2>
            <p>Les seules données personnelles collectées sur le Site le sont via les formulaires de contact et de devis. Il s'agit des informations que l'utilisateur transmet volontairement : nom, adresse e-mail, numéro de téléphone et contenu de sa demande.</p>
            <p><strong>Finalité</strong> : ces données sont utilisées uniquement pour répondre aux demandes de l'utilisateur et établir, le cas échéant, un devis. Elles ne font l'objet d'aucune cession à des tiers à des fins commerciales.</p>
            <p><strong>Sous-traitant technique</strong> : l'acheminement des messages issus des formulaires est assuré par le service tiers <strong>EmailJS</strong>, dont les serveurs peuvent être situés en dehors de l'Union européenne. Cette transmission est limitée à ce qui est nécessaire au traitement de la demande.</p>
            <p><strong>Conservation</strong> : les données de prospection sont conservées 2 ans à compter du dernier contact ; les modalités complètes figurent dans la <Link to="/confidentialite">Politique de confidentialité</Link>.</p>
            <p><strong>Droits</strong> : conformément au RGPD, l'utilisateur dispose d'un droit d'accès, de rectification, d'opposition, de limitation et de suppression de ses données, ainsi que du droit d'introduire une réclamation auprès de la CNIL. Ces droits s'exercent à l'adresse <a href="mailto:contact@walter-studio.fr">contact@walter-studio.fr</a>.</p>
            <p>Le Site ne dépose pas de cookies à des fins publicitaires ou de suivi.</p>

            <h2>Article 9 — Responsabilité</h2>
            <p>Les informations présentées sur le Site le sont à titre indicatif et peuvent être modifiées à tout moment. WALTER Studio ne saurait être tenu responsable des dommages, directs ou indirects, résultant de l'accès au Site ou de son utilisation, notamment en cas de bug, d'incompatibilité matérielle ou de contenu fourni par un tiers.</p>

            <h2>Article 10 — Modification des CGU</h2>
            <p>WALTER Studio se réserve le droit de modifier les présentes CGU à tout moment. Les CGU applicables sont celles en vigueur à la date de consultation du Site par l'utilisateur.</p>

            <h2>Article 11 — Droit applicable</h2>
            <p>Les présentes CGU sont soumises au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français sont seuls compétents.</p>

            <p className="text-sm text-minuit/35 mt-10 pt-6 border-t border-minuit/10">Dernière mise à jour : 10/07/2026</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
