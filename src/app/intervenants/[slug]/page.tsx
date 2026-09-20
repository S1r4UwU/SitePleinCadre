import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getIntervenant,
  intervenants,
  metiers,
  monogramme,
} from "@/content/intervenants";
import { sessions, statutAffiche } from "@/content/sessions";
import { periodeCourte } from "@/lib/dates";
import { Statut } from "@/components/Statut";
import { Bouton, Container, Section } from "@/components/ui";
import { JsonLd, filAriane } from "@/lib/seo";
import { site } from "@/content/site";

export function generateStaticParams() {
  return intervenants.map((personne) => ({ slug: personne.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const personne = getIntervenant(slug);
  if (!personne) return {};

  return {
    title: `${personne.nom} — ${personne.role}`,
    description: personne.bio,
    alternates: { canonical: `/intervenants/${personne.slug}` },
  };
}

export default async function FicheIntervenant({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const personne = getIntervenant(slug);
  if (!personne) notFound();

  const sessionsLiees = sessions.filter((s) => s.intervenants.includes(personne.slug));

  return (
    <>
      <Container className="py-12 sm:py-16">
        <nav aria-label="Fil d'ariane" className="mb-10 text-sm text-ink-mute">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="underline-offset-4 hover:underline">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/intervenants" className="underline-offset-4 hover:underline">
                Intervenant·es
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {personne.nom}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <span
              aria-hidden="true"
              className="shape-cadre-sm flex aspect-[4/5] items-end bg-navy p-6 font-[family-name:var(--font-display)] text-6xl text-cream/90"
            >
              {monogramme(personne.nom)}
            </span>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            <p className="eyebrow">{metiers[personne.metier].singulier}</p>
            <h1 className="mt-5 text-4xl sm:text-5xl">{personne.nom}</h1>
            <p className="mt-3 font-[family-name:var(--font-display)] text-2xl text-ink-soft">
              {personne.role}
            </p>

            <p className="measure mt-8 text-lg text-ink-soft">{personne.bio}</p>

            {personne.references && personne.references.length > 0 && (
              <div className="mt-10">
                <h2 className="eyebrow">Notamment</h2>
                <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                  {personne.references.map((reference) => (
                    <li key={reference} className="py-3 font-medium">
                      {reference}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>

      {sessionsLiees.length > 0 && (
        <Section className="border-t border-ink/10">
          <Container>
            <h2 className="text-2xl sm:text-3xl">
              {sessionsLiees.length > 1 ? "Sessions concernées" : "Session concernée"}
            </h2>
            <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              {sessionsLiees.map((session) => (
                <li key={session.slug} className="py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
                    <h3 className="text-xl">
                      <Link
                        href={`/formations/${session.slug}`}
                        className="underline-offset-4 hover:underline"
                      >
                        {session.titre}
                      </Link>
                    </h3>
                    <p className="tnum text-sm text-ink-soft">
                      {periodeCourte(session.dateDebut, session.dateFin)} ·{" "}
                      {session.lieu.ville}
                    </p>
                  </div>
                  <div className="mt-3">
                    <Statut statut={statutAffiche(session)} />
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <Section className="border-t border-ink/10">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <p className="measure text-sm text-ink-mute">
              Une question sur les intervenant·es d'une session ? Écrivez-nous à{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="text-navy underline underline-offset-4"
              >
                {site.contact.email}
              </a>
              .
            </p>
            <Bouton href="/intervenants" variante="secondaire">
              ← Tou·tes les intervenant·es
            </Bouton>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={filAriane([
          { nom: "Accueil", url: "/" },
          { nom: "Intervenant·es", url: "/intervenants" },
          { nom: personne.nom, url: `/intervenants/${personne.slug}` },
        ])}
      />
    </>
  );
}
