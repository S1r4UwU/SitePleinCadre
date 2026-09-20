import type { Metadata } from "next";
import Link from "next/link";
import { intervenants, metiers, monogramme } from "@/content/intervenants";
import type { MetierIntervenant } from "@/content/types";
import { site } from "@/content/site";
import { Bouton, Container, PageHeader, Section } from "@/components/ui";
import { JsonLd, filAriane } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Les intervenant·es",
  description:
    "Directeur·ices de casting, réalisateur·ices, agent·es artistiques et acteur·ices en " +
    "activité : celles et ceux qui dirigent les stages de jeu face caméra de Plein Cadre.",
  alternates: { canonical: "/intervenants" },
};

const ordre: MetierIntervenant[] = [
  "directeur-casting",
  "realisateur",
  "agent",
  "acteur",
  "autre",
];

export default function Intervenants() {
  return (
    <>
      <PageHeader
        eyebrow="Qui vous dirige"
        titre="Les intervenant·es de Plein Cadre"
        intro={
          <p>
            Des professionnel·les du cinéma, de l'audiovisuel et du théâtre, en activité.
            Ils et elles mettent leur savoir-faire au service de la transmission — et
            formulent devant vous les attentes qu'ils ont en casting.
          </p>
        }
      />

      {ordre.map((metier) => {
        const groupe = intervenants.filter((i) => i.metier === metier);
        const infos = metiers[metier];

        return (
          <Section key={metier} className="border-b border-ink/10">
            <Container>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <h2 className="text-3xl">{infos.pluriel}</h2>
                  <p className="measure mt-5 text-ink-soft">{infos.chapeau}</p>
                </div>

                <div className="lg:col-span-7 lg:col-start-6">
                  {groupe.length > 0 ? (
                    <ul className="grid gap-8 sm:grid-cols-2">
                      {groupe.map((personne) => (
                        <li key={personne.slug}>
                          <Link
                            href={`/intervenants/${personne.slug}`}
                            className="group block focus-visible:outline-none"
                          >
                            <span className="shape-cadre-sm flex aspect-[4/5] items-end border border-ink/12 bg-navy p-6 transition-colors duration-300 group-hover:bg-navy-deep group-focus-visible:ring-2 group-focus-visible:ring-terracotta group-focus-visible:ring-offset-2">
                              <span
                                aria-hidden="true"
                                className="font-[family-name:var(--font-display)] text-5xl text-cream/90"
                              >
                                {monogramme(personne.nom)}
                              </span>
                            </span>
                            <span className="mt-4 block text-lg font-semibold underline-offset-4 group-hover:underline">
                              {personne.nom}
                            </span>
                            <span className="mt-1 block text-sm text-ink-soft">
                              {personne.role}
                            </span>
                            {personne.references && (
                              <span className="mt-2 block text-sm text-ink-mute">
                                {personne.references.slice(0, 2).join(" · ")}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    /* Chez Wix, ces catégories menaient à un 404 ou à une galerie vide
                       affichant le texte d'aide de l'éditeur. Ici, on dit les choses. */
                    <div className="shape-cadre-sm border border-dashed border-ink/25 p-8">
                      <p className="measure text-ink-soft">
                        Les intervenant·es de cette catégorie sont annoncé·es session par
                        session. Consultez les fiches du calendrier, ou écrivez-nous à{" "}
                        <a
                          href={`mailto:${site.contact.email}`}
                          className="text-navy underline underline-offset-4"
                        >
                          {site.contact.email}
                        </a>
                        .
                      </p>
                      <div className="mt-6">
                        <Bouton href="/formations" variante="secondaire">
                          Voir le calendrier
                        </Bouton>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </Section>
        );
      })}

      <Section>
        <Container>
          <p className="measure text-sm text-ink-mute">
            Les portraits des intervenant·es sont en cours de mise à jour. Aucune photo
            n'est affichée tant que nous n'avons pas l'autorisation des personnes
            concernées.
          </p>
        </Container>
      </Section>

      <JsonLd
        data={filAriane([
          { nom: "Accueil", url: "/" },
          { nom: "Intervenant·es", url: "/intervenants" },
        ])}
      />
    </>
  );
}
