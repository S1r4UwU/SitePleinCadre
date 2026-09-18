import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "./Logo";

const liensLegaux = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "Conditions générales" },
  { href: "/confidentialite", label: "Politique de confidentialité" },
  { href: "/accessibilite", label: "Accessibilité" },
  { href: "/reclamations", label: "Réclamations" },
];

const liensSite = [
  { href: "/formations", label: "Toutes les formations" },
  { href: "/intervenants", label: "Les intervenant·es" },
  { href: "/financement", label: "Financer sa formation" },
  { href: "/faq", label: "Questions fréquentes" },
  { href: "/temoignages", label: "Témoignages" },
];

export function Footer() {
  const reseaux = Object.entries(site.reseaux).filter(([, url]) => Boolean(url));

  return (
    <footer className="mt-32 border-t border-ink/10 bg-cream-deep">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="measure-tight mt-5 text-sm text-ink-soft">
              Stages intensifs de jeu face caméra à Lyon et Paris, encadrés par des
              professionnel·les du cinéma en activité.
            </p>

            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-navy/20 px-4 py-2">
              <span className="eyebrow text-navy">Qualiopi</span>
              <span className="tnum text-sm text-ink-soft">
                n° {site.qualiopi.numeroCertificat}
              </span>
            </div>
          </div>

          <div className="md:col-span-3">
            <h2 className="eyebrow">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${site.contact.telephoneLien}`}
                  className="tnum underline-offset-4 hover:underline"
                >
                  {site.contact.telephone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="break-all underline-offset-4 hover:underline"
                >
                  {site.contact.email}
                </a>
              </li>
            </ul>

            <h2 className="eyebrow mt-8">Référente handicap</h2>
            <p className="mt-4 text-sm text-ink-soft">
              {site.referenteHandicap.nom}
              <br />
              <a
                href={`tel:${site.referenteHandicap.telephoneLien}`}
                className="tnum underline-offset-4 hover:underline"
              >
                {site.referenteHandicap.telephone}
              </a>
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="eyebrow">Le site</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {liensSite.map((lien) => (
                <li key={lien.href}>
                  <Link href={lien.href} className="underline-offset-4 hover:underline">
                    {lien.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="eyebrow">Nous trouver</h2>
            <address className="mt-5 space-y-4 text-sm not-italic text-ink-soft">
              <span className="block">
                <strong className="font-semibold text-ink">Lyon</strong>
                <br />
                {site.lieux.lyon.adresse}
                <br />
                {site.lieux.lyon.codePostal} {site.lieux.lyon.ville}
              </span>
              <span className="block">
                <strong className="font-semibold text-ink">Paris</strong>
                <br />
                {site.lieux.paris.adresse}
                <br />
                {site.lieux.paris.codePostal} {site.lieux.paris.ville}
              </span>
            </address>

            {/* L'ancien site pointait vers facebook.com/wix et instagram.com/wix.
                Tant qu'on n'a pas les comptes réels, rien ne s'affiche. */}
            {reseaux.length > 0 && (
              <ul className="mt-6 flex gap-4 text-sm">
                {reseaux.map(([nom, url]) => (
                  <li key={nom}>
                    <a href={url as string} className="underline-offset-4 hover:underline">
                      {nom}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <hr className="rule my-12" />

        <div className="flex flex-col gap-6 text-xs text-ink-mute md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nomComplet} — {site.legal.raisonSociale}.
            Formations certifiées Qualiopi, conventionnées AFDAS et France Travail.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {liensLegaux.map((lien) => (
              <li key={lien.href}>
                <Link href={lien.href} className="underline-offset-4 hover:underline">
                  {lien.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
