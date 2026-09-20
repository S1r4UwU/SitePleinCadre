import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container, Email, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Réclamations",
  description:
    "Formuler une réclamation auprès de Plein Cadre Formation : procédure et délai de réponse.",
  alternates: { canonical: "/reclamations" },
};

const etapes = [
  {
    titre: "Vous nous écrivez",
    texte:
      "Par e-mail, en décrivant la situation, la formation concernée et la date. Joignez " +
      "tout élément utile.",
  },
  {
    titre: "Nous accusons réception",
    texte: "Sous 48 heures ouvrées, avec le nom de la personne qui suit votre dossier.",
  },
  {
    titre: "Nous vous répondons sous huit jours",
    texte:
      "Avec les mesures prises ou proposées. Si un délai supplémentaire est nécessaire, " +
      "nous vous en informons et nous vous indiquons une échéance.",
  },
];

export default function Reclamations() {
  return (
    <>
      <PageHeader
        eyebrow="Qualité"
        titre="Formuler une réclamation"
        intro={
          <p>
            Un désaccord, un problème pendant un stage, une question restée sans réponse :
            dites-le nous. Le traitement des réclamations fait partie de notre démarche
            qualité Qualiopi.
          </p>
        }
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="eyebrow">Nous écrire</h2>
              <p className="mt-5 text-lg">
                <a
                  href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Réclamation")}`}
                  className="font-semibold text-navy underline underline-offset-4"
                >
                  <Email adresse={site.contact.email} />
                </a>
              </p>
              <p className="tnum mt-3 text-lg">
                <a
                  href={`tel:${site.contact.telephoneLien}`}
                  className="text-navy underline underline-offset-4"
                >
                  {site.contact.telephone}
                </a>
              </p>
              <p className="measure mt-6 text-sm text-ink-soft">
                Par courrier : {site.legal.raisonSociale}, {site.siege.adresse},{" "}
                {site.siege.codePostal} {site.siege.ville}.
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <h2 className="eyebrow">Comment nous traitons votre réclamation</h2>
              <ol className="mt-5">
                {etapes.map((etape, index) => (
                  <li
                    key={etape.titre}
                    className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-ink/12 py-6 first:border-t-0 first:pt-0"
                  >
                    <span
                      aria-hidden="true"
                      className="tnum font-[family-name:var(--font-display)] text-xl text-terracotta"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-lg font-semibold">{etape.titre}</span>
                      <span className="measure mt-1.5 block text-ink-soft">
                        {etape.texte}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
