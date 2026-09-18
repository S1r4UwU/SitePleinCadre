import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

/**
 * En-tête de page.
 *
 * Grille éditoriale asymétrique : la ligne de métadonnées en petites capitales,
 * le titre aligné à gauche et large, l'intro décalée dans la colonne de droite.
 * Référence assumée : la fiche technique d'un film, pas le hero centré habituel.
 */
export function PageHeader({
  eyebrow,
  titre,
  intro,
  aside,
}: {
  eyebrow: string;
  titre: string;
  intro?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="border-b border-ink/10 py-16 sm:py-24">
      <Container>
        <p className="eyebrow">{eyebrow}</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <h1 className="text-4xl sm:text-5xl lg:col-span-7 lg:text-6xl">{titre}</h1>
          {(intro || aside) && (
            <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
              {intro && <div className="measure text-lg text-ink-soft">{intro}</div>}
              {aside && <div className="mt-6">{aside}</div>}
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}

export function Section({
  children,
  className = "",
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={`py-16 sm:py-24 ${className}`} {...props}>
      {children}
    </section>
  );
}

/** Titre de section avec sa ligne de métadonnées. */
export function TitreSection({
  eyebrow,
  children,
  action,
}: {
  eyebrow?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
      <div>
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h2 className="text-3xl sm:text-4xl">{children}</h2>
      </div>
      {action}
    </div>
  );
}

type BoutonProps = {
  href: string;
  children: ReactNode;
  variante?: "primaire" | "secondaire" | "clair";
  className?: string;
};

export function Bouton({
  href,
  children,
  variante = "primaire",
  className = "",
}: BoutonProps) {
  const styles = {
    primaire:
      "bg-navy text-cream hover:bg-navy-deep border border-transparent",
    secondaire:
      "border border-navy/30 text-navy hover:border-navy hover:bg-navy hover:text-cream",
    clair: "bg-cream text-navy hover:bg-cream-deep border border-transparent",
  } as const;

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors duration-200 ${styles[variante]} ${className}`}
    >
      {children}
    </Link>
  );
}

/** Corps de texte long : mesure contrainte, hiérarchie lisible. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="measure space-y-5 text-ink-soft [&_a]:text-navy [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:text-ink [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:text-ink [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
      {children}
    </div>
  );
}

/** Liste de faits en deux colonnes, filets fins, chiffres alignés. */
export function ListeFaits({
  faits,
  className = "",
}: {
  faits: { label: string; valeur: ReactNode }[];
  className?: string;
}) {
  return (
    <dl className={`divide-y divide-ink/10 border-y border-ink/10 ${className}`}>
      {faits.map((fait) => (
        <div key={fait.label} className="grid grid-cols-3 gap-4 py-4">
          <dt className="eyebrow col-span-1 pt-0.5">{fait.label}</dt>
          <dd className="tnum col-span-2 text-sm font-medium">{fait.valeur}</dd>
        </div>
      ))}
    </dl>
  );
}
