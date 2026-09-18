"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Session } from "@/content/types";
import { periodeCourte } from "@/lib/dates";
import {
  FICHIERS_TYPES_ACCEPTES,
  NOMBRE_MAX_FICHIERS,
  modesFinancement,
  reponsesHandicap,
} from "@/lib/candidature";

const etapes = [
  { id: 1, titre: "Qui êtes-vous" },
  { id: 2, titre: "Votre projet" },
  { id: 3, titre: "Vos pièces" },
] as const;

export function FormulaireCandidature({
  sessions,
  sessionInitiale,
  emailContact,
}: {
  sessions: Session[];
  sessionInitiale?: string;
  emailContact: string;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [etape, setEtape] = useState<1 | 2 | 3>(1);
  const [envoi, setEnvoi] = useState(false);
  const [erreurs, setErreurs] = useState<Record<string, string>>({});
  const [erreurGlobale, setErreurGlobale] = useState<string | null>(null);

  const sessionParDefaut = useMemo(() => {
    if (sessionInitiale && sessions.some((s) => s.slug === sessionInitiale)) {
      return sessionInitiale;
    }
    return sessions[0]?.slug ?? "";
  }, [sessionInitiale, sessions]);

  /** Ne valide que les champs de l'étape affichée. */
  function etapeValide(numero: number): boolean {
    const conteneur = formRef.current?.querySelector<HTMLElement>(
      `[data-etape="${numero}"]`,
    );
    if (!conteneur) return true;

    const champs = conteneur.querySelectorAll<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >("input, select, textarea");

    let valide = true;
    for (const champ of champs) {
      if (!champ.checkValidity()) {
        if (valide) champ.reportValidity();
        valide = false;
      }
    }
    return valide;
  }

  function suivant() {
    if (!etapeValide(etape)) return;
    setEtape((e) => (e === 3 ? e : ((e + 1) as 1 | 2 | 3)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function precedent() {
    setEtape((e) => (e === 1 ? e : ((e - 1) as 1 | 2 | 3)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function envoyer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!etapeValide(3)) return;

    setEnvoi(true);
    setErreurs({});
    setErreurGlobale(null);

    try {
      const reponse = await fetch("/api/candidature", {
        method: "POST",
        body: new FormData(event.currentTarget),
      });
      const donnees = await reponse.json().catch(() => ({}));

      if (reponse.ok) {
        router.push("/candidater/merci");
        return;
      }

      if (donnees.erreurs) {
        setErreurs(donnees.erreurs);
        setErreurGlobale("Certains champs demandent une correction.");
        // On ramène l'utilisateur à l'étape concernée.
        const champsEtape1 = [
          "prenom",
          "nom",
          "email",
          "telephone",
          "ville",
          "dateNaissance",
        ];
        const champsEtape2 = ["session", "financement", "handicap", "message"];
        const premier = Object.keys(donnees.erreurs)[0];
        if (champsEtape1.includes(premier)) setEtape(1);
        else if (champsEtape2.includes(premier)) setEtape(2);
      } else {
        setErreurGlobale(
          donnees.erreur ??
            `Votre candidature n'a pas pu être envoyée. Écrivez-nous à ${emailContact}.`,
        );
      }
    } catch {
      setErreurGlobale(
        `Connexion interrompue. Réessayez, ou écrivez-nous à ${emailContact}.`,
      );
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={envoyer} noValidate={false} encType="multipart/form-data">
      {/* Progression */}
      <ol className="mb-12 grid grid-cols-3 gap-3" aria-label="Progression">
        {etapes.map((e) => {
          const etat = e.id === etape ? "courante" : e.id < etape ? "faite" : "a-venir";
          return (
            <li key={e.id}>
              <span
                aria-current={etat === "courante" ? "step" : undefined}
                className={`block border-t-2 pt-3 text-sm transition-colors ${
                  etat === "a-venir"
                    ? "border-ink/15 text-ink-mute"
                    : "border-terracotta text-ink"
                }`}
              >
                <span className="tnum eyebrow block">Étape {e.id}</span>
                <span className="mt-1 block font-medium">{e.titre}</span>
              </span>
            </li>
          );
        })}
      </ol>

      {erreurGlobale && (
        <p
          role="alert"
          className="mb-8 border-l-2 border-terracotta bg-terracotta/10 px-5 py-4 text-sm"
        >
          {erreurGlobale}
        </p>
      )}

      {/* ---------------------------------------------------------- Étape 1 */}
      <div data-etape="1" hidden={etape !== 1}>
        <fieldset>
          <legend className="text-2xl">Qui êtes-vous</legend>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Champ
              nom="prenom"
              label="Prénom"
              autoComplete="given-name"
              erreur={erreurs.prenom}
              requis
            />
            <Champ
              nom="nom"
              label="Nom"
              autoComplete="family-name"
              erreur={erreurs.nom}
              requis
            />
            <Champ
              nom="email"
              label="Adresse e-mail"
              type="email"
              autoComplete="email"
              erreur={erreurs.email}
              requis
            />
            <Champ
              nom="telephone"
              label="Téléphone"
              type="tel"
              autoComplete="tel"
              erreur={erreurs.telephone}
              requis
            />
            <Champ
              nom="ville"
              label="Ville"
              autoComplete="address-level2"
              erreur={erreurs.ville}
              requis
            />
            <Champ
              nom="dateNaissance"
              label="Date de naissance"
              type="date"
              autoComplete="bday"
              erreur={erreurs.dateNaissance}
              aide="Nécessaire à l'établissement de la convention de formation."
              requis
            />
          </div>
        </fieldset>
      </div>

      {/* ---------------------------------------------------------- Étape 2 */}
      <div data-etape="2" hidden={etape !== 2}>
        <fieldset>
          <legend className="text-2xl">Votre projet</legend>

          <div className="mt-8 grid gap-6">
            <div>
              <label htmlFor="session" className="block text-sm font-semibold">
                Session souhaitée <Requis />
              </label>
              <select
                id="session"
                name="session"
                required
                defaultValue={sessionParDefaut}
                className="mt-2 w-full rounded-xl border border-ink/20 bg-cream px-4 py-3 text-base"
              >
                {sessions.map((session) => (
                  <option key={session.slug} value={session.slug}>
                    {session.titre} — {periodeCourte(session.dateDebut, session.dateFin)} (
                    {session.lieu.ville})
                  </option>
                ))}
              </select>
              {erreurs.session && <Erreur id="session">{erreurs.session}</Erreur>}
            </div>

            <div>
              <label htmlFor="financement" className="block text-sm font-semibold">
                Comment pensez-vous financer votre formation ? <Requis />
              </label>
              <select
                id="financement"
                name="financement"
                required
                defaultValue=""
                className="mt-2 w-full rounded-xl border border-ink/20 bg-cream px-4 py-3 text-base"
              >
                <option value="" disabled>
                  Choisissez une réponse
                </option>
                {modesFinancement.map((mode) => (
                  <option key={mode.valeur} value={mode.valeur}>
                    {mode.libelle}
                  </option>
                ))}
              </select>
              {erreurs.financement && <Erreur id="financement">{erreurs.financement}</Erreur>}
            </div>

            {/* Boutons radio, et non deux cases à cocher indépendantes
                comme sur l'ancien formulaire. */}
            <fieldset className="border-t border-ink/12 pt-6">
              <legend className="text-sm font-semibold">
                Êtes-vous en situation de handicap ? <Requis />
              </legend>
              <p className="measure mt-2 text-sm text-ink-soft">
                Cette information nous permet d'anticiper les aménagements nécessaires. Elle
                n'entre pas dans la sélection des candidatures.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {reponsesHandicap.map((reponse) => (
                  <label
                    key={reponse.valeur}
                    className="flex items-center gap-2.5 text-sm"
                  >
                    <input
                      type="radio"
                      name="handicap"
                      value={reponse.valeur}
                      required
                      className="h-4 w-4 accent-navy"
                    />
                    {reponse.libelle}
                  </label>
                ))}
              </div>
              {erreurs.handicap && <Erreur id="handicap">{erreurs.handicap}</Erreur>}
            </fieldset>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold">
                Un mot sur votre parcours ou votre projet
                <span className="ml-2 font-normal text-ink-mute">(facultatif)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                maxLength={3000}
                className="mt-2 w-full rounded-xl border border-ink/20 bg-cream px-4 py-3 text-base"
              />
            </div>
          </div>
        </fieldset>
      </div>

      {/* ---------------------------------------------------------- Étape 3 */}
      <div data-etape="3" hidden={etape !== 3}>
        <fieldset>
          <legend className="text-2xl">Vos pièces</legend>

          <div className="mt-8 grid gap-6">
            <div>
              <label htmlFor="fichiers" className="block text-sm font-semibold">
                CV, lettre de motivation et photo en portrait
              </label>
              <p className="measure mt-2 text-sm text-ink-soft">
                Jusqu'à {NOMBRE_MAX_FICHIERS} fichiers, 5 Mo chacun. PDF, Word, JPEG, PNG
                ou WebP. Vous pourrez aussi nous les envoyer par e-mail si vous préférez.
              </p>
              <input
                id="fichiers"
                name="fichiers"
                type="file"
                multiple
                accept={FICHIERS_TYPES_ACCEPTES.join(",")}
                className="mt-3 block w-full text-sm file:mr-4 file:rounded-full file:border-0 file:bg-navy file:px-5 file:py-2.5 file:text-sm file:font-semibold file:text-cream hover:file:bg-navy-deep"
              />
              {erreurs.fichiers && <Erreur id="fichiers">{erreurs.fichiers}</Erreur>}
            </div>

            <Champ
              nom="bandeDemo"
              label="Lien vers votre bande-démo"
              type="url"
              placeholder="https://"
              aide="Facultatif — Vimeo, YouTube, site personnel…"
              erreur={erreurs.bandeDemo}
            />

            <div className="border-t border-ink/12 pt-6">
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  name="consentement"
                  required
                  className="mt-1 h-4 w-4 shrink-0 accent-navy"
                />
                <span className="measure">
                  J'accepte que Plein Cadre Formation conserve et traite ces informations
                  dans le seul but d'étudier ma candidature et de constituer, le cas échéant,
                  mon dossier de formation. <Requis />{" "}
                  <a
                    href="/confidentialite"
                    className="text-navy underline underline-offset-4"
                  >
                    Politique de confidentialité
                  </a>
                  .
                </span>
              </label>
              {erreurs.consentement && (
                <Erreur id="consentement">{erreurs.consentement}</Erreur>
              )}
            </div>

            {/* Piège à robots — masqué visuellement et aux lecteurs d'écran. */}
            <div aria-hidden="true" className="absolute left-[-9999px] h-0 overflow-hidden">
              <label htmlFor="societe">Société</label>
              <input id="societe" name="societe" type="text" tabIndex={-1} autoComplete="off" />
            </div>
          </div>
        </fieldset>
      </div>

      {/* ------------------------------------------------------- Navigation */}
      <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-ink/12 pt-8">
        {etape > 1 && (
          <button
            type="button"
            onClick={precedent}
            className="rounded-full border border-navy/30 px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-cream"
          >
            ← Étape précédente
          </button>
        )}

        {etape < 3 ? (
          <button
            type="button"
            onClick={suivant}
            className="rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-navy-deep"
          >
            Continuer
          </button>
        ) : (
          <button
            type="submit"
            disabled={envoi}
            className="rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {envoi ? "Envoi en cours…" : "Envoyer ma candidature"}
          </button>
        )}

        <p className="text-sm text-ink-mute">
          Étape {etape} sur 3 — vos données ne sont envoyées qu'à la dernière étape.
        </p>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------- primitives */

function Requis() {
  return (
    <span className="text-terracotta-deep" aria-hidden="true">
      *
    </span>
  );
}

function Erreur({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={`${id}-erreur`} role="alert" className="mt-2 text-sm text-terracotta-deep">
      {children}
    </p>
  );
}

function Champ({
  nom,
  label,
  type = "text",
  requis = false,
  aide,
  erreur,
  ...props
}: {
  nom: string;
  label: string;
  type?: string;
  requis?: boolean;
  aide?: string;
  erreur?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const aideId = aide ? `${nom}-aide` : undefined;
  const erreurId = erreur ? `${nom}-erreur` : undefined;
  const decrit = [aideId, erreurId].filter(Boolean).join(" ") || undefined;

  return (
    // Les libellés d'aide passent sous le champ : sinon un champ commenté décale
    // sa colonne et la grille perd son alignement.
    <div className="flex flex-col">
      <label htmlFor={nom} className="block text-sm font-semibold">
        {label} {requis && <Requis />}
      </label>
      <input
        id={nom}
        name={nom}
        type={type}
        required={requis}
        aria-describedby={decrit}
        aria-invalid={erreur ? true : undefined}
        className={`mt-2 w-full rounded-xl border bg-cream px-4 py-3 text-base ${
          erreur ? "border-terracotta" : "border-ink/20"
        }`}
        {...props}
      />
      {aide && (
        <p id={aideId} className="mt-1.5 text-sm text-ink-soft">
          {aide}
        </p>
      )}
      {erreur && <Erreur id={nom}>{erreur}</Erreur>}
    </div>
  );
}
