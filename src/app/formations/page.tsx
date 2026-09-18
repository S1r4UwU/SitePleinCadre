import type { Metadata } from "next";
import { sessionsAVenir, sessionsPassees } from "@/content/sessions";
import { site } from "@/content/site";
import { SessionCard } from "@/components/SessionCard";
import { Bouton, Container, PageHeader, Section } from "@/components/ui";
import { JsonLd, filAriane } from "@/lib/seo";
import { periodeCourte } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Stages de jeu face caméra — calendrier des sessions",
  description:
    "Toutes les sessions à venir : dates, durée, tarif, date limite de dépôt du dossier AFDAS. " +
    "Formations certifiées Qualiopi à Lyon et Paris, conventionnées AFDAS et France Travail.",
  alternates: { canonical: "/formations" },
};

export const revalidate = 3600;

export default function Formations() {
  const aVenir = sessionsAVenir();
  const passees = sessionsPassees();

  return (
    <>
      <PageHeader
        eyebrow={`${aVenir.length} sessions à venir`}
        titre="Le calendrier des stages"
        intro={
          <p>
            Chaque session affiche ses dates réelles, son tarif et la date limite de dépôt
            du dossier AFDAS. C'est cette dernière qui commande le calendrier, pas la date
            du stage.
          </p>
        }
        aside={
          <p className="text-sm text-ink-mute">
            Organisme certifié Qualiopi n° {site.qualiopi.numeroCertificat} — formations
            conventionnées AFDAS et France Travail.
          </p>
        }
      />

      <Section>
        <Container>
          {aVenir.length > 0 ? (
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {aVenir.map((session, index) => (
                <li key={session.slug} className="flex">
                  <SessionCard session={session} priorite={index < 3} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="measure text-lg text-ink-soft">
              Aucune session n'est programmée pour le moment. Écrivez-nous à{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="text-navy underline underline-offset-4"
              >
                {site.contact.email}
              </a>{" "}
              pour être prévenu·e de l'ouverture du prochain calendrier.
            </p>
          )}
        </Container>
      </Section>

      {passees.length > 0 && (
        <Section className="border-t border-ink/10">
          <Container>
            <h2 className="text-2xl">Sessions passées</h2>
            <p className="measure mt-3 text-ink-soft">
              Ces stages sont terminés. Ils reviennent régulièrement au calendrier :
              dites-nous lequel vous intéresse.
            </p>
            <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              {passees.map((session) => (
                <li
                  key={session.slug}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-4"
                >
                  <span className="font-medium text-ink-soft">{session.titre}</span>
                  <span className="tnum text-sm text-ink-mute">
                    {periodeCourte(session.dateDebut, session.dateFin)} · {session.lieu.ville}
                  </span>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <Section className="border-t border-ink/10">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl">Une question avant de candidater ?</h2>
              <p className="measure mt-5 text-ink-soft">
                Sur votre éligibilité AFDAS, votre niveau, le déroulé d'une journée :
                la réponse est souvent dans la FAQ, sinon appelez-nous.
              </p>
            </div>
            <div className="flex flex-wrap items-end gap-4 lg:col-span-4 lg:col-start-9">
              <Bouton href="/faq" variante="secondaire">
                Questions fréquentes
              </Bouton>
              <Bouton href="/candidater">Candidater</Bouton>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={filAriane([
          { nom: "Accueil", url: "/" },
          { nom: "Formations", url: "/formations" },
        ])}
      />
    </>
  );
}
