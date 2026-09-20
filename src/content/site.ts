/**
 * Informations d'organisme — source unique.
 *
 * Tout ce qui figure ici a été relevé sur le site existant (mentions légales, CGV,
 * pied de page, fiches formation) — voir docs/audit-site-actuel.md §2.
 * Les points marqués À CONFIRMER sont des trous constatés dans l'audit :
 * ils doivent être renseignés par le client avant mise en ligne.
 */

export const site = {
  nom: "Plein Cadre Formation",
  nomComplet: "Plein Cadre Formation by ETL",
  baseline: "Stages intensifs de jeu face caméra",
  url: "https://www.pleincadre-formation.com",

  description:
    "Stages intensifs de jeu face caméra à Lyon et Paris, encadrés par des réalisateur·ices, " +
    "directeur·ices de casting et agents artistiques en activité. Organisme certifié Qualiopi, " +
    "formations conventionnées AFDAS et France Travail.",

  contact: {
    telephone: "06 43 04 50 17",
    telephoneLien: "+33643045017",
    email: "contact@pleincadre-formation.com",
  },

  referenteHandicap: {
    nom: "Edith Hennaut",
    telephone: "04 81 65 15 56",
    telephoneLien: "+33481651556",
  },

  lieux: {
    lyon: {
      nom: "Centre de formation — Lyon",
      adresse: "53 rue des Tables Claudiennes",
      codePostal: "69001",
      ville: "Lyon" as const,
    },
    paris: {
      nom: "Plein Cadre — Paris",
      adresse: "38 rue de Torcy",
      codePostal: "75018",
      ville: "Paris" as const,
    },
  },

  siege: {
    adresse: "1 place Chardonnet",
    codePostal: "69001",
    ville: "Lyon" as const,
  },

  legal: {
    raisonSociale: "École de Théâtre de Lyon",
    // L'ancien site donnait deux numéros différents (CGV : 48 230 367,
    // mentions légales : 448 230 367). Le second est retenu — À CONFIRMER.
    rcs: "448 230 367 R.C.S. Lyon",
    tva: "FR95448230367",
    capital: "8 000 €",
    representant: "Jean-Marc Andrieu",
    directricePublication: "Edith Hennaut",
    // À CONFIRMER : numéro de déclaration d'activité d'organisme de formation.
    // Absent de l'ancien site alors qu'il est obligatoire.
    numeroDeclarationActivite: null as string | null,
  },

  qualiopi: {
    numeroCertificat: "180411-5",
    derniereEdition: "2025-12-05",
    // À CONFIRMER auprès du client : nom de l'organisme certificateur.
    certificateur: null as string | null,
    categorie: "Actions de formation",
  },

  financements: [
    "AFDAS",
    "France Travail",
    "Financement entreprise",
    "Financement personnel",
  ],

  reseaux: {
    // L'ancien site pointait vers facebook.com/wix et instagram.com/wix :
    // les liens par défaut de Wix n'avaient jamais été remplacés.
    // Tant que les comptes réels ne sont pas fournis, on n'affiche rien.
    instagram: null as string | null,
    facebook: null as string | null,
  },

  siteFrere: {
    nom: "École de Théâtre de Lyon",
    url: "https://www.ecoledetheatredelyon.com",
    description: "Formation initiale en art dramatique",
  },
} as const;

export type Site = typeof site;
