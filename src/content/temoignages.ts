import type { Temoignage } from "./types";

/**
 * Témoignages.
 *
 * L'ancien site n'en publiait qu'un seul, reproduit ici à l'identique. Aucun autre
 * n'est inventé : la page s'adapte au nombre réel d'avis disponibles.
 *
 * TODO client : fournir 6 à 8 témoignages (prénom, initiale du nom, session suivie,
 * année), ainsi que le détail du taux de satisfaction — voir `satisfaction` ci-dessous.
 */
export const temoignages: Temoignage[] = [
  {
    citation:
      "Super groupe, super ambiance, super cadre (fraîcheur incroyable pendant la canicule !), " +
      "très bons intervenants, on a fait des choses très différentes sur ces deux semaines, " +
      "c'était du high level. Merci pour ce stage.",
    auteur: "Sophie C.",
    formation: "L'acteur·ice dirigé·e par deux réalisateur·ices",
  },
];

/**
 * Taux de satisfaction.
 *
 * L'ancien site affichait « Taux de satisfaction : 100 % » sans base de calcul ni période.
 * Un chiffre non sourcé est un point faible en audit Qualiopi : tant que le client n'a pas
 * fourni le nombre de répondants et la période, on ne l'affiche pas comme un chiffre global.
 */
export const satisfaction: {
  taux: number;
  repondants: number | null;
  periode: string | null;
} = {
  taux: 100,
  repondants: null,
  periode: null,
};

/** Le chiffre n'est mis en avant que s'il est sourçable. */
export const satisfactionPubliable =
  satisfaction.repondants !== null && satisfaction.periode !== null;
