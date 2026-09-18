/**
 * Modèle de contenu — une formation est une donnée, pas une page copiée-collée.
 *
 * Sur l'ancien site Wix, chaque stage était saisi trois fois (accueil, catalogue,
 * fiche détail) : les statuts et les prix divergeaient déjà, deux pages étaient
 * des doublons indexés par Google. Ici, un objet `Session` alimente les cartes,
 * la fiche, les données structurées Course et les statuts affichés.
 *
 * Ces types sont volontairement proches d'un schéma CMS (Sanity / Payload) :
 * le jour où le client édite ses sessions lui-même, seule la source change.
 */

export type Ville = "Lyon" | "Paris";

export type StatutInscription = "ouvert" | "bientot" | "complet";

/** Statut réellement affiché : `passe` est déduit des dates, jamais saisi. */
export type StatutAffiche = StatutInscription | "passe";

export type Lieu = {
  nom?: string;
  adresse: string;
  codePostal: string;
  ville: Ville;
};

export type JourProgramme = {
  /** « Jour 1 », « Jour 4 & 5 », « Matin »… */
  intitule: string;
  /** Paragraphe d'introduction du jour, facultatif. */
  texte?: string;
  /** Points détaillés, facultatifs. */
  points?: string[];
};

export type MetierIntervenant =
  | "directeur-casting"
  | "realisateur"
  | "agent"
  | "acteur"
  | "autre";

export type Intervenant = {
  slug: string;
  nom: string;
  metier: MetierIntervenant;
  /** Intitulé exact affiché, ex. « Directrice de casting ». */
  role: string;
  bio: string;
  /** Titres de films ou séries, affichés en filmographie. */
  references?: string[];
  photo?: Image;
};

export type Image = {
  src: string;
  /** Rédigé, jamais un nom de fichier. */
  alt: string;
  width: number;
  height: number;
};

export type Session = {
  slug: string;
  titre: string;
  baseline: string;

  /** Dates ISO (YYYY-MM-DD). Les libellés français sont calculés à l'affichage. */
  dateDebut: string;
  dateFin: string;
  heures: number;
  jours: number;
  horaires: string;

  ville: Ville;
  lieu: Lieu;

  /** En euros TTC. `null` tant que le client ne l'a pas communiqué. */
  prix: number | null;
  /** Vrai quand le tarif affiché est un « à partir de ». */
  prixAPartirDe?: boolean;

  statut: StatutInscription;

  /** Dates limites de dépôt de dossier — l'information la plus actionnable du site. */
  dateLimiteAfdas: string;
  dateLimiteFranceTravail: string;

  effectifMax: number;
  prerequis: string;
  publicVise: string;

  resume: string;
  description?: string[];
  objectifs: string[];
  competencesVisees?: string[];
  programmeIntro?: string;
  programme: JourProgramme[];

  /** Slugs d'intervenants. Vide = « intervenant·es en cours de validation ». */
  intervenants: string[];

  moyensTechniques: string[];
  livrables: string[];
  modalitesEvaluation: string;

  /** En pourcentage. Absent ⇒ la rubrique ne s'affiche pas du tout. */
  tauxSatisfaction?: number;
  /** Idem : jamais de titre suivi de rien (indicateur Qualiopi). */
  resultatsObtenus?: string;

  /**
   * Photo de couverture. Absente tant que le client n'a pas fourni le reportage
   * photo (docs/brief-refonte.md §6) : on affiche alors une ardoise typographique,
   * pas une image de banque d'images ni un rectangle gris.
   */
  image?: Image;
  /** Teinte de l'ardoise de repli. */
  accent: "navy" | "indigo" | "terracotta";
};

export type Temoignage = {
  citation: string;
  auteur: string;
  /** Session suivie, telle que le·la stagiaire la nomme. */
  formation: string;
  annee?: number;
};

export type QuestionFaq = {
  question: string;
  reponse: string;
  categorie: "financement" | "candidature" | "deroulement" | "pratique";
};
