import type { Session, StatutAffiche } from "@/content/types";

/** « 1 400 € » — espace insécable fine avant le symbole. */
export function prix(montant: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(montant);
}

/** Libellé de tarif, y compris quand le client ne l'a pas encore communiqué. */
export function libellePrix(session: Session): string {
  if (session.prix === null) return "Tarif communiqué prochainement";
  return session.prixAPartirDe ? `À partir de ${prix(session.prix)}` : prix(session.prix);
}

export const libellesStatut: Record<StatutAffiche, string> = {
  ouvert: "Inscriptions ouvertes",
  bientot: "Inscriptions bientôt ouvertes",
  complet: "Session complète",
  passe: "Session passée",
};

/** « 35 h sur 5 jours » */
export function duree(session: Session): string {
  return `${session.heures} h sur ${session.jours} jour${session.jours > 1 ? "s" : ""}`;
}
