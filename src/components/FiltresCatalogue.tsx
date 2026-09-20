import Link from "next/link";

/**
 * Filtres du catalogue.
 *
 * Pilotés par l'URL plutôt que par un état React : le résultat est partageable
 * et indexable, il fonctionne sans JavaScript, et il n'y a aucun risque de
 * désaccord d'hydratation sur les comptes à rebours calculés côté serveur.
 */

export type Filtres = { ville: string; statut: string };

export const villes = [
  { valeur: "toutes", libelle: "Toutes les villes" },
  { valeur: "lyon", libelle: "Lyon" },
  { valeur: "paris", libelle: "Paris" },
] as const;

export const statuts = [
  { valeur: "tous", libelle: "Tous les statuts" },
  { valeur: "ouvert", libelle: "Inscriptions ouvertes" },
  { valeur: "bientot", libelle: "Bientôt ouvertes" },
] as const;

function lien(base: Filtres, cle: keyof Filtres, valeur: string): string {
  const params = new URLSearchParams();
  const suivant = { ...base, [cle]: valeur };
  if (suivant.ville !== "toutes") params.set("ville", suivant.ville);
  if (suivant.statut !== "tous") params.set("statut", suivant.statut);
  const requete = params.toString();
  return requete ? `/formations?${requete}` : "/formations";
}

function Groupe({
  titre,
  options,
  cle,
  filtres,
}: {
  titre: string;
  options: readonly { valeur: string; libelle: string }[];
  cle: keyof Filtres;
  filtres: Filtres;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="eyebrow w-full sm:w-auto">{titre}</span>
      <ul className="flex flex-wrap gap-2">
        {options.map((option) => {
          const actif = filtres[cle] === option.valeur;
          return (
            <li key={option.valeur}>
              <Link
                href={lien(filtres, cle, option.valeur)}
                scroll={false}
                aria-current={actif ? "true" : undefined}
                className={`inline-flex rounded-full border px-4 py-2 text-sm transition-colors ${
                  actif
                    ? "border-navy bg-navy font-semibold text-cream"
                    : "border-ink/20 text-ink hover:border-navy/50"
                }`}
              >
                {option.libelle}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function FiltresCatalogue({
  filtres,
  resultats,
  total,
}: {
  filtres: Filtres;
  resultats: number;
  total: number;
}) {
  const filtre = filtres.ville !== "toutes" || filtres.statut !== "tous";

  return (
    <div className="border-y border-ink/10 py-6">
      <div className="flex flex-col gap-5">
        <Groupe titre="Ville" options={villes} cle="ville" filtres={filtres} />
        <Groupe titre="Statut" options={statuts} cle="statut" filtres={filtres} />
      </div>

      <p aria-live="polite" className="tnum mt-6 text-sm text-ink-soft">
        {resultats === 0
          ? "Aucune session ne correspond à ces critères."
          : `${resultats} session${resultats > 1 ? "s" : ""} sur ${total}`}
        {filtre && (
          <>
            {" — "}
            <Link
              href="/formations"
              scroll={false}
              className="text-navy underline underline-offset-4"
            >
              tout afficher
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
