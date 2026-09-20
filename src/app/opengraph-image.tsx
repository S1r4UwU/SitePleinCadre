import { imageOg, tailleOg, typeOg } from "@/lib/og";

export const alt = "Plein Cadre Formation — stages intensifs de jeu face caméra";
export const size = tailleOg;
export const contentType = typeOg;

export default async function Image() {
  return imageOg({
    surtitre: "Plein Cadre Formation · Lyon & Paris",
    titre: "Stages intensifs de jeu face caméra",
    faits: ["Certifié Qualiopi", "AFDAS", "France Travail"],
  });
}
