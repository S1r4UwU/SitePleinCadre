import { libellesStatut } from "@/lib/format";
import type { StatutAffiche } from "@/content/types";

/**
 * Trois statuts, trois traitements visuels distincts — jamais trois fois le même
 * badge d'une couleur différente. L'ancien site affichait « INSCRIPTIONS OUVERTES »,
 * « OUVERTES PROCHAINEMENT » et « À VENIR » dans une typographie identique, et
 * avec des valeurs contradictoires d'une page à l'autre.
 */
export function Statut({
  statut,
  ton = "clair",
}: {
  statut: StatutAffiche;
  /** `sombre` quand le badge est posé sur un fond bleu nuit. */
  ton?: "clair" | "sombre";
}) {
  const libelle = libellesStatut[statut];

  if (statut === "ouvert") {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold ${
          ton === "sombre" ? "bg-cream text-navy" : "bg-navy text-cream"
        }`}
      >
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full ${
            ton === "sombre" ? "bg-terracotta" : "bg-terracotta-pale"
          }`}
        />
        {libelle}
      </span>
    );
  }

  if (statut === "bientot") {
    return (
      <span
        className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold ${
          ton === "sombre" ? "border-cream/40 text-cream/80" : "border-navy/35 text-navy"
        }`}
      >
        {libelle}
      </span>
    );
  }

  if (statut === "complet") {
    return (
      <span
        className={`inline-flex items-center rounded-full border border-dashed px-3.5 py-1.5 text-xs font-semibold line-through decoration-1 ${
          ton === "sombre"
            ? "border-cream/30 text-cream/55"
            : "border-ink/25 text-ink-mute"
        }`}
      >
        {libelle}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center text-xs font-semibold uppercase tracking-[0.14em] ${
        ton === "sombre" ? "text-cream/45" : "text-ink-mute"
      }`}
    >
      {libelle}
    </span>
  );
}
