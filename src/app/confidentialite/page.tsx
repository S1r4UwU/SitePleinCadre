import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container, PageHeader, Prose, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Quelles données Plein Cadre Formation collecte, pourquoi, combien de temps, et " +
    "comment exercer vos droits.",
  alternates: { canonical: "/confidentialite" },
};

export default function Confidentialite() {
  return (
    <>
      <PageHeader
        eyebrow="Vos données"
        titre="Politique de confidentialité"
        intro={
          <p>
            Nous collectons le strict nécessaire au traitement de votre candidature et à
            la constitution de votre dossier de formation. Rien de plus.
          </p>
        }
      />

      <Section>
        <Container>
          <Prose>
            <h2>Responsable du traitement</h2>
            <p>
              {site.legal.raisonSociale} ({site.nomComplet}), {site.siege.adresse},{" "}
              {site.siege.codePostal} {site.siege.ville}. Contact :{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
            </p>

            <h2>Données collectées et finalités</h2>
            <ul>
              <li>
                <strong>Formulaire de candidature</strong> — prénom, nom, e-mail,
                téléphone, ville, date de naissance, session souhaitée, mode de
                financement envisagé, situation de handicap, message, CV, lettre de
                motivation, photo et lien de bande-démo. Finalité : étudier votre
                candidature, vous recontacter, et constituer le cas échéant votre dossier
                de formation et de financement.
              </li>
              <li>
                <strong>Date de naissance</strong> — nécessaire à l'établissement de la
                convention ou du contrat de formation professionnelle.
              </li>
              <li>
                <strong>Situation de handicap</strong> — renseignée volontairement, à
                seule fin d'anticiper les aménagements nécessaires avec notre référente
                handicap. Cette information n'entre pas dans la sélection des candidatures
                et vous pouvez choisir de ne pas la communiquer.
              </li>
            </ul>

            <h2>Base légale</h2>
            <p>
              Le traitement repose sur votre consentement, recueilli explicitement au
              moment de l'envoi du formulaire, et sur l'exécution de mesures
              précontractuelles puis du contrat de formation.
            </p>

            <h2>Destinataires</h2>
            <p>
              Vos données sont traitées par l'équipe pédagogique et administrative de{" "}
              {site.nomComplet}. Les éléments strictement nécessaires (devis, programme,
              convention) peuvent être transmis à votre organisme financeur — AFDAS,
              France Travail ou votre employeur — dans le cadre de votre demande de prise
              en charge. Aucune donnée n'est vendue ni cédée à des fins commerciales.
            </p>

            <h2>Durée de conservation</h2>
            <ul>
              <li>
                Candidature non retenue ou sans suite : <strong>12 mois</strong> à compter
                du dernier contact.
              </li>
              <li>
                Dossier de stagiaire : durée de la formation, puis conservation selon les
                obligations légales et les exigences de la certification Qualiopi.
              </li>
            </ul>

            <h2>Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification,
              d'effacement, de limitation, d'opposition et de portabilité de vos données.
              Pour les exercer, écrivez à{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. Vous
              pouvez également introduire une réclamation auprès de la CNIL (
              <a href="https://www.cnil.fr">cnil.fr</a>).
            </p>

            <h2>Cookies et mesure d'audience</h2>
            <p>
              Ce site ne dépose aucun cookie publicitaire et n'utilise aucun traceur
              nécessitant votre consentement. Aucun bandeau ne vous est donc imposé.
            </p>

            <h2>Sécurité</h2>
            <p>
              Le site est servi exclusivement en HTTPS. Les pièces que vous joignez à
              votre candidature nous sont transmises par courrier électronique chiffré en
              transit et ne sont pas stockées sur le site.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
