import { z } from "zod";
import { sessions } from "@/content/sessions";

/**
 * Schéma de candidature.
 *
 * Le formulaire Wix posait la question du handicap sous forme de deux cases à cocher
 * indépendantes : on pouvait cocher les deux, ou aucune. La donnée était inexploitable
 * et le champ inaccessible. Ici, c'est une valeur obligatoire parmi trois.
 */

export const FICHIERS_TYPES_ACCEPTES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const TAILLE_MAX_FICHIER = 5 * 1024 * 1024; // 5 Mo
export const NOMBRE_MAX_FICHIERS = 4;

export const modesFinancement = [
  { valeur: "afdas", libelle: "AFDAS (intermittent·e du spectacle)" },
  { valeur: "france-travail", libelle: "France Travail" },
  { valeur: "entreprise", libelle: "Financement par mon employeur" },
  { valeur: "personnel", libelle: "Financement personnel" },
  { valeur: "indecis", libelle: "Je ne sais pas encore" },
] as const;

export const reponsesHandicap = [
  { valeur: "non", libelle: "Non" },
  { valeur: "oui", libelle: "Oui" },
  { valeur: "prefere-ne-pas-repondre", libelle: "Je préfère ne pas répondre" },
] as const;

const slugsSessions = sessions.map((s) => s.slug) as [string, ...string[]];

export const candidatureSchema = z.object({
  // Étape 1 — identité
  prenom: z.string().trim().min(1, "Indiquez votre prénom").max(80),
  nom: z.string().trim().min(1, "Indiquez votre nom").max(80),
  email: z.email("Cette adresse e-mail ne semble pas valide").max(160),
  telephone: z
    .string()
    .trim()
    .min(6, "Indiquez un numéro de téléphone")
    .max(30)
    .regex(/^[0-9+().\s-]+$/, "Ce numéro contient des caractères inattendus"),
  ville: z.string().trim().min(1, "Indiquez votre ville").max(80),
  dateNaissance: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Indiquez votre date de naissance"),

  // Étape 2 — projet
  session: z.enum(slugsSessions, {
    message: "Choisissez une session dans la liste",
  }),
  financement: z.enum(modesFinancement.map((m) => m.valeur) as [string, ...string[]], {
    message: "Indiquez comment vous envisagez de financer la formation",
  }),
  handicap: z.enum(reponsesHandicap.map((r) => r.valeur) as [string, ...string[]], {
    message: "Choisissez une réponse",
  }),
  message: z.string().trim().max(3000).optional().or(z.literal("")),

  // Étape 3 — pièces
  bandeDemo: z.string().trim().max(300).optional().or(z.literal("")),
  consentement: z.literal("on", {
    message:
      "Votre accord est nécessaire pour que nous puissions traiter votre candidature",
  }),
});

// Le piège à robots est volontairement hors du schéma : il est testé avant la
// validation, pour répondre « tout va bien » au robot plutôt que de lui signaler
// qu'il s'est fait repérer.
export const CHAMP_PIEGE = "societe";

export type Candidature = z.infer<typeof candidatureSchema>;

export function libelleFinancement(valeur: string): string {
  return modesFinancement.find((m) => m.valeur === valeur)?.libelle ?? valeur;
}

export function libelleHandicap(valeur: string): string {
  return reponsesHandicap.find((r) => r.valeur === valeur)?.libelle ?? valeur;
}
