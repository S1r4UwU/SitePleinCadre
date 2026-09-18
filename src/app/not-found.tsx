import type { Metadata } from "next";
import { Bouton, Container, Section } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

/**
 * L'ancien site servait une page 404 en anglais.
 */
export default function Introuvable() {
  return (
    <Section className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">Erreur 404</p>
            <h1 className="mt-6 text-4xl sm:text-5xl">Coupez. On la refait.</h1>
            <p className="measure mt-8 text-lg text-ink-soft">
              Cette page n'existe pas, ou plus. Si vous êtes arrivé·e ici depuis un lien
              enregistré, notre site a changé d'adresses : le calendrier des sessions est
              désormais sur la page Formations.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Bouton href="/formations">Voir les sessions</Bouton>
              <Bouton href="/" variante="secondaire">
                Retour à l'accueil
              </Bouton>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border-t border-ink/15 pt-6">
              <h2 className="eyebrow">Vous cherchiez</h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <a href="/formations" className="underline-offset-4 hover:underline">
                    Le calendrier des stages
                  </a>
                </li>
                <li>
                  <a href="/intervenants" className="underline-offset-4 hover:underline">
                    Les intervenant·es
                  </a>
                </li>
                <li>
                  <a href="/financement" className="underline-offset-4 hover:underline">
                    Le financement AFDAS
                  </a>
                </li>
                <li>
                  <a href="/candidater" className="underline-offset-4 hover:underline">
                    Le formulaire de candidature
                  </a>
                </li>
              </ul>
              <p className="mt-6 text-sm text-ink-mute">
                Ou appelez-nous au{" "}
                <a
                  href={`tel:${site.contact.telephoneLien}`}
                  className="tnum text-navy underline underline-offset-4"
                >
                  {site.contact.telephone}
                </a>
                .
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
