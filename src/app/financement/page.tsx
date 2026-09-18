import type { Metadata } from "next";
import { sessionsOuvertes } from "@/content/sessions";
import { site } from "@/content/site";
import { dateLongue, joursRestants } from "@/lib/dates";
import { Bouton, Container, PageHeader, Section } from "@/components/ui";
import { JsonLd, filAriane } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Financer sa formation — AFDAS, France Travail, financement personnel",
  description:
    "Comment faire financer un stage de jeu face caméra : conditions AFDAS (48 cachets sur " +
    "24 mois), France Travail, financement personnel. Délais, démarches et dates limites.",
  alternates: { canonical: "/financement" },
};

export const revalidate = 3600;

const dispositifs = [
  {
    id: "afdas",
    nom: "AFDAS",
    pour: "Intermittent·es du spectacle et de l'audiovisuel",
    condition: "Au moins 48 cachets sur les 24 derniers mois",
    delai: "Dossier à déposer au plus tard 3 semaines avant le début de la formation",
    priseEnCharge: "Jusqu'à 100 % du coût de la formation",
    etapes: [
      "Vous candidatez auprès de Plein Cadre et votre inscription est validée.",
      "Nous vous adressons le programme de la formation et un devis.",
      "Vous transmettez ces documents à l'AFDAS depuis votre portail personnel, accompagnés de votre CV et de votre lettre de motivation.",
      "L'AFDAS instruit votre demande et vous notifie sa décision.",
    ],
    liens: [
      {
        libelle: "Conditions et dispositifs AFDAS pour les intermittent·es",
        url: "https://www.afdas.com/particulier/connaitre-les-dispositifs-et-les-modalites-dacces-a-la-formation/intermittents-du-spectacle-et-de-laudiovisuel.html",
      },
      {
        libelle: "Tutoriel vidéo : créer son portail AFDAS",
        url: "https://www.youtube.com/watch?v=L8G6znerGZs",
      },
      {
        libelle: "Tutoriel vidéo : remplir sa demande de financement",
        url: "https://www.youtube.com/watch?v=Hf_xcRD4mf8",
      },
    ],
  },
  {
    id: "france-travail",
    nom: "France Travail",
    pour: "Demandeur·euses d'emploi inscrit·es",
    condition: "Être inscrit·e comme demandeur d'emploi",
    delai: "Inscription au plus tard 1 mois avant le début de la formation",
    priseEnCharge: "Variable selon votre situation et votre projet",
    etapes: [
      "Appelez le 3949 pour faire le point sur vos droits à la formation.",
      "Candidatez auprès de Plein Cadre : nous vous fournissons devis et programme.",
      "Déposez votre demande auprès de votre conseiller·ère.",
    ],
    liens: [],
  },
  {
    id: "personnel",
    nom: "Financement personnel ou entreprise",
    pour: "Toute personne hors dispositif, ou prise en charge par son employeur",
    condition: "Dans la limite des places disponibles",
    delai: "Inscription au plus tard 1 mois avant le début de la formation",
    priseEnCharge: "Modalités à convenir directement avec le centre de formation",
    etapes: [
      "Contactez-nous par téléphone ou par e-mail.",
      "Nous convenons ensemble des modalités de règlement.",
    ],
    liens: [],
  },
];

export default function Financement() {
  const ouvertes = sessionsOuvertes();

  return (
    <>
      <PageHeader
        eyebrow="Financement"
        titre="Vous n'avez sans doute pas à payer cette formation"
        intro={
          <p>
            Plein Cadre est un organisme certifié Qualiopi n° {site.qualiopi.numeroCertificat} :
            nos stages sont conventionnés AFDAS et France Travail. Toute la difficulté est
            dans les délais — voici lesquels.
          </p>
        }
      />

      {/* Échéances réelles, tirées des sessions ouvertes */}
      {ouvertes.length > 0 && (
        <Section className="border-b border-ink/10 bg-cream-deep">
          <Container>
            <h2 className="text-2xl sm:text-3xl">Les prochaines échéances</h2>
            <p className="measure mt-4 text-ink-soft">
              La date qui compte n'est pas celle du stage, c'est celle du dépôt de dossier.
            </p>
            <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              {ouvertes.map((session) => {
                const restants = joursRestants(session.dateLimiteAfdas);
                return (
                  <li key={session.slug} className="py-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <p className="font-medium">{session.titre}</p>
                      <p className="tnum text-sm">
                        AFDAS avant le {dateLongue(session.dateLimiteAfdas)}
                        {restants > 0 && (
                          <span className="font-semibold text-terracotta-deep">
                            {" "}
                            — dans {restants} jour{restants > 1 ? "s" : ""}
                          </span>
                        )}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Container>
        </Section>
      )}

      {dispositifs.map((dispositif) => (
        <Section key={dispositif.id} id={dispositif.id} className="border-b border-ink/10">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <h2 className="text-3xl sm:text-4xl">{dispositif.nom}</h2>
                <dl className="mt-8 space-y-5 text-sm">
                  <div>
                    <dt className="eyebrow">Pour qui</dt>
                    <dd className="mt-1.5 text-ink-soft">{dispositif.pour}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Condition</dt>
                    <dd className="mt-1.5 text-ink-soft">{dispositif.condition}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Prise en charge</dt>
                    <dd className="mt-1.5 text-ink-soft">{dispositif.priseEnCharge}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Délai</dt>
                    <dd className="mt-1.5 font-semibold text-terracotta-deep">
                      {dispositif.delai}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <h3 className="eyebrow">Les étapes</h3>
                <ol className="mt-5">
                  {dispositif.etapes.map((etape, index) => (
                    <li
                      key={etape.slice(0, 30)}
                      className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-ink/12 py-5 first:border-t-0 first:pt-0"
                    >
                      <span
                        aria-hidden="true"
                        className="tnum font-[family-name:var(--font-display)] text-xl text-terracotta"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="measure text-ink-soft">{etape}</span>
                    </li>
                  ))}
                </ol>

                {/* Les URL de l'ancien site étaient collées en texte brut. */}
                {dispositif.liens.length > 0 && (
                  <ul className="mt-8 space-y-3">
                    {dispositif.liens.map((lien) => (
                      <li key={lien.url}>
                        <a
                          href={lien.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-navy underline underline-offset-4 hover:text-terracotta-deep"
                        >
                          {lien.libelle}
                          <span className="sr-only"> (nouvel onglet)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                {dispositif.id === "france-travail" && (
                  <p className="tnum mt-8 text-lg">
                    France Travail —{" "}
                    <a href="tel:3949" className="font-semibold text-navy underline underline-offset-4">
                      3949
                    </a>
                  </p>
                )}

                {dispositif.id === "personnel" && (
                  <p className="mt-8 text-lg">
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="font-semibold text-navy underline underline-offset-4"
                    >
                      {site.contact.email}
                    </a>{" "}
                    ·{" "}
                    <a
                      href={`tel:${site.contact.telephoneLien}`}
                      className="tnum font-semibold text-navy underline underline-offset-4"
                    >
                      {site.contact.telephone}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl">Vous ne savez pas où vous en êtes ?</h2>
              <p className="measure mt-5 text-ink-soft">
                Appelez-nous : en dix minutes nous saurons quel dispositif vous concerne et
                sous quel délai il faut déposer. C'est plus rapide que de chercher seul·e.
              </p>
            </div>
            <div className="flex flex-wrap items-end gap-4 lg:col-span-4 lg:col-start-9">
              <Bouton href="/faq" variante="secondaire">
                Questions fréquentes
              </Bouton>
              <Bouton href="/contact">Nous contacter</Bouton>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={filAriane([
          { nom: "Accueil", url: "/" },
          { nom: "Financement", url: "/financement" },
        ])}
      />
    </>
  );
}
