import type { Metadata } from "next";
import { site } from "@/content/site";
import { Bouton, Container, Email, PageHeader, Section } from "@/components/ui";
import { JsonLd, filAriane } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Joindre Plein Cadre Formation : téléphone, e-mail, adresses à Lyon et Paris, " +
    "référente handicap.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        titre="Parlons de votre projet"
        intro={
          <p>
            Pour une question sur une session, sur votre éligibilité à un financement ou
            sur votre candidature : le téléphone reste le plus rapide.
          </p>
        }
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="eyebrow">Contact formation</h2>
              <p className="tnum mt-5 font-[family-name:var(--font-display)] text-4xl">
                <a
                  href={`tel:${site.contact.telephoneLien}`}
                  className="underline-offset-8 hover:underline"
                >
                  {site.contact.telephone}
                </a>
              </p>
              <p className="mt-4 text-lg">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-navy underline underline-offset-4"
                >
                  <Email adresse={site.contact.email} />
                </a>
              </p>

              <h2 className="eyebrow mt-12">Référente handicap</h2>
              <p className="mt-5 text-lg">
                {site.referenteHandicap.nom}
                <br />
                <a
                  href={`tel:${site.referenteHandicap.telephoneLien}`}
                  className="tnum text-navy underline underline-offset-4"
                >
                  {site.referenteHandicap.telephone}
                </a>
              </p>
              <p className="measure mt-3 text-sm text-ink-soft">
                Pour toute question sur les aménagements possibles avant, pendant et après
                la formation.
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <h2 className="eyebrow">Nos adresses</h2>
              <div className="mt-5 space-y-8">
                <div className="border-t border-ink/15 pt-6">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl">
                    Lyon — centre de formation
                  </h3>
                  <address className="mt-2 not-italic text-ink-soft">
                    {site.lieux.lyon.adresse}
                    <br />
                    {site.lieux.lyon.codePostal} {site.lieux.lyon.ville}
                  </address>
                  <p className="mt-3 text-sm text-ink-mute">
                    C'est ici que se déroulent les stages. Métro Croix-Paquet ou Hôtel de
                    Ville, pentes de la Croix-Rousse.
                  </p>
                </div>

                <div className="border-t border-ink/15 pt-6">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl">
                    Paris
                  </h3>
                  <address className="mt-2 not-italic text-ink-soft">
                    {site.lieux.paris.adresse}
                    <br />
                    {site.lieux.paris.codePostal} {site.lieux.paris.ville}
                  </address>
                </div>

                <div className="border-t border-ink/15 pt-6">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl">
                    Siège social
                  </h3>
                  <address className="mt-2 not-italic text-ink-soft">
                    {site.legal.raisonSociale}
                    <br />
                    {site.siege.adresse}
                    <br />
                    {site.siege.codePostal} {site.siege.ville}
                  </address>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-ink/10">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl">Vous souhaitez candidater ?</h2>
              <p className="measure mt-5 text-ink-soft">
                Passez directement par le formulaire de candidature : il nous transmet
                tout ce dont nous avons besoin pour vous répondre et préparer votre
                dossier de financement.
              </p>
            </div>
            <div className="flex items-end lg:col-span-4 lg:col-start-9">
              <Bouton href="/candidater">Déposer ma candidature</Bouton>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={filAriane([
          { nom: "Accueil", url: "/" },
          { nom: "Contact", url: "/contact" },
        ])}
      />
    </>
  );
}
