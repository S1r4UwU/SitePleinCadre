import type { Metadata } from "next";
import Link from "next/link";
import { sessionsAVenir, sessionsOuvertes, statutAffiche } from "@/content/sessions";
import { intervenants, monogramme } from "@/content/intervenants";
import { temoignages } from "@/content/temoignages";
import { site } from "@/content/site";
import { dateLongue, joursRestants, periode } from "@/lib/dates";
import { duree, libellePrix } from "@/lib/format";
import { SessionCard } from "@/components/SessionCard";
import { Statut } from "@/components/Statut";
import { Bouton, Container, Section, TitreSection } from "@/components/ui";

export const metadata: Metadata = {
  title: `${site.nom} — ${site.baseline} à Lyon et Paris`,
  description: site.description,
  alternates: { canonical: "/" },
};

// Les compteurs de jours restants sont calculés côté serveur : on régénère chaque heure.
export const revalidate = 3600;

const chiffres = [
  { valeur: "12", label: "stagiaires maximum par session" },
  { valeur: "35 h", label: "de pratique filmée en cinq jours" },
  { valeur: "100 %", label: "de prise en charge possible par l'AFDAS" },
  { valeur: "15 ans", label: "d'expérience en pédagogie" },
];

const etapes = [
  {
    titre: "Vous recevez les scènes avant le stage",
    texte:
      "Les intervenant·es envoient les séquences à préparer en amont. On arrive avec du travail, " +
      "pas avec une feuille blanche.",
  },
  {
    titre: "Vous jouez, filmé·e en conditions professionnelles",
    texte:
      "Caméra et cadreur·euse, retour vidéo sur grand écran, micros, panneaux LED. Ce sont les " +
      "conditions d'un plateau, pas celles d'une salle de cours.",
  },
  {
    titre: "Vous êtes dirigé·e par quelqu'un qui distribue des films",
    texte:
      "Directeur·ices de casting, réalisateur·ices, agent·es artistiques : des professionnel·les " +
      "en activité, qui formulent leurs vraies attentes.",
  },
  {
    titre: "Vous vous regardez, et vous recommencez",
    texte:
      "Visionnage collectif l'après-midi, analyse de chaque proposition, reprise avec de " +
      "nouvelles consignes. Les rushes vous sont remis à la fin.",
  },
];

export default function Accueil() {
  const prochaines = sessionsAVenir();
  const ouvertes = sessionsOuvertes();
  const vedette = ouvertes[0] ?? prochaines[0];
  const restantsAfdas = vedette ? joursRestants(vedette.dateLimiteAfdas) : 0;
  const castingDirectors = intervenants.filter((i) => i.metier === "directeur-casting");
  const temoignage = temoignages[0];

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="border-b border-ink/10">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="eyebrow">
                Lyon &amp; Paris · Formation professionnelle continue
              </p>

              <h1 className="mt-6 text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.98]">
                Stages intensifs de jeu face caméra
              </h1>

              <p className="measure mt-8 text-lg text-ink-soft sm:text-xl">
                Cinq jours face à celles et ceux qui distribuent les films. Vous travaillez
                vos scènes, vous êtes dirigé·e, vous êtes filmé·e — et vous voyez ce que ça
                donne à l'image.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Bouton href="/formations">Voir les prochaines sessions</Bouton>
                <Bouton href="/financement" variante="secondaire">
                  Faire financer sa formation
                </Bouton>
              </div>
            </div>

            {/* Colonne de droite : la prochaine session, tout de suite actionnable. */}
            {vedette && (
              <div className="lg:col-span-4 lg:col-start-9">
                <div className="shape-cadre-sm border border-navy/20 bg-cream-deep p-7">
                  <p className="eyebrow">Prochaine session</p>

                  <h2 className="mt-4 text-2xl leading-tight">
                    <Link
                      href={`/formations/${vedette.slug}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {vedette.titre}
                    </Link>
                  </h2>

                  <p className="tnum mt-4 text-sm font-semibold">
                    <time dateTime={vedette.dateDebut}>
                      {periode(vedette.dateDebut, vedette.dateFin)}
                    </time>
                  </p>
                  <p className="tnum mt-1 text-sm text-ink-soft">
                    {duree(vedette)} · {vedette.lieu.ville} · {libellePrix(vedette)}
                  </p>

                  <div className="mt-5">
                    <Statut statut={statutAffiche(vedette)} />
                  </div>

                  {restantsAfdas > 0 && (
                    <p className="tnum mt-5 border-t border-navy/15 pt-5 text-sm text-terracotta-deep">
                      <strong className="font-semibold">
                        Plus que {restantsAfdas} jour{restantsAfdas > 1 ? "s" : ""}
                      </strong>{" "}
                      pour déposer un dossier AFDAS — jusqu'au{" "}
                      {dateLongue(vedette.dateLimiteAfdas)}.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Chiffres — une ligne de faits, filets fins, pas de cartes ni d'icônes */}
          <dl className="mt-20 grid gap-px border-t border-ink/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {chiffres.map((chiffre) => (
              <div key={chiffre.label} className="pr-6">
                <dt className="sr-only">{chiffre.label}</dt>
                <dd>
                  <span className="tnum block font-[family-name:var(--font-display)] text-4xl">
                    {chiffre.valeur}
                  </span>
                  <span className="mt-2 block text-sm text-ink-soft">{chiffre.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* -------------------------------------------------- Prochaines sessions */}
      <Section>
        <Container>
          <TitreSection
            eyebrow="Le calendrier"
            action={
              <Bouton href="/formations" variante="secondaire">
                Les {prochaines.length} sessions à venir
              </Bouton>
            }
          >
            Prochaines sessions
          </TitreSection>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {prochaines.slice(0, 3).map((session, index) => (
              <SessionCard key={session.slug} session={session} priorite={index === 0} />
            ))}
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------- Déroulement */}
      <Section className="border-y border-ink/10 bg-cream-deep">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="eyebrow">La méthode</p>
              <h2 className="mt-5 text-3xl sm:text-4xl">
                Ce qui se passe réellement pendant cinq jours
              </h2>
              <p className="measure mt-6 text-ink-soft">
                Pas de théorie du jeu : des mises en situation, filmées, reprises, analysées.
                Le stage se déroule en présentiel, en groupe de douze au maximum.
              </p>
            </div>

            <ol className="lg:col-span-7 lg:col-start-6">
              {etapes.map((etape, index) => (
                <li
                  key={etape.titre}
                  className="grid grid-cols-[3rem_1fr] gap-5 border-t border-ink/12 py-7 first:border-t-0 first:pt-0"
                >
                  <span
                    aria-hidden="true"
                    className="tnum font-[family-name:var(--font-display)] text-2xl text-terracotta"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl">{etape.titre}</h3>
                    <p className="measure mt-2 text-ink-soft">{etape.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- Intervenants */}
      <Section>
        <Container>
          <TitreSection
            eyebrow="Qui vous dirige"
            action={
              <Bouton href="/intervenants" variante="secondaire">
                Tou·tes les intervenant·es
              </Bouton>
            }
          >
            Des professionnel·les en activité
          </TitreSection>

          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {castingDirectors.map((personne) => (
              <li key={personne.slug}>
                <Link
                  href={`/intervenants/${personne.slug}`}
                  className="group block focus-visible:outline-none"
                >
                  <span className="shape-cadre-sm flex aspect-[4/5] items-end justify-start border border-ink/12 bg-navy p-5 transition-colors duration-300 group-hover:bg-navy-deep group-focus-visible:ring-2 group-focus-visible:ring-terracotta group-focus-visible:ring-offset-2">
                    <span
                      aria-hidden="true"
                      className="font-[family-name:var(--font-display)] text-5xl text-cream/90"
                    >
                      {monogramme(personne.nom)}
                    </span>
                  </span>
                  <span className="mt-4 block font-semibold underline-offset-4 group-hover:underline">
                    {personne.nom}
                  </span>
                  <span className="mt-1 block text-sm text-ink-soft">{personne.role}</span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-sm text-ink-mute">
            Portraits en cours de mise à jour — les intervenant·es de chaque session sont
            annoncé·es sur sa fiche.
          </p>
        </Container>
      </Section>

      {/* -------------------------------------------------------- Financement */}
      <Section className="bg-terracotta-deep text-cream">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow text-cream/85">Financement</p>
              <h2 className="mt-5 text-3xl sm:text-4xl">
                La plupart de nos stagiaires ne paient pas leur formation
              </h2>
              <p className="measure mt-6 text-cream/90">
                Plein Cadre est certifié Qualiopi (n° {site.qualiopi.numeroCertificat}) :
                nos formations sont conventionnées AFDAS et France Travail. Reste à déposer
                le dossier dans les délais — c'est là que tout se joue.
              </p>
              <div className="mt-8">
                <Bouton href="/financement" variante="clair">
                  Voir les trois dispositifs
                </Bouton>
              </div>
            </div>

            <dl className="lg:col-span-6 lg:col-start-7">
              {[
                {
                  titre: "AFDAS",
                  texte:
                    "Pour les intermittent·es justifiant de 48 cachets sur 24 mois. Prise en charge possible à 100 %. Dossier à déposer 3 semaines avant le début du stage.",
                },
                {
                  titre: "France Travail",
                  texte:
                    "Pour les demandeur·euses d'emploi. Possibilités à vérifier au 3949. Inscription au plus tard 1 mois avant.",
                },
                {
                  titre: "Financement personnel ou entreprise",
                  texte:
                    "Dans la limite des places disponibles. Échelonnement possible, à convenir avec le centre de formation.",
                },
              ].map((item) => (
                <div key={item.titre} className="border-t border-cream/25 py-7 first:border-t-0 first:pt-0">
                  <dt className="font-[family-name:var(--font-display)] text-2xl">
                    {item.titre}
                  </dt>
                  <dd className="measure mt-2 text-cream/90">{item.texte}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- Témoignage */}
      {temoignage && (
        <Section>
          <Container>
            <figure className="grid gap-8 lg:grid-cols-12">
              <figcaption className="lg:col-span-3">
                <p className="eyebrow">Témoignage</p>
                <p className="mt-4 font-semibold">{temoignage.auteur}</p>
                <p className="mt-1 text-sm text-ink-soft">
                  stagiaire sur « {temoignage.formation} »
                </p>
              </figcaption>
              <blockquote className="lg:col-span-8 lg:col-start-5">
                <p className="font-[family-name:var(--font-display)] text-2xl leading-snug sm:text-3xl">
                  « {temoignage.citation} »
                </p>
              </blockquote>
            </figure>
          </Container>
        </Section>
      )}

      {/* ---------------------------------------------------------- CTA final */}
      <Section className="border-t border-ink/10">
        <Container>
          <div className="shape-cadre bg-navy px-8 py-16 text-cream sm:px-16 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="text-3xl sm:text-4xl">
                  Candidater prend dix minutes
                </h2>
                <p className="measure mt-5 text-cream/90">
                  CV, lettre de motivation, une photo en portrait et, si vous en avez une,
                  votre bande-démo. Nous revenons vers vous rapidement pour échanger, puis
                  nous vous transmettons le devis et le programme nécessaires à votre
                  demande de financement.
                </p>
              </div>
              <div className="flex items-end lg:col-span-4 lg:col-start-9">
                <div className="flex flex-wrap gap-4">
                  <Bouton href="/candidater" variante="clair">
                    Déposer ma candidature
                  </Bouton>
                  <a
                    href={`tel:${site.contact.telephoneLien}`}
                    className="tnum inline-flex items-center rounded-full border border-cream/35 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-cream/10"
                  >
                    {site.contact.telephone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
