import type { Metadata, Viewport } from "next";
import { Fraunces, Mulish } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";
import { JsonLd, organisationJsonLd } from "@/lib/seo";
import "./globals.css";

/**
 * Fraunces : serif variable, très « affiche de cinéma ». C'était déjà la police de
 * titrage du client — on la garde, c'est sa signature. On exploite en plus ses axes
 * optiques (opsz, SOFT, WONK), ce qu'une police statique ne permet pas.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

/**
 * Mulish remplace Avenir LT, qui est sous licence Wix et non redistribuable.
 * Humaniste géométrique, même tempérament, libre.
 */
const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nom} — ${site.baseline} à Lyon et Paris`,
    template: `%s — ${site.nom}`,
  },
  description: site.description,
  applicationName: site.nom,
  authors: [{ name: site.legal.raisonSociale }],
  keywords: [
    "stage jeu face caméra",
    "formation comédien Lyon",
    "formation comédien Paris",
    "casting",
    "direction d'acteur",
    "AFDAS",
    "Qualiopi",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.nomComplet,
    url: site.url,
    title: `${site.nom} — ${site.baseline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f9f2e7",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${mulish.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream"
        >
          Aller au contenu principal
        </a>

        <Header />

        <main id="contenu" className="flex-1">
          {children}
        </main>

        <Footer />

        <JsonLd data={organisationJsonLd()} />
      </body>
    </html>
  );
}
