import type { Metadata } from "next";
import { satisfaction, satisfactionPubliable, temoignages } from "@/content/temoignages";
import { site } from "@/content/site";
import { Bouton, Container, PageHeader, Section } from "@/components/ui";
import { JsonLd, filAriane } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Témoignages de stagiaires",
  description:
    "Ce que disent les comédien·nes passé·es par nos stages de jeu face caméra à Lyon et Paris.",
  alternates: { canonical: "/temoignages" },
};

export default function Temoignages() {
  return (
    <>
      <PageHeader
        eyebrow="Témoignages"
        titre="Ce qu'en disent les stagiaires"
        intro={
          <p>
            Les retours sont recueillis à l'issue de chaque session, dans le cadre de notre
            démarche qualité Qualiopi.
          </p>
        }
      />

      <Section>
        <Container>
          {temoignages.length > 0 ? (
            <ul className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {temoignages.map((temoignage) => (
                <li key={temoignage.auteur + temoignage.citation.slice(0, 20)}>
                  <figure className="border-t border-ink/15 pt-8">
                    <blockquote>
                      <p className="font-[family-name:var(--font-display)] text-2xl leading-snug">
                        « {temoignage.citation} »
                      </p>
                    </blockquote>
                    <figcaption className="mt-6 text-sm">
                      <span className="font-semibold">{temoignage.auteur}</span>
                      <span className="block text-ink-soft">
                        stagiaire sur « {temoignage.formation} »
                        {temoignage.annee ? ` — ${temoignage.annee}` : ""}
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ) : (
            <p className="measure text-lg text-ink-soft">
              Les premiers retours de la saison seront publiés ici prochainement.
            </p>
          )}
        </Container>
      </Section>

      <Section className="border-t border-ink/10">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl">Taux de satisfaction</h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              {/* Un chiffre non sourcé est un point faible en audit Qualiopi :
                  tant que la base de calcul n'est pas fournie, on l'annonce
                  session par session plutôt que comme un chiffre global. */}
              {satisfactionPubliable ? (
                <>
                  <p className="tnum font-[family-name:var(--font-display)] text-6xl">
                    {satisfaction.taux} %
                  </p>
                  <p className="measure mt-4 text-ink-soft">
                    Sur {satisfaction.repondants} répondant·es — {satisfaction.periode}.
                  </p>
                </>
              ) : (
                <p className="measure text-ink-soft">
                  Le taux de satisfaction est publié sur la fiche de chaque session, avec sa
                  période de référence. La dernière édition du stage « L'acteur·rice dirigé·e
                  par deux réalisateur·rices » a recueilli 100 % de satisfaction.
                </p>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-ink/10">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <p className="measure text-ink-soft">
              Vous avez suivi l'un de nos stages ? Votre retour nous aide à progresser :
              écrivez-nous à{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="text-navy underline underline-offset-4"
              >
                {site.contact.email}
              </a>
              .
            </p>
            <Bouton href="/formations" variante="secondaire">
              Voir les sessions
            </Bouton>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={filAriane([
          { nom: "Accueil", url: "/" },
          { nom: "Témoignages", url: "/temoignages" },
        ])}
      />
    </>
  );
}
