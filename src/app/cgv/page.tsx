import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container, PageHeader, Prose, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente applicables aux inscriptions aux formations de " +
    "Plein Cadre Formation by ETL.",
  alternates: { canonical: "/cgv" },
};

/**
 * TODO client — reprise juridique à finaliser.
 *
 * Les articles ci-dessous sont repris du document publié sur l'ancien site. Les articles
 * suivants (au-delà du droit de rétractation) doivent être reportés depuis le document
 * source avant mise en ligne : responsabilité, force majeure, données personnelles,
 * règlement intérieur, litiges et médiation de la consommation.
 *
 * À faire trancher également : l'ancien site indiquait « S.A.R.L. » et le R.C.S.
 * « 48 230 367 » dans les CGV, contre « 448 230 367 » dans les mentions légales.
 * C'est ce dernier qui est retenu ici.
 */
export default function Cgv() {
  return (
    <>
      <PageHeader
        eyebrow="Informations légales"
        titre="Conditions générales de vente"
        intro={
          <p>
            Applicables aux inscriptions aux formations dispensées sur le territoire français.
          </p>
        }
      />

      <Section>
        <Container>
          <Prose>
            <p>
              Les présentes conditions générales de vente (ci-après « CGV ») sont proposées
              par l'<strong>{site.legal.raisonSociale}</strong>, société d'enseignement
              culturel spécialisée en art dramatique et cinéma, au capital de{" "}
              {site.legal.capital}, immatriculée au registre du commerce et des sociétés de
              Lyon sous le numéro {site.legal.rcs}, dont le siège social est situé{" "}
              {site.siege.adresse}, {site.siege.codePostal} {site.siege.ville}.
            </p>
            <p>Les présentes CGV sont conclues entre :</p>
            <ul>
              <li>
                la société {site.legal.raisonSociale} / {site.nom}, ci-après dénommée
                <strong> le Centre de formation</strong> ;
              </li>
              <li>
                et toute personne physique, particulier ou professionnel, de droit privé ou
                de droit public, souhaitant s'engager dans une ou plusieurs prestations
                fournies par le Centre de formation, ci-après dénommée{" "}
                <strong>le Stagiaire</strong>.
              </li>
            </ul>

            <h2>1. Application et opposabilité des CGV</h2>
            <p>
              Les présentes CGV s'appliquent à l'ensemble des prestations de formation
              proposées par le Centre de formation. Toute inscription à une formation
              implique l'acceptation sans réserve des CGV par le Stagiaire.
            </p>

            <h2>2. Offres et modalités d'inscription</h2>
            <p>
              Les formations proposées par le Centre de formation sont décrites sur le site{" "}
              <a href={site.siteFrere.url}>ecoledetheatredelyon.com</a> pour la formation
              initiale, ou sur le présent site pour les formations continues, ou encore dans
              la documentation commerciale. L'inscription devient effective après réception
              du formulaire d'inscription signé et du règlement des frais d'inscription, ou
              de tout document attestant d'une prise en charge par un tiers financeur.
            </p>

            <h3>2.1 La commande</h3>
            <p>
              Une fois la commande validée, le Stagiaire renseigne ses coordonnées et ses
              modalités de paiement, puis accepte les CGV, cette dernière étape formalisant
              le contrat de prestation. Le Centre de formation accuse réception de la commande
              par courrier électronique ; le contrat est conclu à la date et à l'heure de cet
              accusé de réception. Un courrier électronique ultérieur précise le lieu et
              l'heure de la convocation au stage. L'inscription doit être effectuée un mois au
              plus tard avant le début de la formation.
            </p>

            <h2>3. Conditions de paiement et financement</h2>
            <p>
              Les prix des formations sont indiqués en euros, toutes taxes comprises. Le
              règlement peut être effectué par virement, chèque ou tout autre moyen convenu
              avec le Centre de formation. Les factures sont payables à réception ou, le cas
              échéant, selon l'échéancier convenu entre les parties.
            </p>
            <p>
              En cas de financement par un tiers (AFDAS, France Travail, OPCO…), le Stagiaire
              doit fournir les documents nécessaires avant le début de la formation. À défaut,
              il reste personnellement redevable du montant total. Toute formation commencée
              est due en totalité.
            </p>

            <h2>4. Conditions d'annulation</h2>
            <p>
              Le Stagiaire peut demander l'annulation ou le report de sa participation sans
              frais, si la demande écrite parvient au Centre de formation au moins 45 jours
              ouvrés avant la date de la formation, par lettre recommandée avec accusé de
              réception. L'annulation ou le report est effectif après confirmation par le
              Centre de formation.
            </p>
            <p>
              En cas d'annulation moins de 45 jours ouvrés avant le début de la formation, le
              Centre de formation facturera au Stagiaire la totalité du prix de la formation.
              En cas d'absence, de retard, de participation partielle, d'abandon ou de
              cessation anticipée pour tout autre motif que la force majeure dûment reconnue,
              le Stagiaire est redevable de l'intégralité du montant de sa formation.
            </p>
            <p>
              Le Centre de formation se réserve le droit d'annuler ou de reporter une
              formation en cas de force majeure ou d'inscriptions insuffisantes, en informant
              le Stagiaire dans les meilleurs délais. Il se réserve également le droit, sans
              indemnité, d'exclure tout Stagiaire dont le comportement gênerait le bon
              déroulement des cours ou manquerait gravement au règlement intérieur.
            </p>

            <h3>4.1 Droit de rétractation</h3>
            <p>
              Conformément à l'article L6353-5 du Code du travail, et pour tout nouveau
              contrat souscrit, le Centre de formation accorde au Stagiaire un droit de
              rétractation de quatorze (14) jours francs à compter de la date de l'accusé de
              réception de la commande. Ce droit s'exerce par lettre recommandée avec accusé
              de réception et donne lieu au remboursement des sommes déjà versées, hors frais
              de droit de réservation, dans les meilleurs délais et au plus tard quatorze (14)
              jours après la réception de la demande.
            </p>

            <h2>5. Réclamations</h2>
            <p>
              Toute réclamation peut être adressée au Centre de formation via la page{" "}
              <a href="/reclamations">Réclamations</a> ou par e-mail à{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. Une réponse
              est apportée dans un délai de huit jours.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
