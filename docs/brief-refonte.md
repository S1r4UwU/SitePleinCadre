# Brief de refonte — Plein Cadre Formation

Document de travail, dérivé de [`audit-site-actuel.md`](./audit-site-actuel.md).
Objectif : un site qui vend des stages à 1 400–3 000 € à des comédien·nes, finançables AFDAS,
avec une DA de cinéma — et qui ne ressemble ni à Wix, ni à un template, ni à une page générée.

---

## 1. Le principe directeur

> **Une formation est une donnée, pas une page copiée-collée.**

Tout le reste en découle. Aujourd'hui chaque stage est saisi trois fois (carte d'accueil, carte de
catalogue, fiche détail) : les statuts divergent déjà, deux pages sont des doublons, un titre porte
encore l'ancienne marque. Dans la refonte, un stage est un objet unique :

```ts
type Session = {
  slug: string                    // "5-directeurices-casting-novembre-2026"
  titre: string
  baseline: string
  dateDebut: Date; dateFin: Date  // le libellé « Du lundi 16 au vendredi 20 novembre 2026 » est calculé
  heures: number; jours: number
  ville: 'Lyon' | 'Paris'
  lieu: { adresse: string; cp: string; ville: string }
  prix: number                    // TTC
  statut: 'ouvert' | 'bientot' | 'complet' | 'passe'   // calculé à partir des dates si possible
  dateLimiteAfdas: Date
  dateLimiteFranceTravail: Date
  effectifMax: number
  prerequis: string
  publicVise: string
  objectifs: string[]
  programme: { jour: string; contenu: string }[]
  intervenants: Ref<Intervenant>[]   // relation, pas du texte
  moyensTechniques: string[]
  livrables: string[]
  tauxSatisfaction?: number          // null => la rubrique ne s'affiche pas
  resultatsObtenus?: string          // idem — jamais de titre vide
  imageCouverture: Image             // avec alt obligatoire
}
```

Règles qui tombent automatiquement :
- **Un statut, un prix, une date** — affichés à l'identique sur l'accueil, le catalogue et la fiche.
- **Aucune rubrique vide** : si `resultatsObtenus` est absent, le titre ne s'affiche pas
  (fin du problème Qualiopi « titre suivi de rien »).
- **Les slugs sont générés**, donc sans accent, sans « copie-de- », et stables.
- **Le JSON-LD `Course` + `EducationalOccupationalProgram` est généré** à partir du même objet.
- Les sessions passées basculent seules en archive au lieu de rester à « INSCRIPTIONS À VENIR ».

Même chose pour `Intervenant` (nom, rôle, bio, filmographie, photo, sessions liées) : les cinq
directeur·ices de casting nommés sur la fiche de novembre deviennent des fiches réutilisables,
et la page « Nos intervenant·e·s » se remplit toute seule au lieu d'être une coquille vide.

---

## 2. Arborescence cible

```
/                             Accueil
/formations                   Catalogue filtrable (ville, période, statut, durée)
/formations/[slug]            Fiche session
/intervenants                 Trombinoscope par métier
/intervenants/[slug]          Fiche intervenant (+ ses sessions)
/financement                  AFDAS / France Travail / perso — en parcours guidé
/financement/afdas            Pas à pas AFDAS (page SEO forte)
/l-ecole                      Qui sommes-nous, l'équipe, les lieux, Qualiopi, handicap
/temoignages                  Avis + taux de satisfaction sourcés
/candidater                   Formulaire (pré-rempli par session)
/candidater/merci             Page de confirmation (délai, suite du process)
/contact                      Coordonnées, plan, horaires
/faq                          Questions AFDAS / niveau requis / matériel / hébergement
/mentions-legales  /cgv  /confidentialite  /reclamations  /accessibilite
```

Menu principal réduit à **5 entrées** : *Formations · Intervenants · Financement · L'école · Contact*,
plus un bouton **Candidater** distinct. Les pages « Réclamations » et « Accessibilité » vivent dans
le pied de page, pas dans la navigation.

**Redirections 301 à prévoir** (le site actuel est indexé) :

| Ancienne URL | Nouvelle |
|---|---|
| `/nos-formations` | `/formations` |
| `/5-dircast-novembre` | `/formations/5-directeurices-casting-novembre-2026` |
| `/1-real-1-dircast-decembre` | `/formations/parcours-carriere-artistique-decembre-2026` |
| `/2-réals-juin` | `/formations/deux-realisateurices-janvier-2027` |
| `/copie-de-2-réals-janvier` · `/copie-de-2-réals-juin` | → même cible (doublons) |
| `/nos-intervenants` | `/intervenants` |
| `/qui-sommes-nous` | `/l-ecole` |
| `/about-4` | `/reclamations` |
| `/portfolio-collections/*` | `/intervenants` |

---

## 3. Stack recommandée

| Besoin | Choix | Pourquoi |
|---|---|---|
| Framework | **Next.js 15 (App Router)** ou **Astro 5** | SSG pour des pages qui changent peu, route API nécessaire pour l'upload de CV. Astro si on veut le HTML le plus léger possible ; Next si on veut le formulaire, l'espace d'admin et le déploiement dans le même projet. |
| Contenu | **Sanity** (ou Payload auto-hébergé) | Le client vient de Wix : il **doit** pouvoir changer une date, un prix, un statut, ajouter un intervenant, sans nous. C'est la condition pour que le site ne pourrisse pas comme l'actuel. |
| Styles | **Tailwind v4** + tokens CSS | Les tokens reprennent la palette relevée dans l'audit. |
| Animations | **Motion** (ex-Framer Motion), usage minimal | Voir §5 : pas d'apparition au scroll sur tout. |
| Formulaire | Route API + **Zod** + **Resend** (mail) + stockage fichiers (S3/R2/UploadThing) | Le double canal mail/formulaire disparaît : un seul chemin, l'organisme reçoit un mail formaté. |
| Anti-spam | Honeypot + rate-limit + Turnstile si besoin | Pas de captcha visible par défaut. |
| Hébergement | **Vercel** (ou Netlify) | Aperçus par branche, domaine à basculer quand le client valide. |
| Analytics | **Plausible** ou **Umami** | Sans bandeau cookie si configuré sans cookies — un problème de moins. |

---

## 4. Le parcours de conversion à construire

1. **Accueil** — promesse claire en 6 mots, 3 prochaines sessions avec *dates réelles* et
   *places restantes*, preuve (Qualiopi + noms d'intervenants connus + avis), un seul CTA.
2. **Catalogue** — filtres ville / période / statut. Chaque carte affiche : titre, dates, durée,
   ville, prix, statut, **et la date limite AFDAS**.
3. **Fiche session** — la structure actuelle est excellente, on la garde. On ajoute :
   - une **barre latérale persistante** (dates · durée · prix · financement · places · CTA) ;
   - un **compte à rebours factuel** : « Dossier AFDAS à déposer avant le 16 octobre 2026 » ;
   - les **intervenants avec photo et filmographie** (au lieu de « seront bientôt validé·es ») ;
   - le programme jour par jour en accordéon ou en frise verticale ;
   - « Ce qui se passe après votre candidature » en 3 étapes.
4. **Financement** — un parcours à 3 questions (« Intermittent ? », « 48 cachets sur 24 mois ? »,
   « Déjà un portail AFDAS ? ») qui débouche sur la marche à suivre et le bon délai. Les liens AFDAS
   et les tutos vidéo deviennent des liens nommés, pas des URLs collées.
5. **Candidature** — formulaire en 3 étapes, **pré-rempli avec la session** depuis laquelle on arrive :
   1. Qui êtes-vous (nom, prénom, email, téléphone, ville, naissance)
   2. Votre projet (session, financement, situation de handicap en **radio**, message)
   3. Vos pièces (CV, lettre, photo, lien bande-démo) + **consentement RGPD explicite**
   → page de remerciement qui annonce le délai de réponse et la suite.

---

## 5. Direction artistique : « pointu » sans « fait par une IA »

Le risque, sur ce type de projet, est de livrer le site 2026 par défaut : dégradés violets, cartes en
verre dépoli, icônes arrondies génériques, tout qui apparaît en fondu au scroll, un gros titre centré
et trois colonnes de « features ». C'est ça qui fait « IA ». Les règles ci-dessous sont là pour l'éviter.

### Ce qu'on garde du site actuel (c'est l'identité du client, elle est bonne)
- La palette **crème `#F9F2E7` / bleu nuit `#000069` / terracotta `#BD5041`**.
- **Fraunces** en titrage (serif variable, très affiche de cinéma).
- La forme de carte à **coins hauts très arrondis + un seul coin bas arrondi**.
- Le vocabulaire inclusif du client (« comédien·nes », « réalisateur·ices ») : c'est un marqueur de
  milieu, pas un détail. À **uniformiser** cependant : le site mélange aujourd'hui `.e.s`, `.es`,
  `·e·s` et `.ice.s` — choisir une convention et s'y tenir.

### Ce qu'on change
| À la place de | On fait |
|---|---|
| Grille 3 colonnes symétrique | **Grille éditoriale asymétrique** : une colonne large + une colonne de métadonnées, comme une fiche technique de film. |
| Tout centré | Titres alignés à gauche, gros, avec une ligne de métadonnées en petites capitales dessus (LYON · 5 JOURS · 35 H). |
| Photos de banque d'images | **Photos réelles de stage**, en N&B ou en bichromie bleu nuit, format 4:5 et 16:9 alternés. |
| Icônes génériques | **Pas d'icônes décoratives.** Des filets, des numéros, des puces typographiques. Le clap du logo suffit comme motif. |
| Fondu au scroll sur tous les blocs | Animation **uniquement** là où elle raconte quelque chose : compteur de places, transition de la barre latérale, révélation du programme jour par jour. `prefers-reduced-motion` respecté. |
| Ombres portées partout | **Aucune ombre.** Le contraste crème/bleu nuit suffit à séparer les plans. Bordures 1 px maximum. |
| Corps de texte à 13 px Light | **17–18 px, graisse 400**, interligne 1.6, mesure 65–75 caractères. |
| Hero vidéo décoratif | Hero **typographique** : le titre occupe l'espace, la photo est un encart tenu, pas un fond. |

### Détails qui font la différence
- **Une vraie grille de base** (8 px) et une échelle typographique modulaire — la régularité est ce
  qui distingue un site dessiné d'un site assemblé.
- **Fraunces est une police variable** : jouer sur l'axe optique (`opsz`) et `SOFT`/`WONK` entre les
  gros titres et les intertitres donne une signature impossible à obtenir avec une police statique.
- **Chiffres tabulaires** pour les dates, prix et durées (`font-variant-numeric: tabular-nums`).
- **États de statut typés** : « Inscriptions ouvertes » (bleu plein), « Bientôt » (contour),
  « Complet » (barré, désaturé) — trois traitements visuels distincts, jamais trois fois le même badge.
- **Le grain** : un léger bruit sur les aplats crème (overlay SVG, 2–3 % d'opacité) évite l'aspect
  plat et numérique. À doser.
- **Le curseur et les focus** : anneau de focus visible et assumé en terracotta, c'est à la fois de
  l'accessibilité et un détail de finition.

### Accessibilité comme argument commercial
Viser **WCAG 2.1 AA** et le dire sur une page dédiée. Pour un organisme qui affiche une référente
handicap, c'est cohérent, c'est un argument face aux concurrents, et c'est un point de conformité.
Checklist : un seul `<h1>` par page, hiérarchie continue, contrastes ≥ 4.5:1, focus visible,
formulaire en `<fieldset>`/`<legend>` avec de vrais boutons radio, `alt` rédigés, navigation clavier
complète, pas d'élément flottant qui recouvre un contrôle.

---

## 6. Contenus à demander au client (bloquant)

**Sans ces éléments, la refonte reproduira les trous du site actuel.**

- [ ] **Photos** : reportage sur un stage (comédien face caméra, retour vidéo, direction d'acteur,
      visionnage collectif, le lieu). Le poste le plus important.
- [ ] **Portraits + bios + filmographies** de tous les intervenants, et l'autorisation de les publier.
- [ ] **Photos et noms de l'équipe** (la page « Qui sommes-nous » parle d'une équipe qu'on ne voit jamais).
- [ ] **Logo vectoriel** (SVG) Plein Cadre + ETL, et le **logo Qualiopi officiel en vectoriel**
      (aujourd'hui c'est une capture d'écran).
- [ ] **Numéro de déclaration d'activité (NDA)** de l'organisme + confirmation du n° Qualiopi 180411-5
      et de l'organisme certificateur.
- [ ] **Prix des 4 sessions** qui n'en affichent pas, et clarification du prix de novembre
      (1 400 € « à partir de » vs autre montant).
- [ ] **Le CPF est-il réellement mobilisable ?** (annoncé sur une page, absent de la page financement).
- [ ] **Taux de satisfaction réels** par session : chiffre, période, nombre de répondants — et
      **« résultats obtenus »** (ce que deviennent les stagiaires) pour les indicateurs Qualiopi.
- [ ] **Témoignages** : au minimum 6–8, avec prénom, nom de la session et si possible photo.
- [ ] **Comptes Instagram / Facebook réels** (le site pointe aujourd'hui vers les comptes de Wix).
- [ ] **Forme juridique et RCS exacts** (divergence CGV / mentions légales).
- [ ] Accès **Google Search Console** et au registrar du domaine pour la bascule.
- [ ] **Vidéo** : ont-ils des rushes ou un montage de stage utilisable ? Ce serait le meilleur hero
      possible pour une formation « face caméra ».

---

## 7. Découpage proposé

| Lot | Contenu | Livrable |
|---|---|---|
| **0 — Correctifs d'urgence sur Wix** | 404 des intervenants, liens sociaux Wix, page 404 en FR, titre « CAMCAST », suppression des pages `copie-de-*`, consentement RGPD au formulaire | Site actuel dépollué pendant qu'on construit |
| **1 — Fondations** | Repo, stack, tokens de design, composants de base, modèle de contenu, CMS | Design system consultable |
| **2 — Parcours cœur** | Accueil, catalogue, fiche session, JSON-LD, redirections | Le tunnel de conversion complet |
| **3 — Périphérie** | Intervenants, école, financement guidé, FAQ, témoignages, pages légales | Site complet |
| **4 — Candidature** | Formulaire 3 étapes, upload, mails, page de remerciement | Conversion opérationnelle |
| **5 — Qualité & bascule** | A11y AA, Lighthouse, Search Console, 301, DNS, formation du client au CMS | Mise en ligne |

---

## 8. Point d'attention sur le dépôt Git

Le dossier de travail `C:\Users\arist\Downloads\SitePleinCadre` est **vide**, et il se trouve à
l'intérieur d'un dépôt Git dont la racine est `C:\Users\arist` — autrement dit **tout le dossier
utilisateur est versionné** (`.claude.json`, `AppData`, `Documents`, `OneDrive`…). Un `git add`
depuis ici embarquerait des données personnelles dans le dépôt GitHub du client.

À faire avant la première ligne de code :

```bash
git init "C:/Users/arist/Downloads/SitePleinCadre"
```

puis vérifier que `git rev-parse --show-toplevel` renvoie bien `.../SitePleinCadre` avant tout
`git remote add`. Le dépôt parent dans le home est à traiter séparément (il n'a rien à faire là).
