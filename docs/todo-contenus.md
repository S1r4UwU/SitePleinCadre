# À obtenir du client avant mise en ligne

Le site est fonctionnel sans ces éléments — il les annonce honnêtement plutôt que de les
simuler. Mais chacun d'eux améliore directement la conversion ou la conformité.

## Bloquant pour la mise en ligne

- [ ] **Numéro de déclaration d'activité (NDA)** d'organisme de formation.
      Absent de l'ancien site alors qu'il est obligatoire.
      → renseigner `site.legal.numeroDeclarationActivite` dans `src/content/site.ts`
      (le paragraphe s'affiche automatiquement dans les mentions légales).
- [ ] **Forme juridique et R.C.S. exacts.** Les CGV de l'ancien site indiquaient
      « S.A.R.L. » et le R.C.S. `48 230 367`, les mentions légales `448 230 367`.
      C'est ce dernier qui est retenu — à confirmer.
- [ ] **Fin des CGV.** Les articles 1 à 4.1 sont repris du document publié. Les suivants
      (responsabilité, force majeure, données personnelles, règlement intérieur, litiges et
      médiation de la consommation) doivent être reportés depuis le document source.
      → `src/app/cgv/page.tsx`
- [ ] **Clé Resend + domaine d'envoi vérifié**, sinon le formulaire de candidature ne peut
      pas transmettre les dossiers en production. → voir `.env.example`.
- [ ] **Le CPF est-il réellement mobilisable ?** L'ancien site l'annonçait sur la page
      catalogue et ne le mentionnait pas sur la page financement.

## Fort impact commercial

- [ ] **Reportage photo d'un stage** — comédien·ne face caméra, retour vidéo, direction
      d'acteur·ice, visionnage collectif, le lieu des Tables Claudiennes.
      C'est le poste le plus important : en attendant, les visuels de session sont des
      ardoises de tournage dessinées, renseignées avec les vraies données.
      → déposer les fichiers dans `public/photos/` et renseigner `image` sur chaque session
      dans `src/content/sessions.ts` (l'ardoise s'efface d'elle-même).
- [ ] **Portraits des intervenant·es** + autorisation de publication.
      → `photo` dans `src/content/intervenants.ts`. Sans portrait, un monogramme s'affiche.
- [ ] **Photos et noms de l'équipe** — la page « L'école » parle d'une équipe qu'on ne voit
      jamais.
- [ ] **Témoignages** : 6 à 8, avec prénom, initiale, session suivie et année.
      Un seul existe aujourd'hui, il est repris tel quel. Aucun n'est inventé.
      → `src/content/temoignages.ts`
- [ ] **Taux de satisfaction sourcé** : chiffre, nombre de répondants, période.
      Tant que `repondants` et `periode` sont `null`, le chiffre global n'est pas mis en
      avant (un « 100 % » non sourcé est un point faible en audit Qualiopi).
- [ ] **Résultats obtenus** par session (indicateur Qualiopi) → champ `resultatsObtenus`.
      La rubrique ne s'affiche que si elle est renseignée : plus de titre suivi de rien.
- [ ] **Tarifs** des sessions de février, mars et avril 2027. Aujourd'hui `prix: null`,
      affiché « Tarif communiqué prochainement ».
- [ ] **Intervenant·es** des sessions de décembre 2026 et janvier 2027 (aujourd'hui
      « en cours de validation », comme sur l'ancien site).
- [ ] **Comptes Instagram et Facebook réels.** L'ancien site pointait vers
      `facebook.com/wix` et `instagram.com/wix`. Tant que `site.reseaux` vaut `null`,
      aucun lien social ne s'affiche.
- [ ] **Logo vectoriel** Plein Cadre + ETL, et **logo Qualiopi officiel en vectoriel**
      (l'ancien site utilisait une capture d'écran du certificat).
      Le verrou actuel est redessiné en SVG dans `src/components/Logo.tsx`.

## Pour la bascule

- [ ] Accès **Google Search Console** (soumettre le nouveau sitemap, surveiller les 301).
- [ ] Accès au **registrar du domaine** pour pointer les DNS.
- [ ] Vérifier que la redirection `/copie-de-2-réals-janvier` fonctionne : cette page
      dupliquée est actuellement indexée par Google.
- [ ] Décider du sort des adresses e-mail : `contact@` reste-t-elle l'adresse de réception
      des candidatures ?

## Convention d'écriture inclusive

L'ancien site mélangeait `.e.s`, `.es`, `·e·s` et `.ice.s`. Le nouveau site utilise
systématiquement le **point médian** : `comédien·nes`, `réalisateur·ices`,
`directeur·ices`, `intervenant·es`. À valider avec le client.
