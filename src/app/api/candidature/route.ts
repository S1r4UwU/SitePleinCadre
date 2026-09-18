import { NextResponse } from "next/server";
import { getSession } from "@/content/sessions";
import { site } from "@/content/site";
import { periode } from "@/lib/dates";
import {
  CHAMP_PIEGE,
  FICHIERS_TYPES_ACCEPTES,
  NOMBRE_MAX_FICHIERS,
  TAILLE_MAX_FICHIER,
  candidatureSchema,
  libelleFinancement,
  libelleHandicap,
} from "@/lib/candidature";

export const runtime = "nodejs";

/**
 * Réception des candidatures.
 *
 * Un seul canal, contrairement à l'ancien site qui proposait à égalité « envoyez un
 * mail » et « remplissez ce formulaire », laissant l'organisme réconcilier les deux.
 *
 * Configuration requise en production (voir .env.example) :
 *   RESEND_API_KEY   clé d'API Resend
 *   MAIL_EXPEDITEUR  adresse d'envoi validée sur le domaine
 *   MAIL_DESTINATION adresse de réception (par défaut : contact@…)
 */

type Compteur = { total: number; debut: number };
const fenetre = 15 * 60 * 1000;
const maxParFenetre = 5;
const compteurs = new Map<string, Compteur>();

function limiteAtteinte(ip: string): boolean {
  const maintenant = Date.now();
  const actuel = compteurs.get(ip);

  if (!actuel || maintenant - actuel.debut > fenetre) {
    compteurs.set(ip, { total: 1, debut: maintenant });
    return false;
  }

  actuel.total += 1;
  return actuel.total > maxParFenetre;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "inconnue";

  if (limiteAtteinte(ip)) {
    return NextResponse.json(
      { erreur: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429 },
    );
  }

  let formulaire: FormData;
  try {
    formulaire = await request.formData();
  } catch {
    return NextResponse.json({ erreur: "Requête illisible." }, { status: 400 });
  }

  // Le piège à robots est rempli : on répond comme si tout allait bien.
  const piege = formulaire.get(CHAMP_PIEGE);
  if (typeof piege === "string" && piege.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const champs = Object.fromEntries(
    Array.from(formulaire.entries()).filter(([, valeur]) => typeof valeur === "string"),
  );

  const resultat = candidatureSchema.safeParse(champs);
  if (!resultat.success) {
    const erreurs: Record<string, string> = {};
    for (const probleme of resultat.error.issues) {
      const champ = String(probleme.path[0] ?? "formulaire");
      erreurs[champ] ??= probleme.message;
    }
    return NextResponse.json({ erreurs }, { status: 422 });
  }

  const candidature = resultat.data;
  const session = getSession(candidature.session);
  if (!session) {
    return NextResponse.json(
      { erreurs: { session: "Cette session n'existe pas." } },
      { status: 422 },
    );
  }

  // Pièces jointes
  const fichiers = formulaire
    .getAll("fichiers")
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (fichiers.length > NOMBRE_MAX_FICHIERS) {
    return NextResponse.json(
      { erreurs: { fichiers: `Maximum ${NOMBRE_MAX_FICHIERS} fichiers.` } },
      { status: 422 },
    );
  }

  for (const fichier of fichiers) {
    if (fichier.size > TAILLE_MAX_FICHIER) {
      return NextResponse.json(
        { erreurs: { fichiers: `« ${fichier.name} » dépasse 5 Mo.` } },
        { status: 422 },
      );
    }
    if (!FICHIERS_TYPES_ACCEPTES.includes(fichier.type)) {
      return NextResponse.json(
        { erreurs: { fichiers: `Le format de « ${fichier.name} » n'est pas accepté.` } },
        { status: 422 },
      );
    }
  }

  const corps = [
    `Nouvelle candidature — ${session.titre}`,
    `Session : ${periode(session.dateDebut, session.dateFin)} à ${session.lieu.ville}`,
    "",
    `Nom : ${candidature.prenom} ${candidature.nom}`,
    `E-mail : ${candidature.email}`,
    `Téléphone : ${candidature.telephone}`,
    `Ville : ${candidature.ville}`,
    `Date de naissance : ${candidature.dateNaissance}`,
    "",
    `Financement envisagé : ${libelleFinancement(candidature.financement)}`,
    `Situation de handicap : ${libelleHandicap(candidature.handicap)}`,
    candidature.bandeDemo ? `Bande-démo : ${candidature.bandeDemo}` : null,
    "",
    candidature.message ? `Message :\n${candidature.message}` : null,
    "",
    `Pièces jointes : ${fichiers.length > 0 ? fichiers.map((f) => f.name).join(", ") : "aucune"}`,
  ]
    .filter((ligne) => ligne !== null)
    .join("\n");

  const cle = process.env.RESEND_API_KEY;
  const expediteur = process.env.MAIL_EXPEDITEUR;
  const destination = process.env.MAIL_DESTINATION ?? site.contact.email;

  if (!cle || !expediteur) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[candidature] envoi simulé (RESEND_API_KEY absente) :\n" + corps);
      return NextResponse.json({ ok: true, simule: true });
    }
    return NextResponse.json(
      {
        erreur:
          "L'envoi automatique est momentanément indisponible. " +
          `Écrivez-nous directement à ${site.contact.email}.`,
      },
      { status: 503 },
    );
  }

  const piecesJointes = await Promise.all(
    fichiers.map(async (fichier) => ({
      filename: fichier.name,
      content: Buffer.from(await fichier.arrayBuffer()).toString("base64"),
    })),
  );

  const reponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cle}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: expediteur,
      to: [destination],
      reply_to: candidature.email,
      subject: `Candidature — ${candidature.prenom} ${candidature.nom} — ${session.titre}`,
      text: corps,
      attachments: piecesJointes,
    }),
  });

  if (!reponse.ok) {
    console.error("[candidature] échec Resend", reponse.status, await reponse.text());
    return NextResponse.json(
      {
        erreur:
          "Votre candidature n'a pas pu être transmise. " +
          `Réessayez, ou écrivez-nous à ${site.contact.email}.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
