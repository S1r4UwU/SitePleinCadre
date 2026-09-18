import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSession, sessions, statutAffiche } from "@/content/sessions";
import { getIntervenants, monogramme } from "@/content/intervenants";
import { site } from "@/content/site";
import { dateLongue, joursRestants, periode } from "@/lib/dates";
import { duree, libellePrix } from "@/lib/format";
import { Ardoise } from "@/components/Ardoise";
import { Statut } from "@/components/Statut";
import { Bouton, Container, ListeFaits, Section } from "@/components/ui";
import { JsonLd, coursJsonLd, filAriane } from "@/lib/seo";

export const revalidate = 3600;

export function generateStaticParams() {
  return sessions.map((session) => ({ slug: session.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const session = getSession(slug);
  if (!session) return {};

  // Le titre est dérivé des données : impossible qu'il annonce « juin » pour un
  // stage de janvier, comme c'était le cas sur l'ancien site.
  const mois = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  }).format(new Date(`${session.dateDebut}T12:00:00Z`));

  return {
    title: `${session.titre} — ${session.lieu.ville}, ${mois}`,
    description: `${session.resume} ${duree(session)} à ${session.lieu.ville}. Formation conventionnée AFDAS et France Travail.`,
    alternates: { canonical: `/formations/${session.slug}` },
    openGraph: {
      title: `${session.titre} — ${session.lieu.ville}, ${mois}`,
      description: session.resume,
      type: "article",
    },
  };
}

export default async function FicheSession({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = getSession(slug);
  if (!session) notFound();

  const statut = statutAffiche(session);
  const equipe = getIntervenants(session.intervenants);
  const restantsAfdas = joursRestants(session.dateLimiteAfdas);
  const restantsFt = joursRestants(session.dateLimiteFranceTravail);

  return (
    <>
      {/* ------------------------------------------------------------ En-tête */}
      <header className="border-b border-ink/10">
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
                <Link href="/formations" className="underline-offset-4 hover:underline">
                  Formations
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {session.titre}
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="eyebrow tnum">
                {session.lieu.ville} · {duree(session)} · {session.effectifMax} stagiaires max.
              </p>
              <h1 className="mt-5 text-4xl sm:text-5xl">{session.titre}</h1>
              <p className="measure mt-5 font-[family-name:var(--font-display)] text-2xl text-ink-soft">
                {session.baseline}
              </p>
              <div className="mt-8">
                <Statut statut={statut} />
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <div className="shape-cadre-sm aspect-[4/3] overflow-hidden">
                <Ardoise session={session} priorite />
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* ------------------------------------------- Corps + colonne pratique */}
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Colonne pratique, collante au défilement */}
          <aside className="lg:col-span-4 lg:order-2">
            <div className="lg:sticky lg:top-28">
              <div className="shape-cadre-sm border border-navy/20 bg-cream-deep p-7">
                <h2 className="eyebrow">L'essentiel</h2>

                <p className="tnum mt-4 font-[family-name:var(--font-display)] text-2xl leading-snug">
                  <time dateTime={session.dateDebut}>
                    {periode(session.dateDebut, session.dateFin)}
                  </time>
                </p>

                <ListeFaits
                  className="mt-6"
                  faits={[
                    { label: "Durée", valeur: `${session.heures} h sur ${session.jours} jours` },
                    { label: "Horaires", valeur: session.horaires },
                    {
                      label: "Lieu",
                      valeur: `${session.lieu.adresse}, ${session.lieu.codePostal} ${session.lieu.ville}`,
                    },
                    { label: "Effectif", valeur: `${session.effectifMax} stagiaires maximum` },
                    { label: "Tarif", valeur: libellePrix(session) },
                  ]}
                />

                <div className="mt-7 space-y-3">
                  <h3 className="eyebrow">Dates limites de dossier</h3>
                  <p className="tnum text-sm">
                    <strong className="font-semibold">AFDAS</strong> —{" "}
                    {dateLongue(session.dateLimiteAfdas)}
                    {restantsAfdas > 0 && (
                      <span className="text-terracotta-deep">
                        {" "}
                        (dans {restantsAfdas} jour{restantsAfdas > 1 ? "s" : ""})
                      </span>
                    )}
                  </p>
                  <p className="tnum text-sm">
                    <strong className="font-semibold">France Travail</strong> —{" "}
                    {dateLongue(session.dateLimiteFranceTravail)}
                    {restantsFt > 0 && (
                      <span className="text-terracotta-deep">
                        {" "}
                        (dans {restantsFt} jour{restantsFt > 1 ? "s" : ""})
                      </span>
                    )}
                  </p>
                </div>

                <div className="mt-7 flex flex-col gap-3">
                  <Bouton href={`/candidater?session=${session.slug}`} className="w-full">
                    {statut === "ouvert"
                      ? "Candidater à cette session"
                      : "Être prévenu·e de l'ouverture"}
                  </Bouton>
                  <a
                    href={`tel:${site.contact.telephoneLien}`}
                    className="tnum inline-flex w-full items-center justify-center rounded-full border border-navy/30 px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-cream"
                  >
                    {site.contact.telephone}
                  </a>
                </div>

                <p className="mt-5 text-xs text-ink-mute">
                  Formation conventionnée AFDAS et France Travail — organisme certifié
                  Qualiopi n° {site.qualiopi.numeroCertificat}.
                </p>
              </div>
            </div>
          </aside>

          {/* Contenu pédagogique */}
          <div className="lg:col-span-7 lg:order-1">
            {session.description && (
              <section className="measure space-y-5 text-lg text-ink-soft">
                {session.description.map((paragraphe) => (
                  <p key={paragraphe.slice(0, 40)}>{paragraphe}</p>
                ))}
              </section>
            )}

            {!session.description && (
              <p className="measure text-lg text-ink-soft">{session.resume}</p>
            )}

            <section id="objectifs" className="mt-16">
              <h2 className="text-2xl sm:text-3xl">Objectifs pédagogiques</h2>
              <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
                {session.objectifs.map((objectif) => (
                  <li key={objectif} className="measure py-4 text-ink-soft">
                    {objectif}
                  </li>
                ))}
              </ul>
            </section>

            {session.competencesVisees && (
              <section id="competences" className="mt-16">
                <h2 className="text-2xl sm:text-3xl">Compétences visées</h2>
                <p className="measure mt-4 text-ink-soft">
                  À l'issue de la formation, le·la stagiaire aura développé les compétences
                  nécessaires pour :
                </p>
                <ul className="mt-6 space-y-4">
                  {session.competencesVisees.map((competence, index) => (
                    <li
                      key={competence.slice(0, 40)}
                      className="grid grid-cols-[2.5rem_1fr] gap-4"
                    >
                      <span
                        aria-hidden="true"
                        className="tnum font-[family-name:var(--font-display)] text-lg text-terracotta"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="measure text-ink-soft">{competence}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section id="programme" className="mt-16">
              <h2 className="text-2xl sm:text-3xl">Programme</h2>
              {session.programmeIntro && (
                <p className="measure mt-4 text-ink-soft">{session.programmeIntro}</p>
              )}
              <ol className="mt-8">
                {session.programme.map((jour) => (
                  <li
                    key={jour.intitule}
                    className="border-t border-ink/12 py-7 first:border-t-0 first:pt-0"
                  >
                    <h3 className="eyebrow">{jour.intitule}</h3>
                    {jour.texte && (
                      <p className="measure mt-3 text-ink-soft">{jour.texte}</p>
                    )}
                    {jour.points && (
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-soft marker:text-terracotta">
                        {jour.points.map((point) => (
                          <li key={point.slice(0, 40)} className="measure pl-1">
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </section>

            <section id="intervenants" className="mt-16">
              <h2 className="text-2xl sm:text-3xl">Les intervenant·es</h2>
              {equipe.length > 0 ? (
                <ul className="mt-8 space-y-8">
                  {equipe.map((personne) => (
                    <li key={personne.slug} className="grid grid-cols-[4.5rem_1fr] gap-5">
                      <span
                        aria-hidden="true"
                        className="shape-cadre-sm flex aspect-square items-center justify-center bg-navy font-[family-name:var(--font-display)] text-xl text-cream"
                      >
                        {monogramme(personne.nom)}
                      </span>
                      <div>
                        <h3 className="text-xl">
                          <Link
                            href={`/intervenants/${personne.slug}`}
                            className="underline-offset-4 hover:underline"
                          >
                            {personne.nom}
                          </Link>
                        </h3>
                        <p className="eyebrow mt-1">{personne.role}</p>
                        <p className="measure mt-3 text-ink-soft">{personne.bio}</p>
                        {personne.references && (
                          <p className="mt-2 text-sm text-ink-mute">
                            Notamment : {personne.references.join(", ")}.
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="measure mt-4 text-ink-soft">
                  Les intervenant·es de cette session sont en cours de validation. Écrivez-nous
                  à{" "}
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-navy underline underline-offset-4"
                  >
                    {site.contact.email}
                  </a>{" "}
                  pour être informé·e dès leur annonce.
                </p>
              )}
            </section>

            <section id="modalites" className="mt-16">
              <h2 className="text-2xl sm:text-3xl">Modalités</h2>

              <h3 className="mt-8 text-xl">Pour qui ?</h3>
              <p className="measure mt-3 text-ink-soft">{session.publicVise}</p>

              <h3 className="mt-8 text-xl">Prérequis</h3>
              <p className="measure mt-3 text-ink-soft">{session.prerequis}</p>

              <h3 className="mt-8 text-xl">Modalités d'évaluation</h3>
              <p className="measure mt-3 text-ink-soft">{session.modalitesEvaluation}</p>

              <div className="mt-10 grid gap-10 sm:grid-cols-2">
                <div>
                  <h3 className="eyebrow">Moyens techniques</h3>
                  <ul className="mt-4 space-y-2 text-ink-soft">
                    {session.moyensTechniques.map((moyen) => (
                      <li key={moyen} className="border-b border-ink/10 pb-2 text-sm">
                        {moyen}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="eyebrow">Livrables</h3>
                  <ul className="mt-4 space-y-2 text-ink-soft">
                    {session.livrables.map((livrable) => (
                      <li key={livrable} className="border-b border-ink/10 pb-2 text-sm">
                        {livrable}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Indicateurs Qualiopi — affichés seulement s'ils existent.
                Sur l'ancien site, ces titres étaient suivis de rien. */}
            {(session.tauxSatisfaction !== undefined || session.resultatsObtenus) && (
              <section id="resultats" className="mt-16">
                <h2 className="text-2xl sm:text-3xl">Résultats</h2>
                {session.tauxSatisfaction !== undefined && (
                  <p className="tnum mt-6 font-[family-name:var(--font-display)] text-4xl">
                    {session.tauxSatisfaction} %{" "}
                    <span className="font-[family-name:var(--font-sans)] text-base font-normal text-ink-soft">
                      de satisfaction sur la dernière édition
                    </span>
                  </p>
                )}
                {session.resultatsObtenus && (
                  <p className="measure mt-4 text-ink-soft">{session.resultatsObtenus}</p>
                )}
              </section>
            )}

            <section id="candidater" className="mt-16 border-t border-ink/10 pt-10">
              <h2 className="text-2xl sm:text-3xl">Candidater</h2>
              <p className="measure mt-4 text-ink-soft">
                Un seul chemin : le formulaire en ligne. Vous y joignez votre CV, votre lettre
                de motivation, une photo en portrait et, si vous en avez une, le lien de votre
                bande-démo. Nous revenons vers vous pour échanger, puis nous vous adressons le
                devis et le programme nécessaires à votre demande de financement.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Bouton href={`/candidater?session=${session.slug}`}>
                  Déposer ma candidature
                </Bouton>
                <Bouton href="/financement" variante="secondaire">
                  Comment financer ce stage
                </Bouton>
              </div>
            </section>
          </div>
        </div>
      </Container>

      <Section className="border-t border-ink/10">
        <Container>
          <Link
            href="/formations"
            className="text-sm font-semibold text-navy underline-offset-4 hover:underline"
          >
            ← Toutes les sessions
          </Link>
        </Container>
      </Section>

      <JsonLd data={coursJsonLd(session)} />
      <JsonLd
        data={filAriane([
          { nom: "Accueil", url: "/" },
          { nom: "Formations", url: "/formations" },
          { nom: session.titre, url: `/formations/${session.slug}` },
        ])}
      />
    </>
  );
}
