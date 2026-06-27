export const SECTEURS = [
  {
    id: 'coiffeur',
    label: 'Coiffeur / Institut',
    icon: '✂️',
    heroLayout: 'center-overlay',
    imageKeyword: 'hair+salon+beauty',
    hero: {
      titre: 'Sublimez votre beauté',
      sous: 'Prenez rendez-vous en ligne, rapidement et simplement.',
    },
    services: [
      { icone: '✂️', titre: 'Coupes & Coiffures',    desc: 'Pour femmes, hommes et enfants.' },
      { icone: '💆', titre: 'Soins du visage',        desc: 'Soins personnalisés et relaxants.' },
      { icone: '🎨', titre: 'Colorations & Mèches',  desc: 'Toutes techniques, résultats garantis.' },
    ],
    chiffres: [
      { valeur: '8 ans',  label: "d'expérience" },
      { valeur: '1 200+', label: 'clients satisfaits' },
      { valeur: '100%',   label: 'satisfaction' },
    ],
    temoignages: [
      { texte: 'Coupe parfaite, je repars toujours ravie !',           auteur: 'Sophie R.' },
      { texte: 'Accueil chaleureux et résultat impeccable.',           auteur: 'Camille D.' },
      { texte: 'Ma coiffeuse de confiance depuis 5 ans. Parfaite !',  auteur: 'Julie K.' },
    ],
    apropos: "Notre salon met son expertise au service de votre beauté depuis des années. Une équipe passionnée vous accueille dans un cadre chaleureux et soigné.",
  },
  {
    id: 'garage',
    label: 'Garagiste',
    icon: '🔧',
    heroLayout: 'image-right',
    imageKeyword: 'car+mechanic+garage',
    hero: {
      titre: 'Votre véhicule entre de bonnes mains',
      sous: 'Réparation rapide, devis gratuit, satisfaction garantie.',
    },
    services: [
      { icone: '🔧', titre: 'Révision & Entretien',    desc: 'Vidange, freins, pneumatiques.' },
      { icone: '🚗', titre: 'Carrosserie & Peinture',  desc: 'Remise en état garantie.' },
      { icone: '🔍', titre: 'Diagnostic électronique', desc: 'Lecture de codes erreurs.' },
    ],
    chiffres: [
      { valeur: '15 ans', label: "d'expertise" },
      { valeur: '3 000+', label: 'véhicules réparés' },
      { valeur: '2h',     label: 'délai de devis' },
    ],
    temoignages: [
      { texte: 'Réparation rapide et honnête sur le prix.',   auteur: 'Marc L.' },
      { texte: 'Très professionnel, je recommande vivement.', auteur: 'Pierre V.' },
      { texte: 'Le meilleur garage du secteur, sans hésiter.', auteur: 'Thomas R.' },
    ],
    apropos: "Garage familial depuis 1998, nous intervenons sur tous types de véhicules. Devis gratuit, transparence totale sur les prix.",
  },
  {
    id: 'artisan',
    label: 'Artisan',
    icon: '🔩',
    heroLayout: 'banner-top',
    imageKeyword: 'craftsman+tools+workshop',
    hero: {
      titre: 'Intervention rapide 7j/7',
      sous: "Dépannage, installation, rénovation — on s'occupe de tout.",
    },
    services: [
      { icone: '⚡', titre: 'Dépannage urgent',          desc: 'Intervention le jour même.' },
      { icone: '🔩', titre: 'Installation & Rénovation', desc: 'Devis gratuit, travail soigné.' },
      { icone: '📋', titre: 'Devis sous 24h',            desc: 'Réponse rapide garantie.' },
    ],
    chiffres: [
      { valeur: '12 ans', label: "d'expérience" },
      { valeur: '500+',   label: 'chantiers réalisés' },
      { valeur: '24h',    label: 'délai de devis' },
    ],
    temoignages: [
      { texte: 'Intervention rapide et propre. Parfait !', auteur: 'Julie M.' },
      { texte: 'Devis clair, travail soigné.',             auteur: 'Antoine B.' },
      { texte: 'Sérieux et ponctuel. Je recommande.',      auteur: 'Hélène C.' },
    ],
    apropos: "Artisan certifié RGE, nous intervenons chez les particuliers et les professionnels. Qualité de travail et respect des délais.",
  },
  {
    id: 'restaurant',
    label: 'Restaurant / Café',
    icon: '🍽️',
    heroLayout: 'full-overlay',
    imageKeyword: 'restaurant+food+dining',
    hero: {
      titre: 'Une cuisine qui vous ressemble',
      sous: 'Réservez votre table et découvrez notre carte.',
    },
    services: [
      { icone: '🍽️', titre: 'Carte & Menu',         desc: 'Des plats frais, faits maison.' },
      { icone: '📅', titre: 'Réservation en ligne', desc: 'Réservez votre table en 2 clics.' },
      { icone: '🎉', titre: 'Événements privés',    desc: 'Séminaires, anniversaires, mariages.' },
    ],
    chiffres: [
      { valeur: '14 ans', label: "d'ouverture" },
      { valeur: '4,8 ⭐', label: 'note Google' },
      { valeur: '100%',   label: 'produits locaux' },
    ],
    temoignages: [
      { texte: 'Repas délicieux, ambiance parfaite !',   auteur: 'Lucie F.' },
      { texte: 'La meilleure table de la ville.',        auteur: 'Thomas P.' },
      { texte: 'Accueil formidable, on reviendra !',     auteur: 'Marie-Claire B.' },
    ],
    apropos: "Restaurant ouvert depuis 2010, nous vous proposons une cuisine du marché, généreuse et authentique. Produits locaux, recettes maison.",
  },
  {
    id: 'btp',
    label: 'BTP / Construction',
    icon: '🏗️',
    heroLayout: 'split-left',
    imageKeyword: 'construction+building+site',
    hero: {
      titre: 'Construisons ensemble',
      sous: 'Des projets solides, des équipes fiables, des délais tenus.',
    },
    services: [
      { icone: '🏗️', titre: 'Gros œuvre',          desc: 'Fondations, dalles, murs porteurs.' },
      { icone: '🔨', titre: 'Rénovation complète', desc: "De l'étude à la finition." },
      { icone: '📐', titre: "Maîtrise d'œuvre",   desc: 'Pilotage de chantier de A à Z.' },
    ],
    chiffres: [
      { valeur: '15 ans', label: "d'expérience" },
      { valeur: '200+',   label: 'chantiers livrés' },
      { valeur: '0',      label: 'retard de livraison' },
    ],
    temoignages: [
      { texte: 'Chantier livré dans les délais, qualité au top.',   auteur: 'Romain C.' },
      { texte: "Équipe sérieuse, on recommande à 100%.",            auteur: 'Isabelle N.' },
      { texte: 'Professionnel du début à la fin. Impeccable.',      auteur: 'David M.' },
    ],
    apropos: "Entreprise de BTP avec 15 ans d'expérience. Nous réalisons vos projets de construction et rénovation avec sérieux et précision.",
  },
  {
    id: 'commerce',
    label: 'Commerce',
    icon: '🛍️',
    heroLayout: 'split-right',
    imageKeyword: 'shop+boutique+retail',
    hero: {
      titre: 'Bienvenue dans notre boutique',
      sous: 'Découvrez nos produits et nos offres du moment.',
    },
    services: [
      { icone: '🛍️', titre: 'Nos Produits',            desc: 'Une sélection soigneusement choisie.' },
      { icone: '🏷️', titre: 'Promotions & Bons plans', desc: 'Les meilleures offres du moment.' },
      { icone: '📦', titre: 'Click & Collect',          desc: 'Commandez en ligne, retirez en boutique.' },
    ],
    chiffres: [
      { valeur: '10 ans', label: "de commerce local" },
      { valeur: '500+',   label: 'références en stock' },
      { valeur: '4,9 ⭐', label: 'note Google' },
    ],
    temoignages: [
      { texte: 'Super boutique, personnel aux petits soins.', auteur: 'Nathalie G.' },
      { texte: 'Produits de qualité, livraison rapide.',      auteur: 'Kevin L.' },
      { texte: 'Mon commerce préféré du quartier !',          auteur: 'Sandra F.' },
    ],
    apropos: "Boutique locale indépendante, nous sélectionnons pour vous des produits de qualité. Service personnalisé, conseils d'experts.",
  },
]
