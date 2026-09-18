# Site Plein Cadre Formation

Refonte du site de **Plein Cadre Formation *by ETL*** — organisme de formation certifié
Qualiopi proposant des stages intensifs de jeu face caméra à Lyon et Paris, destinés aux
comédien·nes.

Site actuel (à remplacer) : https://www.pleincadre-formation.com — Wix.

## Principe directeur

> Une formation est une **donnée**, pas une page copiée-collée.

Sur le site Wix, chaque stage était saisi à la main trois fois (accueil, catalogue, fiche
détail) : les statuts divergeaient entre deux pages, deux fiches étaient des doublons
indexés par Google, et un titre portait encore l'ancienne marque « CAMCAST FORMATION ».

Ici, un objet `Session` ([src/content/sessions.ts](src/content/sessions.ts)) alimente les
cartes, la fiche, le sitemap, les données structurées `Course` et les statuts. Les libellés
de dates sont calculés, les slugs sont stables, les sessions passées basculent seules en
archive, et **une rubrique vide ne s'affiche pas** — ce qui règle au passage les titres
Qualiopi suivis de rien.

## Démarrer

```bash
npm install
npm run dev
```

Le formulaire de candidature fonctionne sans configuration en développement (envoi simulé,
contenu affiché dans la console). Pour l'envoi réel, copier `.env.example` en `.env.local`
et renseigner les clés Resend.

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run typecheck` | Vérification TypeScript |

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript** strict
- **Tailwind CSS 4** — tokens de design déclarés dans [globals.css](src/app/globals.css)
- **Zod 4** pour la validation du formulaire
- **Resend** (API REST, sans SDK) pour la transmission des candidatures
- Rendu statique par défaut, ISR toutes les heures sur les pages qui affichent un compte à
  rebours de dépôt de dossier

Aucune dépendance d'animation, aucune librairie d'icônes : le site tient en 5 dépendances
de production.

## Structure

```
src/
├── app/                    Pages (App Router)
│   ├── formations/         Catalogue + fiche de session [slug]
│   ├── intervenants/       Trombinoscope + fiche [slug]
│   ├── financement/        Les trois dispositifs, en parcours
│   ├── candidater/         Formulaire 3 étapes + page de confirmation
│   ├── api/candidature/    Réception, validation, anti-spam, envoi
│   ├── l-ecole/ contact/ faq/ temoignages/
│   ├── cgv/ mentions-legales/ confidentialite/ accessibilite/ reclamations/
│   ├── sitemap.ts robots.ts not-found.tsx
├── components/             Header, Footer, SessionCard, Ardoise, Statut, ui
├── content/                LA SOURCE DE VÉRITÉ — sessions, intervenants, site, faq…
└── lib/                    dates, format, seo (JSON-LD), candidature (schéma)
```

`src/content/` est volontairement proche d'un schéma CMS (Sanity / Payload) : le jour où le
client édite ses sessions lui-même, seule la source de données change.

## Ce que la refonte corrige

Les 29 anomalies relevées dans l'audit sont traitées. Les principales :

| Problème sur Wix | Traitement |
|---|---|
| 2 catégories d'intervenants en **404**, 3 vides affichant le texte d'aide de l'éditeur Wix | Pages générées depuis les données, état vide explicite et rédigé |
| Statuts d'inscription **contradictoires** entre l'accueil et le catalogue | Un seul statut par session, dérivé des dates |
| Titre de page portant l'**ancienne marque** et une date erronée | `generateMetadata` dérive titre et mois des données |
| Page **dupliquée indexée** par Google | Redirection 301, sitemap généré |
| Liens sociaux pointant vers **facebook.com/wix** | Rien ne s'affiche tant que les comptes réels ne sont pas fournis |
| Page **404 en anglais** | 404 française, avec les quatre destinations les plus demandées |
| Handicap en **deux cases à cocher**, aucun consentement RGPD | Boutons radio, consentement explicite, finalité expliquée |
| Rubriques Qualiopi **vides** | Rubrique masquée si la donnée est absente |
| Deux `<h1>` sur l'accueil, **zéro** sur les pages internes | Un `<h1>` par page, hiérarchie continue |
| Bouton flottant **recouvrant** des contrôles | Supprimé ; CTA dans l'en-tête et colonne latérale collante |
| `alt` = noms de fichiers, images = captures d'écran | Alternatives rédigées ; ardoises dessinées en attendant le reportage photo |
| Aucune donnée structurée | `EducationalOrganization`, `Course`, `FAQPage`, `BreadcrumbList` |

Détail complet : [docs/audit-site-actuel.md](docs/audit-site-actuel.md).

## Direction artistique

L'identité du client est conservée et systématisée, pas remplacée :

- **Crème `#F9F2E7` / bleu nuit `#000069` / terracotta `#BD5041`** — le terracotta
  n'apparaissait qu'une fois sur l'ancien site ; il devient la couleur d'accent, y compris
  pour l'anneau de focus.
- **Fraunces** en titrage (déjà la police du client), avec exploitation de ses axes
  variables `opsz`, `SOFT` et `WONK`. **Mulish** remplace Avenir LT, sous licence Wix.
- La **forme de carte signature** : arche en haut, un seul angle bas arrondi.
- Corps de texte à **17 px** au lieu des 13 px en graisse Light de l'ancien site.
- Pas d'ombre portée, pas d'icône décorative, pas de fondu au scroll systématique :
  des filets, des numéros, une grille éditoriale asymétrique, un grain léger sur les aplats.

Le raisonnement complet est dans [docs/brief-refonte.md](docs/brief-refonte.md) §5.

## Accessibilité

Niveau **WCAG 2.1 AA** visé, revendiqué sur une [page dédiée](src/app/accessibilite/page.tsx) :
un `<h1>` par page, contrastes vérifiés (le bloc financement utilise `terracotta-deep` —
`#BD5041` ne passait pas 4.5:1 avec le crème), focus visible, formulaire en `fieldset` avec
de vrais boutons radio, `prefers-reduced-motion` respecté.

## À faire avant mise en ligne

Voir **[docs/todo-contenus.md](docs/todo-contenus.md)** — notamment le numéro de déclaration
d'activité, la fin des CGV, les tarifs manquants, le reportage photo et la clé Resend.

## Documentation

- [docs/audit-site-actuel.md](docs/audit-site-actuel.md) — audit complet du site Wix
- [docs/brief-refonte.md](docs/brief-refonte.md) — modèle de données, arborescence, DA
- [docs/todo-contenus.md](docs/todo-contenus.md) — ce qu'il reste à obtenir du client

## Contexte client

- **Entité** : École de Théâtre de Lyon — RCS Lyon 448 230 367
- **Lieux** : Lyon (53 rue des Tables Claudiennes) et Paris (38 rue de Torcy)
- **Certification** : Qualiopi n° 180411-5
- **Financements** : AFDAS (100 %), France Travail, financement personnel
- **Public** : comédien·nes professionnel·les et débutant·es, majoritairement intermittent·es

## Convention de branches

`main` est la branche de référence. Le travail se fait sur des branches `feat/*`, `fix/*`,
`docs/*` fusionnées par pull request.
