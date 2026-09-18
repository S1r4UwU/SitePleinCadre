# Site Plein Cadre Formation

Refonte du site de **Plein Cadre Formation *by ETL*** — organisme de formation certifié Qualiopi
proposant des stages intensifs de jeu face caméra à Lyon et Paris, destinés aux comédien·nes.

Site actuel (à remplacer) : https://www.pleincadre-formation.com — Wix.

## État du projet

| | |
|---|---|
| Phase | Audit terminé, conception en cours |
| Code applicatif | pas encore initialisé |
| Documentation | `docs/` |

## Documentation

- **[docs/audit-site-actuel.md](docs/audit-site-actuel.md)** — audit complet du site Wix existant :
  inventaire de contenu page par page, catalogue des 6 formations, design system relevé
  (couleurs, typographies, composants), parcours de conversion, SEO / accessibilité / performance,
  et 29 anomalies classées par gravité.
- **[docs/brief-refonte.md](docs/brief-refonte.md)** — brief de refonte : modèle de données,
  arborescence cible et redirections 301, stack recommandée, parcours de conversion,
  direction artistique, contenus à obtenir du client, découpage en lots.

## Principe directeur

> Une formation est une **donnée**, pas une page copiée-collée.

Sur le site actuel, chaque stage est saisi à la main trois fois (accueil, catalogue, fiche détail) :
les statuts et les prix divergent déjà, deux pages sont des doublons indexés par Google, et un titre
porte encore l'ancienne marque. La refonte repose sur une source unique : un objet `Session` d'où
sont générés les cartes, la fiche, les données structurées `Course` et les statuts.

## Contexte client

- **Entité** : École de Théâtre de Lyon — RCS Lyon 448 230 367
- **Lieux** : Lyon (53 rue des Tables Claudiennes) et Paris (38 rue de Torcy)
- **Certification** : Qualiopi n° 180411-5
- **Financements** : AFDAS (100 %), France Travail, financement personnel
- **Public** : comédien·nes professionnel·les et débutant·es, majoritairement intermittent·es

## Convention de branches

`main` est la branche de référence. Le travail se fait sur des branches `feat/*`, `fix/*`, `docs/*`
fusionnées par pull request.
