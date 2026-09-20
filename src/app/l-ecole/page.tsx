import type { Metadata } from "next";
import { site } from "@/content/site";
import { Bouton, Container, PageHeader, Section } from "@/components/ui";
import { JsonLd, filAriane } from "@/lib/seo";

export const metadata: Metadata = {
  title: "L'école — qui sommes-nous",
  description:
    "Plein Cadre Formation by ETL : une équipe de réalisateur·ices, comédien·nes, " +
    "directeur·ices de casting et agents artistiques en activité, forte de plus de 15 ans " +
    "d'expérience en pédagogie. Organisme certifié Qualiopi.",
  alternates: { canonical: "/l-ecole" },
};

const valeurs = [
  {
    titre: "Le partage",
    texte:
      "Transmettre est pour nous l'occasion d'apprendre encore plus de notre métier. " +
      "Les intervenant·es viennent avec leur pratique du moment, pas avec un cours figé.",
  },
  {
    titre: "L'écoute",
    texte:
      "Douze stagiaires au maximum, un suivi personnalisé. Chacun·e passe devant la caméra " +
      "plusieurs fois par jour et reçoit un retour individuel.",
  },
  {
    titre: "La bienveillance",
    texte:
      "L'exigence du plateau n'oblige à aucune brutalité. On travaille dans un cadre où " +
      "l'erreur fait partie du processus.",
  },
  {
    titre: "Les conditions professionnelles",
    texte:
      "Caméra, cadreur·euse, retour vidéo, micros, lumière. Ce qu'on apprend ici est " +
      "directement transposable sur un tournage.",
  },
];

export default function Ecole() {
  return (
    <>
      <PageHeader
        eyebrow="L'école"
        titre="Une équipe de professionnel·les en activité"
        intro={
          <p>
            Plein Cadre Formation est dirigé par des réalisateur·ices, comédien·nes,
            directeur·ices de casting et agent·es artistiques qui exercent leur métier au
            quotidien.
          </p>
        }
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="measure space-y-6 text-lg text-ink-soft">
                <p>
                  Forts d'une expérience de plus de quinze ans dans le domaine de la
                  formation, notre credo est la transmission — car transmettre est aussi,
                  pour nous, l'occasion d'apprendre encore plus de notre métier.
                </p>
                <p>
                  Une forte envie de transmettre, donc, mais aussi celle de mettre en
                  relation les professionnel·les et les stagiaires, dans des conditions
                  réellement professionnelles.
                </p>
                <p>
                  Nous apportons une attention particulière à chaque stagiaire par un
                  suivi personnalisé, et nous mettons à disposition les moyens techniques
                  nécessaires pour que l'environnement de travail soit le plus proche
                  possible d'un plateau.
                </p>
                <p className="font-[family-name:var(--font-display)] text-2xl text-ink">
                  Plein Cadre Formation by ETL est un espace pour oser expérimenter,
                  apprendre des autres et s'épanouir dans son métier.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <div className="shape-cadre-sm border border-navy/20 bg-cream-deep p-7">
                <h2 className="eyebrow">Notre organisme</h2>
                <dl className="mt-5 space-y-5 text-sm">
                  <div>
                    <dt className="font-semibold">Formation continue</dt>
                    <dd className="mt-1 text-ink-soft">
                      Stages de jeu face caméra à Lyon et Paris, tout au long de l'année.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Formation initiale</dt>
                    <dd className="mt-1 text-ink-soft">
                      L'{site.siteFrere.nom}, notre centre de formation initiale à Lyon.{" "}
                      <a
                        href={site.siteFrere.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-navy underline underline-offset-4"
                      >
                        Voir le site
                        <span className="sr-only"> (nouvel onglet)</span>
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Certification</dt>
                    <dd className="tnum mt-1 text-ink-soft">
                      Qualiopi n° {site.qualiopi.numeroCertificat} —{" "}
                      {site.qualiopi.categorie.toLowerCase()}. Nos modules sont référencés
                      au catalogue de l'AFDAS.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-ink/10 bg-cream-deep">
        <Container>
          <h2 className="text-3xl sm:text-4xl">Ce à quoi nous tenons</h2>
          <dl className="mt-10 grid gap-x-16 gap-y-10 sm:grid-cols-2">
            {valeurs.map((valeur) => (
              <div key={valeur.titre} className="border-t border-ink/15 pt-6">
                <dt className="font-[family-name:var(--font-display)] text-2xl">
                  {valeur.titre}
                </dt>
                <dd className="measure mt-3 text-ink-soft">{valeur.texte}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-3xl">Personnes en situation de handicap</h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="measure space-y-5 text-ink-soft">
                <p>
                  Plein Cadre Formation by ETL s'inscrit dans une politique d'égalité des
                  chances, afin de permettre à tou·tes nos stagiaires d'accéder à nos
                  formations.
                </p>
                <p>
                  Pour toute personne en situation de handicap souhaitant suivre l'une de
                  nos formations, notre équipe est à son écoute pour construire une
                  solution adaptée.
                </p>
                <p className="text-ink">
                  Notre référente handicap, <strong>{site.referenteHandicap.nom}</strong>,
                  se tient à votre disposition pour toute question concernant les
                  dispositifs disponibles, au{" "}
                  <a
                    href={`tel:${site.referenteHandicap.telephoneLien}`}
                    className="tnum font-semibold text-navy underline underline-offset-4"
                  >
                    {site.referenteHandicap.telephone}
                  </a>
                  .
                </p>
              </div>
              <div className="mt-8">
                <Bouton href="/accessibilite" variante="secondaire">
                  Notre démarche d'accessibilité
                </Bouton>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-ink/10">
        <Container>
          <h2 className="text-3xl sm:text-4xl">Nos adresses</h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            {[site.lieux.lyon, site.lieux.paris].map((lieu) => (
              <div key={lieu.ville} className="border-t border-ink/15 pt-6">
                <h3 className="font-[family-name:var(--font-display)] text-2xl">
                  {lieu.ville}
                </h3>
                <address className="mt-3 not-italic text-ink-soft">
                  {lieu.adresse}
                  <br />
                  {lieu.codePostal} {lieu.ville}
                </address>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-ink-mute">
            Siège social : {site.legal.raisonSociale}, {site.siege.adresse},{" "}
            {site.siege.codePostal} {site.siege.ville}.
          </p>
        </Container>
      </Section>

      <JsonLd
        data={filAriane([
          { nom: "Accueil", url: "/" },
          { nom: "L'école", url: "/l-ecole" },
        ])}
      />
    </>
  );
}
