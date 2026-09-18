import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container, PageHeader, Prose, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Accessibilité",
  description:
    "Démarche d'accessibilité du site de Plein Cadre Formation et accueil des stagiaires " +
    "en situation de handicap.",
  alternates: { canonical: "/accessibilite" },
};

export default function Accessibilite() {
  return (
    <>
      <PageHeader
        eyebrow="Accessibilité"
        titre="Notre démarche d'accessibilité"
        intro={
          <p>
            Un organisme qui affiche une référente handicap doit avoir un site que tout le
            monde peut utiliser. Voici où nous en sommes.
          </p>
        }
      />

      <Section>
        <Container>
          <Prose>
            <h2>Niveau visé</h2>
            <p>
              Ce site est conçu pour respecter le niveau <strong>AA</strong> des règles pour
              l'accessibilité des contenus web (WCAG 2.1). Concrètement :
            </p>
            <ul>
              <li>un seul titre de niveau 1 par page et une hiérarchie de titres continue ;</li>
              <li>
                un contraste d'au moins 4,5:1 entre le texte et son fond, y compris pour les
                mentions secondaires ;
              </li>
              <li>
                une navigation complète au clavier, avec un indicateur de focus visible sur
                tous les éléments interactifs ;
              </li>
              <li>
                des formulaires avec de vraies étiquettes, des groupes de boutons radio, et
                des messages d'erreur reliés à leur champ ;
              </li>
              <li>
                des alternatives textuelles rédigées pour les images porteuses d'information ;
              </li>
              <li>
                aucun élément flottant ne recouvre un bouton ou un texte ;
              </li>
              <li>
                les animations sont désactivées si votre système signale une préférence pour
                un mouvement réduit.
              </li>
            </ul>

            <h2>Points connus à améliorer</h2>
            <ul>
              <li>
                Les portraits des intervenant·es ne sont pas encore publiés ; l'affichage
                actuel repose sur un monogramme, annoncé comme tel aux technologies
                d'assistance.
              </li>
              <li>
                Aucun audit d'accessibilité externe n'a encore été réalisé sur cette version
                du site.
              </li>
            </ul>

            <h2>Accueil des stagiaires en situation de handicap</h2>
            <p>
              {site.nomComplet} s'inscrit dans une politique d'égalité des chances. Notre
              référente handicap, <strong>{site.referenteHandicap.nom}</strong>, est à votre
              écoute pour étudier les aménagements possibles avant, pendant et après la
              formation :{" "}
              <a href={`tel:${site.referenteHandicap.telephoneLien}`}>
                {site.referenteHandicap.telephone}
              </a>
              .
            </p>

            <h2>Signaler un problème</h2>
            <p>
              Si vous rencontrez une difficulté d'accès à une information ou à une
              fonctionnalité de ce site, écrivez-nous à{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. Nous nous
              engageons à vous répondre sous huit jours et à vous transmettre l'information
              recherchée par un autre moyen dans l'intervalle.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
