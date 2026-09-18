import type { Intervenant, MetierIntervenant } from "./types";

/**
 * Intervenant·es.
 *
 * Bios reprises du site existant (fiche « L'acteur·rice face à 5 directeur·rices
 * de casting »). C'était la seule page qui les nommait : les cinq catégories de
 * /nos-intervenants menaient à deux 404 et à trois galeries vides.
 *
 * Aucune photo n'est renseignée : le client doit fournir les portraits et
 * l'autorisation de publication (docs/brief-refonte.md §6). En attendant,
 * l'affichage bascule sur un monogramme typographique — pas de photo de banque
 * d'images, pas de silhouette grise.
 */

export const metiers: Record<
  MetierIntervenant,
  { pluriel: string; singulier: string; chapeau: string }
> = {
  "directeur-casting": {
    pluriel: "Les directeur·ices de casting",
    singulier: "Direction de casting",
    chapeau:
      "Le casting est un exercice à part entière : connaître les attentes, savoir rebondir " +
      "sur une indication, faire de vraies propositions de jeu. C'est ce que les stagiaires " +
      "travaillent, avec celles et ceux qui distribuent les films.",
  },
  realisateur: {
    pluriel: "Les réalisateur·ices",
    singulier: "Réalisation",
    chapeau:
      "Être dirigé·e par un·e réalisateur·ice de long métrage, en conditions de tournage : " +
      "travail à la table, plateau, visionnage, reprise. La direction d'acteur·ice telle " +
      "qu'elle se pratique réellement.",
  },
  agent: {
    pluriel: "Les agent·es artistiques",
    singulier: "Représentation artistique",
    chapeau:
      "Comprendre les enjeux de la représentation, structurer son parcours, adopter une " +
      "posture professionnelle : les agent·es artistiques ouvrent la partie carrière du métier.",
  },
  acteur: {
    pluriel: "Les acteur·ices",
    singulier: "Jeu",
    chapeau:
      "Des acteur·ices en activité viennent partager leur pratique : préparation d'un rôle, " +
      "étapes de carrière, manières de travailler.",
  },
  autre: {
    pluriel: "Les autres corps de métier",
    singulier: "Autres métiers",
    chapeau:
      "Scénaristes, coordinatrices d'intimité, cadreur·euses : le jeu face caméra se joue " +
      "aussi avec celles et ceux qui fabriquent l'image autour de l'acteur·ice.",
  },
};

export const intervenants: Intervenant[] = [
  {
    slug: "marion-touitou",
    nom: "Marion Touitou",
    metier: "directeur-casting",
    role: "Directrice de casting",
    bio:
      "Marion Touitou est depuis longtemps une figure incontournable du casting en France. " +
      "Elle a travaillé sur de nombreux classiques du cinéma français.",
    references: ["De battre mon cœur s'est arrêté", "Les Amandiers"],
  },
  {
    slug: "alexandra-weyers",
    nom: "Alexandra Weyers",
    metier: "directeur-casting",
    role: "Directrice de casting",
    bio:
      "Alexandra Weyers est LA directrice de casting en Rhône-Alpes. Nous connaissons depuis " +
      "longtemps son goût pour la découverte, la transmission et le plaisir dans le travail " +
      "avec les acteur·ices.",
    references: ["De Gaulle (parties 1 et 2)"],
  },
  {
    slug: "francois-guignard",
    nom: "François Guignard",
    metier: "directeur-casting",
    role: "Directeur de casting",
    bio:
      "François Guignard s'est illustré par beaucoup de grands castings. Sa grande humanité " +
      "et son amour du cinéma sont pour nous et pour les stagiaires de précieux atouts.",
    references: ["L'espèce explosive", "La guerre des prix", "L'étrangère"],
  },
  {
    slug: "emmanuel-thomas",
    nom: "Emmanuel Thomas",
    metier: "directeur-casting",
    role: "Directeur de casting",
    bio:
      "Figure incontournable du casting en région, Emmanuel Thomas ne s'arrête pas ; son " +
      "actualité parle d'elle-même. Chez Plein Cadre, nous le connaissons depuis longtemps : " +
      "il était évident que nous souhaitions l'inviter à partager son expérience.",
  },
  {
    slug: "winifrey-bandera-guzman",
    nom: "Winifrey Bandera-Guzman",
    metier: "directeur-casting",
    role: "Directrice de casting",
    bio:
      "Autant directrice de casting pour le cinéma que pour la télévision, c'est sa façon de " +
      "travailler et sa bienveillance qui nous ont convaincus de vouloir travailler avec elle.",
  },
];

export function getIntervenant(slug: string): Intervenant | undefined {
  return intervenants.find((i) => i.slug === slug);
}

export function getIntervenants(slugs: readonly string[]): Intervenant[] {
  return slugs
    .map((slug) => getIntervenant(slug))
    .filter((i): i is Intervenant => Boolean(i));
}

export function intervenantsParMetier(metier: MetierIntervenant): Intervenant[] {
  return intervenants.filter((i) => i.metier === metier);
}

/** Monogramme affiché tant que le client n'a pas fourni les portraits. */
export function monogramme(nom: string): string {
  return nom
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((mot) => mot.charAt(0).toUpperCase())
    .join("");
}
