# Audit complet — pleincadre-formation.com

> Audit réalisé le 18/09/2026 sur le site en production (https://www.pleincadre-formation.com).
> Méthode : parcours des 15 pages du sitemap + 5 pages « portfolio-collections », lecture du DOM,
> inspection réseau, vérification HTTP des liens, tests desktop 1440×900 et mobile 375×812.

---

## 1. Verdict en une page

Le site est un **Wix (moteur Thunderbolt)** construit par le client lui-même. Le fond est bon :
le contenu pédagogique des fiches formation est riche, précis, conforme au vocabulaire du métier,
et la direction artistique (crème / bleu nuit / terracotta, serif Fraunces) a une vraie personnalité —
elle ne ressemble pas à un template. **C'est la couche de surface qui est à refaire, pas l'identité.**

Les problèmes se rangent en quatre familles :

| Famille | Gravité | Résumé |
|---|---|---|
| **Contenu dupliqué / désynchronisé** | Critique | Les mêmes formations sont saisies 2 à 3 fois à la main (accueil, catalogue, fiche). Les statuts et les prix divergent déjà. |
| **Liens morts & pages vides** | Critique | 2 des 5 catégories d'intervenants renvoient un 404, les 3 autres sont des coquilles vides. Page « Nos formations » blanche pendant ~1 s. |
| **Traces de bricolage visibles** | Majeur | Titre de page « CAMCAST FORMATION » (ancienne marque), réseaux sociaux pointant vers les comptes de Wix, page 404 en anglais, `alt` = « Capture d'écran 2026-03-09 à 11.21.53.png ». |
| **SEO / conformité / perf** | Majeur | Aucun balisage `Course`, page dupliquée indexée par Google, numéro de déclaration d'activité absent, indicateurs Qualiopi « Résultats obtenus » vides, 31 fichiers JS sur l'accueil. |

**Conclusion pour la refonte** : le travail n'est pas « refaire un joli site », c'est
**transformer un site saisi à la main en un site piloté par une source de données unique**,
où une formation = un objet (dates, prix, statut, intervenants, lieu) qui s'affiche partout
automatiquement. C'est ce qui règle 70 % des bugs listés plus bas, et c'est l'argument de vente
principal face à Wix.

---

## 2. Fiche d'identité (à réutiliser telle quelle)

| | |
|---|---|
| **Marque** | Plein Cadre Formation *by ETL* |
| **Entité juridique** | École de Théâtre de Lyon — capital 8 000 € — RCS Lyon **448 230 367** — TVA **FR95448230367** |
| **Siège** | 1 place Chardonnet, 69001 Lyon |
| **Adresse Paris** | 38 rue de Torcy, 75018 Paris |
| **Lieu réel des stages (Lyon)** | 53 rue des Tables Claudiennes, 69001 Lyon |
| **Représentant légal** | Jean-Marc Andrieu |
| **Directrice de publication** | Edith Hennaut |
| **Référente handicap** | Edith Hennaut — 04 81 65 15 56 |
| **Contact formation** | 06 43 04 50 17 — contact@pleincadre-formation.com |
| **Certification** | Qualiopi n° **180411-5**, dernière édition 05/12/2025 (le numéro n'apparaît **que** dans le nom du fichier PDF, nulle part sur le site) |
| **Financements** | AFDAS (100 %), France Travail, financement personnel, entreprise |
| **Site frère** | ecoledetheatredelyon.com (formation initiale) |
| **Hébergement actuel** | Wix Online Platform Ltd (Dublin) |

**Incohérence juridique à faire trancher par le client** : les mentions légales disent
« société » RCS **448 230 367**, les CGV disent « S.A.R.L. » RCS **48 230 367** (un chiffre manquant).
Le RCS correct est vraisemblablement 448 230 367.

---

## 3. Architecture de l'information actuelle

```
/                              Accueil
├── /nos-formations            Catalogue (6 cartes)
│   ├── /5-dircast-novembre           L'acteur.rice face à 5 dir. de casting — nov. 2026
│   ├── /1-real-1-dircast-decembre    Parcours et carrière artistique — déc. 2026
│   ├── /2-réals-juin                 L'acteur.rice dirigé.e par 2 réals — janv. 2027
│   ├── /copie-de-2-réals-janvier     DOUBLON EXACT de /1-real-1-dircast-decembre
│   └── /copie-de-2-réals-juin        page orpheline
├── /nos-intervenants          5 vignettes → portfolio-collections
│   ├── /portfolio-collections/my-portfolio                200 — « Les dir. de casting » (vide)
│   ├── /portfolio-collections/les-réalisateurices         404
│   ├── /portfolio-collections/les-agentes                 200 (vide)
│   ├── /portfolio-collections/les-acteurices              200 (vide)
│   └── /portfolio-collections/les-autres-corps-de-métier  404
├── /inscription               Formulaire de candidature
├── /about-4                   intitulé « À propos » en nav, contenu = « Réclamations »
├── /qui-sommes-nous           Le vrai « à propos »
├── /financement               AFDAS / France Travail / perso
├── /cgv  /mentions-légales  /politique-de-confidentialité
└── 404                        en anglais
```

### Ce qui cloche dans l'arborescence

1. **Deux entrées de menu pour « qui nous sommes »** dont une menteuse : `À propos` → page Réclamations.
   L'utilisateur qui veut connaître l'organisme tombe sur un formulaire de plainte.
2. **7 entrées de menu** de niveau 1 + un « More » qui déborde : le menu ne tient déjà plus.
3. **Les slugs sont des notes de chantier** : `about-4`, `copie-de-2-réals-janvier`, `5-dircast-novembre`,
   `my-portfolio`, plus des accents dans les URLs (`/2-réals-juin`) — mauvais pour le SEO, illisible
   quand un stagiaire colle le lien dans un mail, et impossible à maintenir.
4. **Les slugs mentent sur le contenu** : `/2-réals-juin` affiche un stage de **janvier 2027**,
   `/copie-de-2-réals-janvier` affiche le stage de **décembre 2026**.
5. **Aucune page « Contact »**, aucune page « Lieux », aucune page « FAQ / financement pas à pas »,
   aucune page « Témoignages », aucun blog / actualités — donc aucune surface pour le référencement
   longue traîne (« comment financer un stage AFDAS », « casting Lyon », etc.).

---

## 4. Inventaire de contenu, page par page

### 4.1 Accueil
- **H1** : « Stages intensifs de jeu face caméra » (serif blanc 106 px sur photo).
- Hero : gros plan noir & blanc d'un clap (« SCENE »), en `<video>` muette en boucle.
- Sous-titres : « Avec des réalisateur.ices, des directeur.ices de casting, et plus encore… » /
  « Formez-vous au jeu face caméra avec les professionnel.le.s du secteur » + bouton *Nos formations*.
- Section « Nos prochaines formations » + logo Qualiopi + **4 cartes** (sur les 6 du catalogue)
  + bouton *TOUTES NOS FORMATIONS*.
- Bloc terracotta « Bienvenue chez Plein Cadre ! » : ~450 mots d'un seul tenant, 4 paragraphes,
  lien texte nu « En savoir plus sur Plein Cadre ».
- « Taux de satisfaction : 100 % » + **un seul** témoignage (Sophie C.).
- Footer : newsletter, contacts, mentions, adresses, réseaux sociaux.

**Problèmes** : deux `<h1>` sur la page (le hero et « Bienvenue chez Plein Cadre ! ») ;
seulement 4 formations sur 6 ; la 4ᵉ carte est seule sur sa ligne (rythme de grille cassé) ;
le pavé terracotta est illisible en l'état (aucune hiérarchie, aucune respiration) ;
« 100 % de satisfaction » sans base de calcul ni période (exigence Qualiopi) ;
un seul avis client sur tout le site alors que c'est l'argument n°1 du secteur.

### 4.2 Nos formations (page la plus stratégique — et la plus cassée)
Contenu réel : 6 cartes. Mais au premier chargement, **la zone des cartes reste blanche pendant
environ une seconde** (galerie Wix rendue après chargement des images) : un visiteur qui scrolle vite
voit une page vide avec deux titres. C'est la page de conversion principale.

Autres problèmes : cartes de hauteurs inégales (grille non alignée) ; le bouton flottant
*INSCRIPTION* recouvre le bouton « + D'INFOS À VENIR » de la 3ᵉ carte ; le sous-titre du haut dit
« conventionnées AFDAS et France Travail », celui du bas dit « AFDAS, France Travail, **CPF** »
alors que **la page /financement ne mentionne pas le CPF** ; le style des cartes (bleu plein) ne
correspond pas à celui de l'accueil (contour bleu sur crème).

### 4.3 Catalogue des 6 formations

| Formation | Dates | Durée | Lieu | Prix | Statut (accueil) | Statut (catalogue) |
|---|---|---|---|---|---|---|
| L'acteur.rice face à 5 directeur.rices de casting | 16 → 20 nov. 2026 | 35 h / 5 j | Lyon | « À partir de 1 400 € » | INSCRIPTIONS OUVERTES | INSCRIPTIONS OUVERTES **PROCHAINEMENT** |
| Parcours et carrière artistique, jeu et singularité | 14 → 18 déc. 2026 | 35 h / 5 j | Lyon | 1 500 € | INSCRIPTIONS OUVERTES | INSCRIPTIONS OUVERTES |
| L'acteur.rice dirigé.e par deux réalisateur.rices | 11 → 22 janv. 2027 | 70 h / 10 j | Lyon | 3 000 € | INSCRIPTIONS OUVERTES PROCHAINEMENT | INSCRIPTIONS **À VENIR** |
| L'acteur.rice face à 5 agents artistiques | 1er → 5 fév. 2027 | 35 h / 5 j | Lyon | non indiqué | INSCRIPTIONS OUVERTES PROCHAINEMENT | INSCRIPTIONS À VENIR |
| L'acteur.rice face à 5 directeur.rices de casting | 1er → 5 mars 2027 | 35 h / 5 j | Lyon | non indiqué | *absente* | INSCRIPTIONS À VENIR |
| L'acteur.rice face à 10 directeur.rices de casting | 19 → 23 avril 2027 | 35 h / 5 j | Lyon | non indiqué | *absente* | PROCHAINEMENT |

**Les statuts divergent déjà entre l'accueil et le catalogue pour 2 formations sur 4.**
C'est la preuve par l'exemple que la saisie manuelle en double ne tient pas. Sur la fiche détail,
le stage de novembre est « à partir de 1 400 € » ; 4 formations sur 6 n'affichent aucun prix,
alors que le prix conditionne la demande AFDAS.

**Structure d'une fiche formation** (excellente, à conserver telle quelle dans la refonte) :
titre + baseline · dates / durée / lieu · Objectifs pédagogiques · Programme jour par jour ·
Les intervenant.es · Dates & durée · Coût & financement (+ dates limites AFDAS / France Travail) ·
Lieu · Pour qui ? · Pré-requis · Effectifs · Fonctionnement · Modalités d'évaluation ·
Moyens techniques (caméra + cadreur, retour vidéo, micros, panneaux LED) · Livrables (rushes +
certificat) · Taux de satisfaction · Résultats obtenus · Demande d'inscription · Contact.

**Attention** : les rubriques **« Résultats obtenus »** et, sur certaines fiches, **« Taux de
satisfaction »** sont des **titres suivis de rien**. Ce sont des indicateurs Qualiopi (diffusion des
résultats obtenus). En audit de surveillance, un titre vide est pire que pas de titre.

### 4.4 Nos intervenant.e.s
Une phrase d'intro, puis 5 vignettes : dir. de casting / réalisateur.ice.s / agent.e.s /
acteur.ice.s / autres corps de métier.

- **2 vignettes sur 5 mènent à un 404** (celles dont le slug contient un accent).
- **Les 3 pages qui répondent sont vides** : un paragraphe d'intro, aucune galerie, et le texte d'aide
  de l'éditeur Wix est servi dans le HTML public :
  *« No Collections Here — Sort your projects into collections. Click on "Manage Collections" to get started »*.
- La page affiche **une grande zone grise vide** au premier rendu ; les images n'apparaissent qu'après scroll.

Or **les intervenants sont l'argument commercial n°1**. La seule page qui les nomme vraiment est la
fiche de novembre : Marion Touitou, Alexandra Weyers, François Guignard, Emmanuel Thomas,
Winifrey Bandera-Guzman — avec des bios courtes et de vraies références (*De battre mon cœur s'est
arrêté*, *Les Amandiers*, *De Gaulle*). Ce contenu mérite des fiches individuelles réutilisables.

### 4.5 Inscription
Formulaire unique : formation souhaitée (liste) · nom · prénom · email · téléphone ·
date de naissance · ville · mode de financement (liste) · situation de handicap ·
upload CV + lettre + photo · lien bande-démo.

**Problèmes** : « oui / non » pour le handicap est implémenté en **deux cases à cocher indépendantes**
(on peut cocher les deux, ou aucune) au lieu de boutons radio — donnée inexploitable et non accessible ;
aucune case de **consentement RGPD** ni lien vers la politique de confidentialité au moment de l'envoi,
alors qu'on collecte une date de naissance, une photo et une donnée de santé (handicap) ;
le libellé « Êtes-vous en situation de handicap ? » est tronqué sur deux lignes qui débordent ;
pas de choix de **session** (seulement le nom de la formation) ; formulaire d'un seul bloc sur fond
bleu nuit avec des libellés très petits et peu contrastés ; aucun message de réassurance
(délai de réponse, ce qui se passe ensuite).

### 4.6 Qui sommes-nous
Bon texte : équipe de professionnels en activité, 15 ans d'expérience, valeurs (partage, écoute,
respect, bienveillance, créativité), suivi personnalisé, moyens techniques, mention handicap avec
la référente et son numéro, mention Qualiopi/AFDAS. **Aucune photo, aucun nom, aucun visage** —
alors que la page parle d'une équipe.

### 4.7 Financement
Contenu utile (48 cachets AFDAS sur 24 mois, procédure portail, délais 3 semaines / 1 mois,
France Travail au 3949, financement personnel). Mais **les URL sont collées en texte brut**
(afdas.com…, youtube.com/watch?v=…) au lieu d'être des liens nommés, le tout en un seul bloc sans
séparation claire entre les trois dispositifs, et **le CPF n'y figure pas** alors qu'il est promis
ailleurs sur le site.

### 4.8 Pages légales
CGV complètes et sérieuses (application, inscription, paiement, annulation à 45 jours,
rétractation 14 jours art. L6353-5). Mentions légales complètes **sauf le numéro de déclaration
d'activité (NDA) de l'organisme de formation**, obligatoire, et le numéro de certificat Qualiopi.

---

## 5. Design system actuel (relevé exact — à reprendre, pas à jeter)

### Couleurs réellement utilisées
| Rôle | Hex | Usage constaté |
|---|---|---|
| Fond principal | `#F9F2E7` | Crème chaud, toutes les pages |
| Fond secondaire | `#F4E6D3` | Nuance de crème |
| Bleu nuit primaire | `#000069` | Titres, boutons, cartes, logo |
| Bleu encre (texte) | `#000036` | Corps de texte |
| Indigo carte | `#323084` | Cartes du catalogue |
| Terracotta | `#BD5041` | Bloc « Bienvenue » (utilisé **une seule fois** sur tout le site) |

Le trio **crème / bleu nuit / terracotta** est bon et rare dans le secteur (les concurrents sont
tous en noir/blanc/rouge). À garder et à **systématiser** : aujourd'hui le terracotta apparaît une
fois et ne revient jamais, ce qui donne l'impression d'un accident plutôt que d'un parti pris.

### Typographie
- **Fraunces 120pt Light** (serif variable, contrasté, très « affiche de cinéma ») pour les titres.
  → disponible sur Google Fonts, **à conserver**, c'est la signature du site.
- **Avenir LT W01 35 Light / 85 Heavy** pour le texte courant → police sous licence Wix, non
  redistribuable. Remplacer par une grotesque géométrique proche : **Mulish**, **Nunito Sans**
  ou **Be Vietnam Pro** (éviter Inter, trop « produit SaaS »).
- Le corps de texte est massivement sous 14 px (**93 blocs de texte < 14 px sur l'accueil**),
  en graisse Light, sur fond crème : c'est le principal défaut de lisibilité du site.

### Composants existants
Carte formation (image 16:10 + titre + dates + statut + description + bouton), bouton pilule,
bouton flottant *INSCRIPTION*, vignette intervenant avec survol, formulaire, footer newsletter,
filet de séparation fin. Forme caractéristique : **coins très arrondis en haut et un seul coin
arrondi en bas** sur les cartes — c'est joli et reconnaissable, à garder comme signature.

### Imagerie — le point faible
| Image | Constat |
|---|---|
| Hero | Clap « SCENE » N&B en très gros plan : fort, mais ne montre ni comédien, ni plateau, ni ce qu'on vient chercher. |
| Carte 1 | Photo d'un homme devant un paperboard, public sur des chaises → ressemble à un **séminaire d'entreprise**, pas à un stage de jeu face caméra. |
| Carte 2 | Clap générique (banque d'images). |
| Cartes 3-4 | **Captures d'écran** (`Capture d'écran 2026-03-09 à 11.21.53.png`) — donc recadrées, recompressées, floues. |
| Vignette « dir. de casting » | Fichier `Hotels-Models14015 2_edit_new 2.jpg` → photo de banque d'images. |
| Logo Qualiopi | **Capture d'écran du certificat**, pixellisée, texte légal illisible. |
| `alt` | Sur la plupart des images : le **nom du fichier**. 2 images sans `alt` du tout. |

Une image est même **affichée en 799 px de large alors que le fichier chargé fait 62 px** (placeholder
flou jamais remplacé).

**Recommandation forte** : commander au client une **vraie séance photo d'un stage**
(comédien face caméra, retour vidéo, réalisateur qui dirige, groupe en visionnage, le lieu des Tables
Claudiennes) + les **rushes** dont ils disposent déjà. C'est le seul poste où la refonte ne peut pas
compenser le manque de matière, et c'est ce qui fera 80 % de la différence perçue.

---

## 6. Parcours utilisateur et conversion

**Parcours réel d'un comédien qui cherche un stage** :
Accueil → 4 cartes sur 6 → fiche formation (longue, riche, très bien) → « Demande d'inscription :
envoyez CV + lettre + photo + bande-démo par mail **ou** remplissez ce formulaire » → /inscription.

**Frictions identifiées**

1. **Double chemin d'inscription** (mail *ou* formulaire) présenté à égalité → hésitation, et côté
   organisme deux canaux à réconcilier.
2. **Le bouton flottant *INSCRIPTION* est présent sur toutes les pages** mais mène à un formulaire
   générique : le contexte (quelle formation, quelle session) est perdu, l'utilisateur doit le
   re-sélectionner. Il **recouvre en permanence le coin bas-droit** : sur le catalogue il masque un
   bouton de carte, sur l'accueil il masque la mention de copyright.
3. **Aucune information sur ce qui se passe après l'envoi** : délai de réponse, sélection sur dossier
   ou non, qui rappelle. Pour un stage à 1 500–3 000 €, c'est un facteur d'abandon majeur.
4. **Le financement, qui est LA question du public visé (intermittents)**, est une page de texte
   en fin de menu au lieu d'être un simulateur / arbre de décision (« Je suis intermittent →
   48 cachets ? → AFDAS 100 % → voici les 3 étapes et la date limite pour CETTE session »).
5. **Les dates limites AFDAS / France Travail** existent sur les fiches mais ne sont jamais mises en
   avant comme une urgence (« Plus que 12 jours pour déposer votre dossier AFDAS »).
6. **Aucune preuve sociale** hormis un témoignage et un « 100 % » non sourcé.
7. **Newsletter en pied de page** avec une case pré-cochée sur certaines pages, non cochée sur
   d'autres — et pas de mention de finalité ni de désinscription.

---

## 7. Technique, performance, SEO, accessibilité

### Technique
- **Wix Thunderbolt** (React 18 + lodash + core-js + Sentry + tag-manager).
- **31 fichiers JS** sur l'accueil, ~107 requêtes réseau. Les 10 principaux fichiers pèsent
  **≈ 374 Ko compressés** à eux seuls, hors images et hors ~20 bundles de composants Wix.
- HTML de l'accueil : **612 Ko non compressés / 123 Ko gzip**.
- Redirections OK (http → https, apex → www), HSTS présent, 404 renvoie bien un code 404.
- `robots.txt` auto-généré correct, `sitemap.xml` présent.

### SEO
| Point | État |
|---|---|
| `<title>` accueil | OK — « Accueil \| STAGE JEU FACE CAMÉRA » (améliorable : « Accueil » ne sert à rien) |
| Meta descriptions | OK — présentes et rédigées sur toutes les pages |
| Canonical | OK |
| **Titre de /5-dircast-novembre** | KO — « …- **Juillet 26** \| **CAMCAST FORMATION** » : mauvaise date **et ancienne marque** |
| **Titre de /2-réals-juin** | KO — « …**juin 26**… » pour un stage de **janvier 2027** |
| **Page dupliquée indexée** | KO — `/copie-de-2-réals-janvier` **remonte dans les résultats Google**, doublon exact de `/1-real-1-dircast-decembre` |
| **Données structurées** | KO — uniquement `WebSite`. Aucun `Course`, `EducationalOccupationalProgram`, `Organization`, `LocalBusiness`, `FAQPage` → aucune chance de résultat enrichi alors que le secteur s'y prête parfaitement |
| Hn | KO — **deux `<h1>` sur l'accueil**, **zéro `<h1>`** sur /nos-formations, /nos-intervenants, /qui-sommes-nous et les fiches formation (tout est en `<h2>`) |
| `alt` | KO — noms de fichiers en guise d'alternatives textuelles |
| URLs | Moyen — accents, « copie-de- », « about-4 », « my-portfolio » |
| Pages locales | KO — aucune page « Stage jeu face caméra à Lyon » / « à Paris » alors que c'est la requête cible |

### Accessibilité
- Les deux « cases » oui/non du formulaire au lieu de boutons radio.
- Absence de `<h1>` sur la majorité des pages, hiérarchie de titres incohérente.
- `alt` non pertinents, 2 images sans `alt`.
- 93 blocs de texte sous 14 px en graisse Light.
- Texte du hero sur photo animée, contraste variable selon l'image.
- Bouton flottant qui recouvre des contenus et des contrôles (bloquant sur mobile).
- Libellé de champ tronqué (« Êtes-vous en situation de handicap ? »).
- Points positifs : `lang="fr"`, bouton « Passer au contenu principal » (fourni par Wix).

> Enjeu spécifique : cet organisme **affiche une politique handicap et une référente handicap**.
> Un site non accessible sur sa propre page handicap est le genre de détail qu'un auditeur Qualiopi
> ou un stagiaire concerné remarque immédiatement.

---

## 8. Liste des anomalies, par gravité

### Critique (à corriger dans la refonte, et idéalement sur Wix dès maintenant)
1. `/portfolio-collections/les-réalisateurices` → **404**.
2. `/portfolio-collections/les-autres-corps-de-métier` → **404**.
3. Les 3 autres catégories d'intervenants sont **vides** et exposent le texte d'aide de l'éditeur Wix
   (« No Collections Here… Click on "Manage Collections" »).
4. **Réseaux sociaux du footer → `facebook.com/wix` et `instagram.com/wix`** : les liens par défaut
   de Wix n'ont jamais été remplacés, sur toutes les pages.
5. Titre SEO d'une fiche portant **l'ancienne marque « CAMCAST FORMATION »** et une date erronée.
6. **Page dupliquée indexée** par Google (`/copie-de-2-réals-janvier`).
7. Statuts d'inscription **contradictoires** entre l'accueil et le catalogue (2 formations sur 4).
8. **Page 404 en anglais** sur un site francophone.
9. Formulaire : handicap en cases à cocher (donnée faussée) + **aucun consentement RGPD** pour des
   données sensibles (photo, date de naissance, handicap).

### Majeur
10. Zone de contenu **blanche ~1 s** sur /nos-formations et zone grise vide sur /nos-intervenants.
11. Bouton flottant *INSCRIPTION* qui **recouvre** boutons et mentions légales.
12. Menu « À propos » → page **Réclamations**.
13. Rubriques Qualiopi **« Résultats obtenus » et « Taux de satisfaction » vides**.
14. **NDA (numéro de déclaration d'activité) absent** des mentions légales ; n° Qualiopi 180411-5
    présent uniquement dans le nom d'un fichier PDF.
15. **CPF annoncé** sur /nos-formations, **absent** de /financement.
16. RCS incohérent entre CGV et mentions légales.
17. Prix manquant sur 4 formations sur 6 ; prix divergents sur la formation de novembre.
18. Aucune donnée structurée `Course` / `Organization`.
19. Zéro `<h1>` sur les pages internes.
20. Images = captures d'écran, `alt` = noms de fichiers, logo Qualiopi pixellisé.

### Mineur
21. Slugs incohérents et accentués ; `about-4`, `my-portfolio`, `copie-de-…`.
22. Hauteurs de cartes inégales ; 4ᵉ carte seule sur sa ligne.
23. Deux styles de carte différents entre accueil et catalogue.
24. URLs collées en texte brut sur /financement.
25. Pavé de 450 mots sans hiérarchie sur l'accueil.
26. Un seul témoignage sur tout le site.
27. Case newsletter pré-cochée sur certaines pages seulement.
28. Header mobile : logo + bouton + burger occupent ~270 px avant le hero.
29. Bulle flottante Wix (« … ») en bas à droite sur mobile, en plus du bouton inscription.
