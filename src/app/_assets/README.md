# Polices embarquées

`Fraunces-144pt-Light.ttf` — instance statique (opsz 144, wght 300) de
[Fraunces](https://fonts.google.com/specimen/Fraunces), utilisée **uniquement** pour
générer les images de partage Open Graph (`src/lib/og.tsx`).

Pourquoi une instance statique alors que le site charge la version variable via
`next/font` ? Satori, le moteur de rendu derrière `next/og`, ne sait pas lire une police
variable : le fichier `Fraunces[SOFT,WONK,opsz,wght].ttf` le fait échouer avec
`Cannot read properties of undefined (reading '256')`.

Licence : SIL Open Font License 1.1 — voir `OFL-Fraunces.txt`.
