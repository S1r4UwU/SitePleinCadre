import type { Metadata } from "next";
import { categoriesFaq, faq } from "@/content/faq";
import { site } from "@/content/site";
import { Bouton, Container, PageHeader, Section } from "@/components/ui";
import { JsonLd, faqJsonLd, filAriane } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "Financement AFDAS et France Travail, candidature, déroulement d'un stage, matériel, " +
    "effectifs, annulation : les réponses aux questions que se posent les comédien·nes.",
  alternates: { canonical: "/faq" },
};

export default function Faq() {
  return (
    <>
      <PageHeader
        eyebrow="Questions fréquentes"
        titre="Les questions qu'on nous pose"
        intro={
          <p>
            Si la vôtre n'y figure pas, appelez-nous au{" "}
            <a
              href={`tel:${site.contact.telephoneLien}`}
              className="tnum text-navy underline underline-offset-4"
            >
              {site.contact.telephone}
            </a>
            .
          </p>
        }
      />

      {categoriesFaq.map((categorie) => {
        const questions = faq.filter((q) => q.categorie === categorie.id);
        if (questions.length === 0) return null;

        return (
          <Section key={categorie.id} id={categorie.id} className="border-b border-ink/10">
            <Container>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <h2 className="text-3xl">{categorie.titre}</h2>
                </div>

                <div className="lg:col-span-7 lg:col-start-6">
                  {/* <details> natif : ouverture sans JavaScript, accessible au clavier
                      et interrogeable par la recherche du navigateur. */}
                  <div className="divide-y divide-ink/12 border-y border-ink/12">
                    {questions.map((question) => (
                      <details key={question.question} className="group py-5">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-medium marker:content-none">
                          {question.question}
                          <span
                            aria-hidden="true"
                            className="mt-1.5 shrink-0 text-terracotta transition-transform duration-200 group-open:rotate-45"
                          >
                            <svg viewBox="0 0 16 16" width="16" height="16">
                              <path
                                d="M8 2v12M2 8h12"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                        </summary>
                        <p className="measure mt-4 text-ink-soft">{question.reponse}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </Section>
        );
      })}

      <Section>
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <p className="measure text-ink-soft">
              Votre question n'est pas là ? Nous répondons vite, et par téléphone c'est
              encore plus rapide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Bouton href="/contact" variante="secondaire">
                Nous écrire
              </Bouton>
              <Bouton href="/candidater">Candidater</Bouton>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={filAriane([
          { nom: "Accueil", url: "/" },
          { nom: "Questions fréquentes", url: "/faq" },
        ])}
      />
    </>
  );
}
