import type { NextConfig } from "next";

/**
 * Redirections 301 depuis l'ancien site Wix.
 * Les anciennes URLs sont indexées : elles doivent toutes retomber sur une page vivante.
 * Voir docs/brief-refonte.md §2.
 */
const legacyRedirects = [
  { source: "/nos-formations", destination: "/formations" },
  { source: "/nos-intervenants", destination: "/intervenants" },
  { source: "/qui-sommes-nous", destination: "/l-ecole" },
  { source: "/about-4", destination: "/reclamations" },
  { source: "/inscription", destination: "/candidater" },
  { source: "/politique-de-confidentialité", destination: "/confidentialite" },
  { source: "/politique-de-confidentialit%C3%A9", destination: "/confidentialite" },
  { source: "/mentions-légales", destination: "/mentions-legales" },
  { source: "/mentions-l%C3%A9gales", destination: "/mentions-legales" },
  // Fiches formation — les slugs Wix étaient des notes de chantier
  {
    source: "/5-dircast-novembre",
    destination: "/formations/cinq-directeurices-casting-novembre-2026",
  },
  {
    source: "/1-real-1-dircast-decembre",
    destination: "/formations/parcours-carriere-artistique-decembre-2026",
  },
  // Les slugs accentués de Wix arrivent percent-encodés : le matcher de Next
  // compare le chemin tel qu'il est reçu, il faut donc les deux écritures.
  {
    source: "/2-réals-juin",
    destination: "/formations/deux-realisateurices-janvier-2027",
  },
  {
    source: "/2-r%C3%A9als-juin",
    destination: "/formations/deux-realisateurices-janvier-2027",
  },
  // Doublons Wix indexés par Google
  {
    source: "/copie-de-2-réals-janvier",
    destination: "/formations/parcours-carriere-artistique-decembre-2026",
  },
  {
    source: "/copie-de-2-r%C3%A9als-janvier",
    destination: "/formations/parcours-carriere-artistique-decembre-2026",
  },
  {
    source: "/copie-de-2-réals-juin",
    destination: "/formations/deux-realisateurices-janvier-2027",
  },
  {
    source: "/copie-de-2-r%C3%A9als-juin",
    destination: "/formations/deux-realisateurices-janvier-2027",
  },
  // Galeries « portfolio-collections » : 2 sur 5 renvoyaient un 404 chez Wix
  { source: "/portfolio-collections/:slug*", destination: "/intervenants" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Un package-lock.json traîne dans le dossier utilisateur : sans cette racine
  // explicite, Turbopack remonte jusqu'à lui et l'inclut dans son périmètre.
  turbopack: { root: import.meta.dirname },

  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
