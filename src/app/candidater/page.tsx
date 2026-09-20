import type { Metadata } from "next";
import { sessionsAVenir, getSession } from "@/content/sessions";
import { site } from "@/content/site";
import { periode } from "@/lib/dates";
import { duree, libellePrix } from "@/lib/format";
import { FormulaireCandidature } from "@/components/FormulaireCandidature";
import { Container, Email, PageHeader, Section } from "@/components/ui";
import { JsonLd, filAriane } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Candidater à une formation",
  description:
    "Déposez votre candidature à un stage de jeu face caméra : CV, lettre de motivation, " +
    "photo et bande-démo. Réponse rapide, puis devis et programme pour votre financement.",
  alternates: { canonical: "/candidater" },
  robots: { index: true, follow: true },
};

export const revalidate = 3600;

const suite = [
  {
    titre: "Nous accusons réception",
    texte: "Sous 48 heures ouvrées, par e-mail.",
  },
  {
    titre: "Nous échangeons",
    texte:
      "Un appel pour parler de votre parcours, de vos attentes et vérifier que la session " +
      "correspond à votre projet.",
  },
  {
    titre: "Nous préparons votre dossier",
    texte:
      "Une fois votre inscription validée, nous vous transmettons le devis et le programme " +
      "à déposer auprès de l'AFDAS ou de France Travail.",
  },
];

export default async function Candidater({
  searchParams,
}: {
  searchParams: Promise<{ session?: string }>;
}) {
  const { session: sessionDemandee } = await searchParams;
  const sessions = sessionsAVenir();
  const sessionCiblee = sessionDemandee ? getSession(sessionDemandee) : undefined;

  return (
    <>
      <PageHeader
        eyebrow="Candidature"
        titre={sessionCiblee ? "Candidater à cette session" : "Déposer une candidature"}
        intro={
          <p>
            Trois étapes, dix minutes. Nous revenons vers vous sous 48 heures ouvrées pour
            échanger avant toute démarche de financement.
          </p>
        }
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              {sessions.length > 0 ? (
                <FormulaireCandidature
                  sessions={sessions}
                  sessionInitiale={sessionCiblee?.slug}
                  emailContact={site.contact.email}
                />
              ) : (
                <p className="measure text-lg text-ink-soft">
                  Aucune session n'est ouverte à la candidature pour le moment.
                  Écrivez-nous à{" "}
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-navy underline underline-offset-4"
                  >
                    <Email adresse={site.contact.email} />
                  </a>{" "}
                  pour être prévenu·e.
                </p>
              )}
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              {sessionCiblee && (
                <div className="shape-cadre-sm mb-8 border border-navy/20 bg-cream-deep p-7">
                  <h2 className="eyebrow">Session sélectionnée</h2>
                  <p className="mt-4 font-[family-name:var(--font-display)] text-xl leading-snug">
                    {sessionCiblee.titre}
                  </p>
                  <p className="tnum mt-3 text-sm">
                    {periode(sessionCiblee.dateDebut, sessionCiblee.dateFin)}
                  </p>
                  <p className="tnum mt-1 text-sm text-ink-soft">
                    {duree(sessionCiblee)} · {sessionCiblee.lieu.ville} ·{" "}
                    {libellePrix(sessionCiblee)}
                  </p>
                  <p className="mt-4 text-sm text-ink-mute">
                    Vous pouvez encore la changer dans le formulaire.
                  </p>
                </div>
              )}

              <div className="border-t border-ink/15 pt-6">
                <h2 className="eyebrow">Ce qui se passe ensuite</h2>
                <ol className="mt-5">
                  {suite.map((etape, index) => (
                    <li
                      key={etape.titre}
                      className="grid grid-cols-[2rem_1fr] gap-4 border-b border-ink/10 py-5 last:border-0"
                    >
                      <span
                        aria-hidden="true"
                        className="tnum font-[family-name:var(--font-display)] text-lg text-terracotta"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block font-semibold">{etape.titre}</span>
                        <span className="mt-1 block text-sm text-ink-soft">
                          {etape.texte}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-8 border-t border-ink/15 pt-6">
                <h2 className="eyebrow">Une question d'abord ?</h2>
                <p className="tnum mt-4 text-lg">
                  <a
                    href={`tel:${site.contact.telephoneLien}`}
                    className="font-semibold text-navy underline underline-offset-4"
                  >
                    {site.contact.telephone}
                  </a>
                </p>
                <p className="mt-2 text-sm">
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-navy underline underline-offset-4"
                  >
                    <Email adresse={site.contact.email} />
                  </a>
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={filAriane([
          { nom: "Accueil", url: "/" },
          { nom: "Candidater", url: "/candidater" },
        ])}
      />
    </>
  );
}
