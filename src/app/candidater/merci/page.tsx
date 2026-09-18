import type { Metadata } from "next";
import { site } from "@/content/site";
import { Bouton, Container, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Candidature envoyée",
  description: "Votre candidature a bien été transmise à Plein Cadre Formation.",
  robots: { index: false, follow: true },
};

export default function Merci() {
  return (
    <Section className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">Candidature envoyée</p>
            <h1 className="mt-6 text-4xl sm:text-5xl">
              C'est reçu. Merci.
            </h1>
            <p className="measure mt-8 text-lg text-ink-soft">
              Nous accusons réception de votre candidature sous 48 heures ouvrées, puis
              nous vous appelons pour échanger sur votre parcours et vérifier que la session
              correspond à votre projet.
            </p>
            <p className="measure mt-5 text-lg text-ink-soft">
              Si votre formation passe par l'AFDAS ou France Travail, nous vous adresserons
              ensuite le devis et le programme à déposer. Pensez à la date limite indiquée
              sur la fiche de la session : c'est elle qui commande le calendrier.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Bouton href="/financement">Préparer mon financement</Bouton>
              <Bouton href="/formations" variante="secondaire">
                Voir les autres sessions
              </Bouton>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border-t border-ink/15 pt-6">
              <h2 className="eyebrow">Besoin de nous joindre</h2>
              <p className="tnum mt-5 text-lg">
                <a
                  href={`tel:${site.contact.telephoneLien}`}
                  className="font-semibold text-navy underline underline-offset-4"
                >
                  {site.contact.telephone}
                </a>
              </p>
              <p className="mt-2">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="break-all text-navy underline underline-offset-4"
                >
                  {site.contact.email}
                </a>
              </p>
              <p className="measure mt-6 text-sm text-ink-mute">
                Vous n'avez pas joint toutes vos pièces ? Envoyez-les simplement en réponse
                à notre e-mail de confirmation.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
