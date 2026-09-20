import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container, PageHeader, Prose, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site pleincadre-formation.com.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegales() {
  return (
    <>
      <PageHeader eyebrow="Informations légales" titre="Mentions légales" />

      <Section>
        <Container>
          <Prose>
            <p>
              Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la
              confiance en l'économie numérique, il est précisé aux utilisateurs du site{" "}
              {site.nomComplet} l'identité des différents intervenants dans le cadre de sa
              réalisation et de son suivi.
            </p>

            <h2>Édition du site</h2>
            <p>
              Le présent site, accessible à l'URL pleincadre-formation.com (le « Site »),
              est édité par : <strong>{site.legal.raisonSociale}</strong>, société au
              capital de {site.legal.capital}, inscrite au R.C.S. de Lyon sous le numéro{" "}
              {site.legal.rcs}, dont le siège social est situé au {site.siege.adresse},{" "}
              {site.siege.codePostal} {site.siege.ville}, représentée par{" "}
              {site.legal.representant}, dûment habilité.
            </p>
            <p>Le numéro individuel de TVA de l'éditeur est : {site.legal.tva}.</p>

            {/* TODO client — le numéro de déclaration d'activité d'organisme de formation
                était absent de l'ancien site alors qu'il est obligatoire. Dès qu'il est
                communiqué, renseigner site.legal.numeroDeclarationActivite. */}
            {site.legal.numeroDeclarationActivite && (
              <p>
                Déclaration d'activité de prestataire de formation enregistrée sous le
                numéro {site.legal.numeroDeclarationActivite} auprès du préfet de région
                Auvergne-Rhône-Alpes. Cet enregistrement ne vaut pas agrément de l'État.
              </p>
            )}

            <h2>Directrice de la publication</h2>
            <p>
              La directrice de la publication du Site est{" "}
              {site.legal.directricePublication}.
            </p>

            <h2>Hébergement</h2>
            <p>
              Le Site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA
              91723, États-Unis — <a href="https://vercel.com">vercel.com</a>.
            </p>

            <h2>Certification</h2>
            <p>
              {site.legal.raisonSociale} est certifié Qualiopi sous le numéro{" "}
              {site.qualiopi.numeroCertificat}, au titre de la catégorie «{" "}
              {site.qualiopi.categorie} ». La certification qualité a été délivrée au
              titre de cette catégorie d'action.
            </p>

            <h2>Nous contacter</h2>
            <ul>
              <li>
                Par téléphone :{" "}
                <a href={`tel:${site.contact.telephoneLien}`}>{site.contact.telephone}</a>
              </li>
              <li>
                Par e-mail :{" "}
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </li>
              <li>
                Par courrier : {site.lieux.paris.adresse}, {site.lieux.paris.codePostal}{" "}
                {site.lieux.paris.ville} — ou {site.siege.adresse},{" "}
                {site.siege.codePostal} {site.siege.ville}
              </li>
            </ul>

            <h2>Données personnelles</h2>
            <p>
              Le traitement de vos données à caractère personnel est régi par notre{" "}
              <a href="/confidentialite">politique de confidentialité</a>, conformément au
              Règlement général sur la protection des données 2016/679 du 27 avril 2016 («
              RGPD »).
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus présents sur le Site (textes, programmes de
              formation, images, identité visuelle) est la propriété de{" "}
              {site.legal.raisonSociale}, sauf mention contraire. Toute reproduction ou
              représentation, totale ou partielle, sans autorisation écrite préalable est
              interdite.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
