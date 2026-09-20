/**
 * Marque typographique.
 *
 * L'ancien site utilisait un PNG. Tant que le client n'a pas fourni son logo
 * vectoriel, on redessine le verrou en SVG : net à toutes les tailles, colorable,
 * et cohérent avec la typographie du site.
 */
export function Logo({
  className = "",
  ton = "navy",
}: {
  className?: string;
  /** `cream` pour les fonds sombres. */
  ton?: "navy" | "cream";
}) {
  const principal = ton === "cream" ? "var(--color-cream)" : "var(--color-navy)";
  const accent =
    ton === "cream" ? "var(--color-terracotta-pale)" : "var(--color-terracotta)";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Ardoise principal={principal} accent={accent} />
      <span className="flex flex-col leading-none">
        <span
          className="font-[family-name:var(--font-display)] text-[1.35rem] leading-none tracking-tight"
          style={{ color: principal }}
        >
          Plein<span style={{ color: accent }}>Cadre</span>
        </span>
        <span
          className="eyebrow mt-1 text-[0.5625rem]"
          style={{ color: ton === "cream" ? "var(--color-terracotta-pale)" : undefined }}
        >
          Formation
        </span>
      </span>
    </span>
  );
}

/** Le clap, réduit à son geste : un corps et une barre claquante inclinée. */
function Ardoise({ principal, accent }: { principal: string; accent: string }) {
  return (
    <svg
      viewBox="0 0 32 28"
      width="26"
      height="23"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="1" y="10" width="30" height="17" rx="2.5" fill={principal} />
      <path
        d="M2.4 8.2 3.6 3.1a2 2 0 0 1 2.4-1.5l23 5.3a2 2 0 0 1 1.5 2.4l-.5 2.1L2.4 8.2Z"
        fill={accent}
      />
      <path
        d="m9.6 2.6-2.5 5.9M16.8 4.3l-2.5 5.9M24 5.9l-2.5 6"
        stroke="var(--color-cream)"
        strokeWidth="1.4"
      />
    </svg>
  );
}
