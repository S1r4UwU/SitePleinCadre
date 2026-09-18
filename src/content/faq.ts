import type { QuestionFaq } from "./types";

/**
 * FAQ — reprise des informations réellement publiées par l'organisme
 * (pages Financement, fiches formation, CGV de l'ancien site), restructurées
 * en questions telles que les posent les candidat·es.
 *
 * Sert aussi de surface SEO longue traîne : l'ancien site n'avait aucune page
 * répondant aux requêtes « financement AFDAS stage comédien », « stage jeu face
 * caméra Lyon », etc.
 */
export const faq: QuestionFaq[] = [
  {
    categorie: "financement",
    question: "Qui peut bénéficier d'un financement AFDAS ?",
    reponse:
      "Il faut justifier d'au moins 48 cachets d'intermittence sur les 24 derniers mois. " +
      "Une fois votre candidature validée par Plein Cadre, nous vous adressons le programme " +
      "de la formation et un devis, à transmettre à l'AFDAS depuis votre portail personnel, " +
      "accompagnés de votre CV et de votre lettre de motivation.",
  },
  {
    categorie: "financement",
    question: "Quel est le délai pour déposer un dossier AFDAS ?",
    reponse:
      "Le dossier doit être déposé au plus tard 3 semaines avant le début de la formation. " +
      "Chaque fiche de session affiche sa date limite exacte : c'est cette date qui fait foi, " +
      "pas celle du début du stage.",
  },
  {
    categorie: "financement",
    question: "Et si je suis inscrit·e à France Travail ?",
    reponse:
      "Vous devez être inscrit·e comme demandeur d'emploi. Pour connaître vos possibilités de " +
      "prise en charge, appelez directement le 3949. L'inscription doit être effectuée au plus " +
      "tard 1 mois avant le début de la formation.",
  },
  {
    categorie: "financement",
    question: "Puis-je financer la formation moi-même ?",
    reponse:
      "Oui, dans la limite des places disponibles. Contactez-nous par téléphone ou par e-mail " +
      "pour convenir des modalités. L'inscription doit être effectuée au plus tard 1 mois avant " +
      "le début de la formation.",
  },
  {
    categorie: "candidature",
    question: "Comment se passe la candidature ?",
    reponse:
      "Vous remplissez le formulaire en ligne en joignant votre CV, une lettre de motivation, " +
      "une photo en portrait et, si vous en avez une, le lien vers votre bande-démo. Nous " +
      "revenons vers vous pour échanger, puis nous vous adressons le devis et le programme " +
      "nécessaires à votre demande de financement.",
  },
  {
    categorie: "candidature",
    question: "Faut-il être comédien·ne professionnel·le ?",
    reponse:
      "Les formations sont ouvertes en priorité aux comédien·nes ayant déjà une expérience " +
      "professionnelle au théâtre et/ou dans l'audiovisuel et le cinéma. Il n'y a toutefois " +
      "aucun prérequis formel : écrivez-nous si vous avez un doute sur votre profil.",
  },
  {
    categorie: "deroulement",
    question: "Combien sommes-nous par stage ?",
    reponse:
      "12 stagiaires maximum. C'est le nombre qui permet à chacun·e de passer devant la caméra " +
      "plusieurs fois par jour et de bénéficier d'un retour personnalisé.",
  },
  {
    categorie: "deroulement",
    question: "Reçoit-on les images tournées pendant le stage ?",
    reponse:
      "Oui. Les rushes du stage sont remis aux stagiaires, et un certificat de bonne réalisation " +
      "est délivré à l'issue de la formation, en plus de l'attestation de fin de formation.",
  },
  {
    categorie: "deroulement",
    question: "Avec quel matériel travaille-t-on ?",
    reponse:
      "Caméra et cadreur·euse professionnel·le, grand écran de retour vidéo, micros et panneaux " +
      "LED. Toutes les scènes sont filmées dans des conditions professionnelles, puis visionnées " +
      "collectivement.",
  },
  {
    categorie: "deroulement",
    question: "Reçoit-on les scènes à l'avance ?",
    reponse:
      "Oui. En amont de la formation, les intervenant·es envoient aux stagiaires les scènes " +
      "à préparer pour chaque journée.",
  },
  {
    categorie: "pratique",
    question: "Où ont lieu les formations ?",
    reponse:
      "Les stages se déroulent en présentiel, au centre de formation situé 53 rue des Tables " +
      "Claudiennes, dans le 1er arrondissement de Lyon. Plein Cadre dispose également d'une " +
      "adresse à Paris, 38 rue de Torcy.",
  },
  {
    categorie: "pratique",
    question: "Je suis en situation de handicap, comment cela se passe-t-il ?",
    reponse:
      "Notre référente handicap, Edith Hennaut, est à votre écoute pour construire une solution " +
      "adaptée : joignez-la au 04 81 65 15 56. La question figure dans le formulaire de " +
      "candidature afin que nous puissions anticiper les aménagements nécessaires.",
  },
  {
    categorie: "pratique",
    question: "Puis-je annuler mon inscription ?",
    reponse:
      "L'annulation ou le report est sans frais si la demande écrite parvient au centre de " +
      "formation au moins 45 jours ouvrés avant le début de la formation. Un droit de " +
      "rétractation de 14 jours francs s'applique par ailleurs à compter de l'accusé de " +
      "réception de la commande, conformément à l'article L6353-5 du Code du travail.",
  },
];

export const categoriesFaq = [
  { id: "financement", titre: "Financement" },
  { id: "candidature", titre: "Candidature" },
  { id: "deroulement", titre: "Déroulement du stage" },
  { id: "pratique", titre: "Informations pratiques" },
] as const;
