import { site } from "@/content/site";
import type { QuestionFaq, Session } from "@/content/types";
import { getIntervenants } from "@/content/intervenants";
import { dureeIso } from "./dates";

/**
 * Données structurées.
 *
 * L'ancien site n'exposait qu'un `WebSite` : aucun `Course`, aucune `Organization`.
 * Pour un organisme de formation, c'est la première chose que Google sait afficher
 * en résultat enrichi (dates de session, tarif, modalité, organisme).
 */

const ORGANISME_ID = `${site.url}/#organisme`;

export function organisationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": ORGANISME_ID,
    name: site.nomComplet,
    alternateName: site.nom,
    url: site.url,
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.telephoneLien,
    legalName: site.legal.raisonSociale,
    vatID: site.legal.tva,
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: site.lieux.lyon.adresse,
        postalCode: site.lieux.lyon.codePostal,
        addressLocality: site.lieux.lyon.ville,
        addressCountry: "FR",
      },
      {
        "@type": "PostalAddress",
        streetAddress: site.lieux.paris.adresse,
        postalCode: site.lieux.paris.codePostal,
        addressLocality: site.lieux.paris.ville,
        addressCountry: "FR",
      },
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: `Qualiopi — ${site.qualiopi.categorie}`,
      identifier: site.qualiopi.numeroCertificat,
    },
  };
}

export function coursJsonLd(session: Session) {
  const intervenants = getIntervenants(session.intervenants);

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: session.titre,
    description: session.resume,
    url: `${site.url}/formations/${session.slug}`,
    inLanguage: "fr",
    provider: { "@id": ORGANISME_ID },
    educationalLevel: "Formation professionnelle continue",
    teaches: session.objectifs,
    coursePrerequisites: session.prerequis,
    ...(intervenants.length > 0 && {
      instructor: intervenants.map((i) => ({
        "@type": "Person",
        name: i.nom,
        jobTitle: i.role,
      })),
    }),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      startDate: session.dateDebut,
      endDate: session.dateFin,
      courseWorkload: dureeIso(session.jours),
      maximumAttendeeCapacity: session.effectifMax,
      location: {
        "@type": "Place",
        name: session.lieu.nom ?? site.nomComplet,
        address: {
          "@type": "PostalAddress",
          streetAddress: session.lieu.adresse,
          postalCode: session.lieu.codePostal,
          addressLocality: session.lieu.ville,
          addressCountry: "FR",
        },
      },
    },
    ...(session.prix !== null && {
      offers: {
        "@type": "Offer",
        price: session.prix,
        priceCurrency: "EUR",
        category: "Formation professionnelle",
        availability:
          session.statut === "ouvert"
            ? "https://schema.org/InStock"
            : session.statut === "complet"
              ? "https://schema.org/SoldOut"
              : "https://schema.org/PreOrder",
        url: `${site.url}/candidater?session=${session.slug}`,
      },
    }),
  };
}

export function faqJsonLd(questions: QuestionFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.reponse },
    })),
  };
}

export function filAriane(elements: { nom: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: elements.map((e, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: e.nom,
      item: `${site.url}${e.url}`,
    })),
  };
}

/** Insertion d'un bloc JSON-LD dans le flux React. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
