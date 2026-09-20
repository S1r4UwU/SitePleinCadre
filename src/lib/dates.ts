/**
 * Formatage des dates — toujours calculé, jamais saisi à la main.
 *
 * Sur l'ancien site, les libellés du type « Du lundi 16 au vendredi 20 novembre 2026 »
 * étaient tapés dans chaque bloc de texte : une fiche annonçait « juin 26 » dans son
 * titre pour un stage de janvier 2027.
 */

const TZ = "Europe/Paris";

function toDate(iso: string): Date {
  // Midi UTC : évite les bascules de jour liées au fuseau.
  return new Date(`${iso}T12:00:00Z`);
}

function fmt(iso: string, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("fr-FR", { timeZone: TZ, ...options }).format(
    toDate(iso),
  );
}

/** « 16 novembre 2026 » */
export function dateLongue(iso: string): string {
  return fmt(iso, { day: "numeric", month: "long", year: "numeric" });
}

/** « 16 nov. 2026 » */
export function dateCourte(iso: string): string {
  return fmt(iso, { day: "numeric", month: "short", year: "numeric" });
}

/** « lundi 16 » */
function jourEtNumero(iso: string): string {
  return fmt(iso, { weekday: "long", day: "numeric" });
}

/** « novembre 2026 » */
function moisEtAnnee(iso: string): string {
  return fmt(iso, { month: "long", year: "numeric" });
}

function mois(iso: string): string {
  return fmt(iso, { month: "long" });
}

function annee(iso: string): string {
  return fmt(iso, { year: "numeric" });
}

/**
 * Période complète, avec la formulation qui convient :
 * — « Du lundi 16 au vendredi 20 novembre 2026 »
 * — « Du lundi 30 novembre au vendredi 4 décembre 2026 »
 * — « Du lundi 28 décembre 2026 au vendredi 8 janvier 2027 »
 */
export function periode(debut: string, fin: string): string {
  const memeAnnee = annee(debut) === annee(fin);
  const memeMois = memeAnnee && mois(debut) === mois(fin);

  if (memeMois) {
    return `Du ${jourEtNumero(debut)} au ${jourEtNumero(fin)} ${moisEtAnnee(fin)}`;
  }
  if (memeAnnee) {
    return `Du ${jourEtNumero(debut)} ${mois(debut)} au ${jourEtNumero(fin)} ${moisEtAnnee(fin)}`;
  }
  return `Du ${jourEtNumero(debut)} ${moisEtAnnee(debut)} au ${jourEtNumero(fin)} ${moisEtAnnee(fin)}`;
}

/** Forme compacte pour les cartes : « 16 → 20 nov. 2026 » */
export function periodeCourte(debut: string, fin: string): string {
  const memeMois = mois(debut) === mois(fin) && annee(debut) === annee(fin);
  if (memeMois) {
    return `${fmt(debut, { day: "numeric" })} → ${dateCourte(fin)}`;
  }
  return `${dateCourte(debut)} → ${dateCourte(fin)}`;
}

/** Nombre de jours pleins entre aujourd'hui et une date. Négatif si la date est passée. */
export function joursRestants(iso: string, maintenant = new Date()): number {
  const cible = toDate(iso).getTime();
  const aujourdhui = Date.UTC(
    maintenant.getUTCFullYear(),
    maintenant.getUTCMonth(),
    maintenant.getUTCDate(),
    12,
  );
  return Math.round((cible - aujourdhui) / 86_400_000);
}

/** Durée ISO 8601, pour les données structurées Course. */
export function dureeIso(jours: number): string {
  return `P${jours}D`;
}
