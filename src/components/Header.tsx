"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Logo } from "./Logo";

/**
 * L'ancien menu comptait 7 entrées de niveau 1 plus un « More » qui débordait,
 * dont une entrée « À propos » qui menait à la page Réclamations.
 * Cinq entrées, un bouton d'action, et des intitulés qui disent la vérité.
 */
const navigation = [
  { href: "/formations", label: "Formations" },
  { href: "/intervenants", label: "Intervenant·es" },
  { href: "/financement", label: "Financement" },
  { href: "/l-ecole", label: "L'école" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);

  // Le menu mobile ne doit jamais survivre à une navigation.
  useEffect(() => {
    setOuvert(false);
  }, [pathname]);

  // Pas de défilement derrière le panneau ouvert.
  useEffect(() => {
    document.body.style.overflow = ouvert ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ouvert]);

  const estActif = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="rounded-sm"
          aria-label={`${site.nom} — accueil`}
        >
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={estActif(item.href) ? "page" : undefined}
                  className={`relative py-2 text-sm transition-colors hover:text-terracotta-deep ${
                    estActif(item.href) ? "text-terracotta-deep" : "text-ink"
                  }`}
                >
                  {item.label}
                  {estActif(item.href) && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-0 h-px w-full bg-terracotta"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/* Visible dès le mobile : c'est l'action qui paie le site. */}
          <Link
            href="/candidater"
            className="rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-navy-deep sm:px-5"
          >
            Candidater
          </Link>

          <button
            type="button"
            onClick={() => setOuvert((o) => !o)}
            aria-expanded={ouvert}
            aria-controls="menu-mobile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 lg:hidden"
          >
            <span className="sr-only">{ouvert ? "Fermer le menu" : "Ouvrir le menu"}</span>
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              {ouvert ? (
                <path
                  d="m4 4 12 12M16 4 4 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h14M3 10h14M3 14h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {ouvert && (
        <div
          id="menu-mobile"
          className="border-t border-ink/10 bg-cream lg:hidden"
        >
          <nav aria-label="Navigation principale (mobile)" className="px-5 py-4 sm:px-8">
            <ul className="flex flex-col">
              {navigation.map((item) => (
                <li key={item.href} className="border-b border-ink/10 last:border-0">
                  <Link
                    href={item.href}
                    aria-current={estActif(item.href) ? "page" : undefined}
                    className="block py-4 font-[family-name:var(--font-display)] text-2xl"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-mute">
              Une question ? Appelez-nous, c'est souvent plus rapide —{" "}
              <a
                href={`tel:${site.contact.telephoneLien}`}
                className="tnum font-semibold text-navy underline underline-offset-4"
              >
                {site.contact.telephone}
              </a>
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
