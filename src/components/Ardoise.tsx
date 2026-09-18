import Image from "next/image";
import type { Session } from "@/content/types";
import { dateCourte } from "@/lib/dates";

/**
 * Visuel de session.
 *
 * Tant que le client n'a pas fourni son reportage photo, on n'affiche ni image de
 * banque d'images, ni capture d'écran recompressée, ni rectangle gris : on dessine
 * une ardoise de tournage renseignée avec les vraies données de la session.
 * Le jour où `session.image` existe, la photo prend sa place sans autre changement.
 */
export function Ardoise({
  session,
  priorite = false,
  className = "",
}: {
  session: Session;
  priorite?: boolean;
  className?: string;
}) {
  if (session.image) {
    return (
      <Image
        src={session.image.src}
        alt={session.image.alt}
        width={session.image.width}
        height={session.image.height}
        priority={priorite}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  const fonds = {
    navy: "bg-navy text-cream",
    indigo: "bg-indigo text-cream",
    terracotta: "bg-terracotta-deep text-cream",
  } as const;

  const lignes = [
    { label: "Prod.", valeur: "Plein Cadre" },
    { label: "Lieu", valeur: session.lieu.ville },
    { label: "Durée", valeur: `${session.heures} h — ${session.jours} j` },
    { label: "Date", valeur: dateCourte(session.dateDebut) },
  ];

  return (
    <div
      role="img"
      aria-label={`Ardoise de tournage : ${session.titre}, ${session.lieu.ville}, ${session.heures} heures sur ${session.jours} jours`}
      className={`relative flex h-full w-full flex-col justify-end overflow-hidden ${fonds[session.accent]} ${className}`}
    >
      {/* La barre claquante */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-9"
        style={{
          background:
            "repeating-linear-gradient(115deg, var(--color-cream) 0 22px, transparent 22px 44px)",
          opacity: 0.92,
        }}
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-9 h-px bg-cream/30" />

      <dl className="relative grid grid-cols-2 gap-x-5 gap-y-3 p-6 pt-16 sm:p-7 sm:pt-20">
        {lignes.map((ligne) => (
          <div key={ligne.label} className="border-t border-cream/25 pt-2">
            <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] opacity-75">
              {ligne.label}
            </dt>
            <dd className="tnum mt-0.5 text-sm font-semibold">{ligne.valeur}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
