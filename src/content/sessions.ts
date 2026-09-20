import { site } from "./site";
import type { Session, StatutAffiche } from "./types";

/**
 * Catalogue des sessions — source unique.
 *
 * Contenus repris intégralement des fiches de l'ancien site : ils sont précis,
 * conformes au vocabulaire du métier et aux exigences Qualiopi. Ce qui change,
 * c'est qu'ils ne sont plus saisis en triple.
 *
 * TODO client : les tarifs de février, mars et avril 2027 n'ont jamais été publiés
 * sur l'ancien site. `prix: null` affiche « Tarif communiqué prochainement » plutôt
 * qu'un montant inventé.
 */

const LIEU_LYON = site.lieux.lyon;

const HORAIRES = "De 9h à 12h et de 13h à 17h — 7h effectives par jour";

const MOYENS_TECHNIQUES = [
  "Caméra et cadreur·euse professionnel·le",
  "Grand écran de retour vidéo",
  "Micros",
  "Panneaux LED",
];

const LIVRABLES = [
  "Les rushes du stage sont remis aux stagiaires",
  "Un certificat de bonne réalisation est remis à l'issue de la formation",
];

const PUBLIC_VISE =
  "Cette formation est ouverte en priorité aux comédien·nes ayant déjà une expérience " +
  "professionnelle au théâtre et/ou dans l'audiovisuel et le cinéma.";

const EVALUATION_CASTING =
  "Tout au long de la formation, les formateur·ices veillent à ce que les stagiaires " +
  "répondent à leurs objectifs : s'adapter aux demandes et contraintes formulées, progresser " +
  "dans le jeu face caméra sous la direction de professionnel·les, maîtriser les conditions et " +
  "les outils mis à disposition. Une attestation de fin de formation est remise à l'issue du stage.";

export const sessions: Session[] = [
  {
    slug: "cinq-directeurices-casting-novembre-2026",
    titre: "L'acteur·rice face à 5 directeur·rices de casting",
    baseline: "Affirmer sa singularité, perfectionner sa technique",
    dateDebut: "2026-11-16",
    dateFin: "2026-11-20",
    heures: 35,
    jours: 5,
    horaires: HORAIRES,
    ville: "Lyon",
    lieu: LIEU_LYON,
    prix: 1400,
    prixAPartirDe: true,
    statut: "ouvert",
    dateLimiteAfdas: "2026-10-16",
    dateLimiteFranceTravail: "2026-10-23",
    effectifMax: 12,
    prerequis: "Aucun prérequis.",
    publicVise: PUBLIC_VISE,
    resume:
      "Cinq journées, cinq responsables de distribution artistique en activité. Cinq regards " +
      "différents sur votre jeu, en conditions de casting.",
    description: [
      "Cette formation s'adresse aux comédien·nes souhaitant approfondir leur maîtrise du jeu " +
        "face caméra et faire évoluer leur pratique dans un environnement à la fois exigeant, " +
        "bienveillant et professionnalisant.",
      "L'objectif est de permettre à chaque participant·e de renforcer ses compétences face à la " +
        "caméra, de gagner en précision et en confiance, tout en développant une présence " +
        "singulière et identifiable à l'écran.",
      "La formation étant encadrée par cinq responsables de distribution artistique en activité, " +
        "le travail encourage l'adaptation et permet d'explorer différentes manières d'aborder un " +
        "rôle ou une scène. Cette diversité de regards, d'expériences et de façons de diriger est " +
        "un point essentiel de la formation.",
      "Toutes les scènes sont filmées par un·e cadreur·euse professionnel·le. Les séquences font " +
        "ensuite l'objet de visionnages collectifs et d'un accompagnement personnalisé, afin " +
        "d'identifier les points forts, les axes d'amélioration et les effets produits par chaque " +
        "proposition.",
    ],
    objectifs: [
      "Maîtriser le jeu face caméra et développer sa palette émotionnelle",
      "Se former à l'exercice particulier du casting et connaître le fonctionnement de ce milieu",
      "Savoir rebondir rapidement et proposer une autre direction à la scène",
      "Comprendre les différentes attentes des chargé·es de distribution artistique",
      "Travailler de manières différentes grâce aux visions des cinq intervenant·es",
      "Savoir analyser son travail et l'effet produit par son propre jeu",
    ],
    competencesVisees: [
      "Analyser une scène afin d'en dégager les enjeux, les intentions du personnage et les différents niveaux de sous-texte",
      "Comprendre les spécificités du jeu face caméra et adapter son interprétation aux contraintes du cadre et de la prise de vue",
      "Accueillir une direction d'acteur·rice, intégrer rapidement les indications reçues et faire évoluer sa proposition",
      "Maîtriser son niveau d'intensité et ajuster sa présence pour proposer un jeu naturel, précis et adapté à l'image",
      "Porter un regard critique sur ses propres prestations filmées et mettre en place des ajustements de manière autonome",
      "Renforcer sa capacité d'écoute et construire une relation de jeu sincère et fluide avec ses partenaires",
      "Développer une identité d'interprétation personnelle et valoriser sa singularité",
    ],
    programmeIntro:
      "En amont de la formation, les stagiaires reçoivent des scènes pour chaque jour de stage. " +
      "Du jour 1 au jour 5, le travail est dirigé par un·e responsable de distribution artistique. " +
      "L'organisation des cinq journées est la même : c'est le regard et la direction d'acteur·ice qui varient.",
    programme: [
      {
        intitule: "Matin",
        texte: "Travail à partir d'une scène dialoguée ou d'un monologue.",
        points: [
          "Lecture et analyse de la situation : objectifs du personnage, enjeux de la scène et sous-texte",
          "Mise en situation devant la caméra, seul·e ou avec un·e partenaire",
          "Travail dirigé et indications personnalisées pendant les prises",
          "Recherche du niveau de jeu adapté au cadre et à la situation",
          "Ajustement du rythme, de l'intensité, de l'écoute et de la présence à l'image",
        ],
      },
      {
        intitule: "Après-midi",
        texte: "Découverte collective des séquences filmées au cours de la journée.",
        points: [
          "Observation des choix d'interprétation et de ce qui en ressort à l'écran",
          "Analyse de chaque proposition",
          "Identification des éléments efficaces et des points pouvant être approfondis",
          "Développement de la capacité à observer et évaluer son propre travail",
        ],
      },
      {
        intitule: "Puis la journée peut évoluer ainsi",
        points: [
          "Improvisations accompagnées et dirigées",
          "Recherche autour d'intentions multiples ou contradictoires",
          "Reprise d'une même scène à partir de consignes ou de directions différentes",
          "Expérimentation de différents niveaux d'intensité, de ruptures émotionnelles, de silence, de regards et de tension intérieure",
        ],
      },
    ],
    intervenants: [
      "marion-touitou",
      "alexandra-weyers",
      "francois-guignard",
      "emmanuel-thomas",
      "winifrey-bandera-guzman",
    ],
    moyensTechniques: [
      "Caméra et cadreur·euse professionnel·le",
      "Grand écran de retour vidéo",
      "2 micros",
      "2 panneaux LED",
    ],
    livrables: LIVRABLES,
    modalitesEvaluation: EVALUATION_CASTING,
    accent: "navy",
  },

  {
    slug: "parcours-carriere-artistique-decembre-2026",
    titre: "Parcours et carrière artistique, jeu et singularité",
    baseline: "Perfectionner son jeu, développer son projet professionnel",
    dateDebut: "2026-12-14",
    dateFin: "2026-12-18",
    heures: 35,
    jours: 5,
    horaires: HORAIRES,
    ville: "Lyon",
    lieu: LIEU_LYON,
    prix: 1500,
    statut: "ouvert",
    dateLimiteAfdas: "2026-11-14",
    dateLimiteFranceTravail: "2026-11-21",
    effectifMax: 12,
    prerequis: "Aucun prérequis.",
    publicVise: PUBLIC_VISE,
    resume:
      "Deux agent·es artistiques, une coach d'acteur·ices, deux responsables de distribution " +
      "artistique : la semaine qui relie le jeu et la carrière.",
    objectifs: [
      "Identifier les différents types d'agence",
      "Travailler son jeu face caméra avec une coach d'acteur·ices",
      "Affirmer une identité de jeu personnelle et adaptée aux exigences de l'image",
      "Comprendre les codes, pratiques et attentes du milieu audiovisuel",
      "Présenter avec clarté son expérience, son profil et ses ambitions artistiques",
      "Définir des pistes concrètes pour faire évoluer et développer son activité de comédien·ne",
    ],
    programmeIntro:
      "Les stagiaires sont accompagné·es par deux agent·es artistiques, deux responsables de " +
      "distribution artistique et une coach d'acteur·ices. En amont de la formation, les " +
      "intervenant·es envoient des scènes à travailler aux stagiaires.",
    programme: [
      {
        intitule: "Jour 1 & 2",
        texte: "Deux agent·es artistiques se succèdent pour aider les stagiaires à :",
        points: [
          "Comprendre les enjeux de la représentation artistique",
          "Adopter une posture professionnelle adaptée au secteur",
          "Structurer et valoriser son parcours artistique",
        ],
      },
      {
        intitule: "Jour 3",
        texte:
          "Une coach d'acteur·ices prend le relais pour travailler des séquences en profondeur. " +
          "Comment préparer un rôle, qu'il soit petit ou important ? Comment préparer un casting ? " +
          "Elle fait le lien avec les jours suivants, dirigés par deux directrices de casting.",
      },
      {
        intitule: "Jour 4 & 5",
        texte:
          "Deux responsables de distribution artistique se succèdent, dans le but d'aider les stagiaires à :",
        points: [
          "Perfectionner leur jeu face caméra",
          "Gagner en justesse, précision et adaptabilité",
          "Affirmer leur singularité artistique",
        ],
      },
    ],
    intervenants: [],
    moyensTechniques: MOYENS_TECHNIQUES,
    livrables: LIVRABLES,
    modalitesEvaluation: EVALUATION_CASTING,
    accent: "terracotta",
  },

  {
    slug: "deux-realisateurices-janvier-2027",
    titre: "L'acteur·rice dirigé·e par deux réalisateur·rices",
    baseline: "Le jeu, le corps et l'émotion",
    dateDebut: "2027-01-11",
    dateFin: "2027-01-22",
    heures: 70,
    jours: 10,
    horaires: HORAIRES,
    ville: "Lyon",
    lieu: LIEU_LYON,
    prix: 3000,
    statut: "bientot",
    dateLimiteAfdas: "2026-12-11",
    dateLimiteFranceTravail: "2026-12-18",
    effectifMax: 12,
    prerequis: "Aucun prérequis.",
    publicVise: PUBLIC_VISE,
    resume:
      "Deux semaines en conditions de tournage, dirigé·e par un·e réalisateur·ice de long " +
      "métrage : travail à la table, plateau, casting, visionnage.",
    objectifs: [
      "Préparer un rôle et trouver les enjeux de la scène",
      "Perfectionner son jeu face caméra en travaillant à plusieurs sur un tournage",
      "Comprendre et exécuter ce que souhaite le·la metteur·euse en scène en adaptant son jeu aux demandes du plateau",
    ],
    programmeIntro:
      "Accompagné·e par un·e réalisateur·ice de long métrage, chaque apprenant·e est plongé·e et " +
      "dirigé·e dans des situations professionnelles : casting, travail à la table, lecture et " +
      "articulation d'une scène, tournage des scènes travaillées, projection et analyse du jeu. " +
      "En amont, les stagiaires reçoivent des scènes à préparer.",
    programme: [
      {
        intitule: "Semaine 1 — Jour 1",
        texte:
          "La première journée débute directement avec le·la réalisateur·ice par des mises en " +
          "situation professionnelles sur les scènes distribuées. L'accent est mis sur le corps.",
      },
      {
        intitule: "Semaine 1 — Jour 2 & 3",
        texte:
          "Approfondissement des scènes travaillées, propositions de variantes, exploration du jeu physique.",
      },
      {
        intitule: "Semaine 1 — Jour 4",
        texte:
          "Un·e directeur·ice de casting intervient, en collaboration avec le·la réalisateur·ice, " +
          "pour apporter une nouvelle vision et formuler de nouvelles demandes. L'objectif : " +
          "apprendre à rebondir et proposer de nouvelles versions des scènes, en conditions de casting.",
      },
      {
        intitule: "Semaine 1 — Jour 5",
        texte:
          "Visionnage des séquences tournées avec le·la réalisateur·ice, puis affinage des " +
          "directions prises. Bilan de la semaine en fin de journée.",
      },
      {
        intitule: "Semaine 2 — Jour 6",
        texte:
          "Session casting avec le·la réalisateur·ice : se confronter directement à l'exercice, " +
          "trouver un jeu instinctif, formuler plusieurs propositions.",
      },
      {
        intitule: "Semaine 2 — Jour 7",
        texte: "Approfondissement du travail de la veille, les rôles sont redistribués.",
      },
      {
        intitule: "Semaine 2 — Jour 8",
        texte:
          "Les séquences sont retravaillées sous un regard nouveau. Les rôles sont encore " +
          "redistribués, des contraintes de jeu sont proposées.",
      },
      {
        intitule: "Semaine 2 — Jour 9",
        texte:
          "Approfondissement du travail de la veille et nouvelles propositions de jeu.",
      },
      {
        intitule: "Semaine 2 — Jour 10",
        texte:
          "Visionnage final en présence du réalisateur·ice, affinage des directions prises. " +
          "Bilan de la formation en fin de journée.",
      },
    ],
    intervenants: [],
    moyensTechniques: MOYENS_TECHNIQUES,
    livrables: LIVRABLES,
    modalitesEvaluation:
      "Tout au long de la formation, les formateur·ices veillent à ce que les stagiaires " +
      "répondent à leurs objectifs : s'adapter aux demandes et contraintes formulées, progresser " +
      "dans le jeu face caméra sous la direction d'un·e réalisateur·ice. Une attestation de fin " +
      "de formation est remise à l'issue des 10 jours.",
    tauxSatisfaction: 100,
    accent: "indigo",
  },

  {
    slug: "cinq-agents-artistiques-fevrier-2027",
    titre: "L'acteur·rice face à 5 agents artistiques",
    baseline: "Comprendre la représentation, construire sa carrière",
    dateDebut: "2027-02-01",
    dateFin: "2027-02-05",
    heures: 35,
    jours: 5,
    horaires: HORAIRES,
    ville: "Lyon",
    lieu: LIEU_LYON,
    prix: null,
    statut: "bientot",
    dateLimiteAfdas: "2027-01-01",
    dateLimiteFranceTravail: "2027-01-08",
    effectifMax: 12,
    prerequis: "Aucun prérequis.",
    publicVise: PUBLIC_VISE,
    resume:
      "Cinq agent·es artistiques en activité se succèdent : comprendre ce que cherche une " +
      "agence, et comment on se présente à elle.",
    objectifs: [
      "Comprendre les enjeux de la représentation artistique et le fonctionnement des agences",
      "Adopter une posture professionnelle adaptée au secteur",
      "Structurer et valoriser son parcours artistique",
      "Travailler son jeu face caméra sous la direction d'agent·es expérimenté·es",
    ],
    programme: [
      {
        intitule: "Jour 1 à 5",
        texte:
          "Le programme détaillé de cette session sera publié dès validation des intervenant·es. " +
          "Pour en être informé·e en premier, écrivez-nous.",
      },
    ],
    intervenants: [],
    moyensTechniques: MOYENS_TECHNIQUES,
    livrables: LIVRABLES,
    modalitesEvaluation: EVALUATION_CASTING,
    accent: "terracotta",
  },

  {
    slug: "cinq-directeurices-casting-mars-2027",
    titre: "L'acteur·rice face à 5 directeur·rices de casting",
    baseline: "Affirmer sa singularité, perfectionner sa technique",
    dateDebut: "2027-03-01",
    dateFin: "2027-03-05",
    heures: 35,
    jours: 5,
    horaires: HORAIRES,
    ville: "Lyon",
    lieu: LIEU_LYON,
    prix: null,
    statut: "bientot",
    dateLimiteAfdas: "2027-01-29",
    dateLimiteFranceTravail: "2027-02-05",
    effectifMax: 12,
    prerequis: "Aucun prérequis.",
    publicVise: PUBLIC_VISE,
    resume:
      "La session de printemps du stage phare : cinq journées, cinq directions d'acteur·ice " +
      "différentes, en conditions de casting.",
    objectifs: [
      "Maîtriser le jeu face caméra et développer sa palette émotionnelle",
      "Se former à l'exercice particulier du casting et connaître le fonctionnement de ce milieu",
      "Savoir rebondir rapidement et proposer une autre direction à la scène",
      "Comprendre les différentes attentes des chargé·es de distribution artistique",
    ],
    programme: [
      {
        intitule: "Jour 1 à 5",
        texte:
          "Même architecture que la session de novembre : une journée par responsable de " +
          "distribution artistique, travail le matin, visionnage et analyse l'après-midi. " +
          "Les intervenant·es de cette session seront annoncé·es prochainement.",
      },
    ],
    intervenants: [],
    moyensTechniques: MOYENS_TECHNIQUES,
    livrables: LIVRABLES,
    modalitesEvaluation: EVALUATION_CASTING,
    accent: "navy",
  },

  {
    slug: "dix-directeurices-casting-avril-2027",
    titre: "L'acteur·rice face à 10 directeur·rices de casting",
    baseline: "Dix regards, une semaine",
    dateDebut: "2027-04-19",
    dateFin: "2027-04-23",
    heures: 35,
    jours: 5,
    horaires: HORAIRES,
    ville: "Lyon",
    lieu: LIEU_LYON,
    prix: null,
    statut: "bientot",
    dateLimiteAfdas: "2027-03-19",
    dateLimiteFranceTravail: "2027-03-26",
    effectifMax: 12,
    prerequis: "Aucun prérequis.",
    publicVise: PUBLIC_VISE,
    resume:
      "Le format le plus intensif du catalogue : dix responsables de distribution artistique " +
      "sur une seule semaine.",
    objectifs: [
      "Se confronter à dix directions d'acteur·ice différentes en cinq jours",
      "Gagner en adaptabilité et en rapidité de proposition",
      "Comprendre la diversité des attentes en casting",
      "Analyser son travail filmé et repérer ses axes de progression",
    ],
    programme: [
      {
        intitule: "Jour 1 à 5",
        texte:
          "Deux responsables de distribution artistique par journée. Le programme détaillé sera " +
          "publié dès validation des intervenant·es.",
      },
    ],
    intervenants: [],
    moyensTechniques: MOYENS_TECHNIQUES,
    livrables: LIVRABLES,
    modalitesEvaluation: EVALUATION_CASTING,
    accent: "indigo",
  },
];

/* ==========================================================================
   Sélecteurs — le statut affiché est calculé, jamais ressaisi
   ========================================================================== */

export function statutAffiche(session: Session, maintenant = new Date()): StatutAffiche {
  const fin = new Date(`${session.dateFin}T23:59:59+01:00`);
  if (fin.getTime() < maintenant.getTime()) return "passe";
  return session.statut;
}

export function estPassee(session: Session, maintenant = new Date()): boolean {
  return statutAffiche(session, maintenant) === "passe";
}

/** Sessions à venir, de la plus proche à la plus lointaine. */
export function sessionsAVenir(maintenant = new Date()): Session[] {
  return sessions
    .filter((s) => !estPassee(s, maintenant))
    .sort((a, b) => a.dateDebut.localeCompare(b.dateDebut));
}

export function sessionsPassees(maintenant = new Date()): Session[] {
  return sessions
    .filter((s) => estPassee(s, maintenant))
    .sort((a, b) => b.dateDebut.localeCompare(a.dateDebut));
}

export function getSession(slug: string): Session | undefined {
  return sessions.find((s) => s.slug === slug);
}

/** Sessions dont les inscriptions sont réellement ouvertes. */
export function sessionsOuvertes(maintenant = new Date()): Session[] {
  return sessionsAVenir(maintenant).filter((s) => s.statut === "ouvert");
}
