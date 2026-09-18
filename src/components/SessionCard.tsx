import Link from "next/link";
import type { Session } from "@/content/types";
import { statutAffiche } from "@/content/sessions";
import { joursRestants, periodeCourte } from "@/lib/dates";
import { duree, libellePrix } from "@/lib/format";
import { Ardoise } from "./Ardoise";
import { Statut } from "./Statut";

export function SessionCard({
  session,
  priorite = false,
}: {
  session: Session;
  priorite?: boolean;
}) {
  const statut = statutAffiche(session);
  const restants = joursRestants(session.dateLimiteAfdas);
  const afdasUrgent = statut === "ouvert" && restants > 0 && restants <= 45;

  return (
    <article className="group shape-cadre-sm relative flex h-full flex-col overflow-hidden border border-ink/12 bg-cream transition-colors duration-300 hover:border-navy/35 focus-within:border-navy/35">
      <div className="aspect-[16/10] w-full overflow-hidden">
        <Ardoise session={session} priorite={priorite} />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <p className="eyebrow tnum">
          {session.lieu.ville} · {duree(session)}
        </p>

        <h3 className="text-xl leading-tight sm:text-2xl">
          <Link
            href={`/formations/${session.slug}`}
            className="before:absolute before:inset-0 before:content-[''] focus-visible:outline-none"
          >
            {session.titre}
          </Link>
        </h3>

        <p className="tnum text-sm font-semibold text-ink">
          <time dateTime={session.dateDebut}>
            {periodeCourte(session.dateDebut, session.dateFin)}
          </time>
        </p>

        <div>
          <Statut statut={statut} />
        </div>

        <p className="measure text-sm text-ink-soft">{session.resume}</p>

        {afdasUrgent && (
          <p className="tnum text-sm font-semibold text-terracotta-deep">
            Dossier AFDAS à déposer sous {restants} jour{restants > 1 ? "s" : ""}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-ink/10 pt-4">
          <p className="tnum text-sm font-semibold">{libellePrix(session)}</p>
          <span
            aria-hidden="true"
            className="text-sm font-semibold text-navy transition-transform duration-300 group-hover:translate-x-1"
          >
            Voir la session →
          </span>
        </div>
      </div>
    </article>
  );
}
