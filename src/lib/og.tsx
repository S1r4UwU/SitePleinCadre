import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Image de partage.
 *
 * L'ancien site partageait une capture PNG de 2500 px figée, identique pour
 * toutes les pages. Ici chaque session génère la sienne, avec ses vraies dates.
 */

export const tailleOg = { width: 1200, height: 630 };
export const typeOg = "image/png";

const CREME = "#F9F2E7";
const ENCRE = "#000036";
const NUIT = "#000069";
const TERRE = "#BD5041";

/**
 * Instance statique de Fraunces (144pt Light, 71 Ko).
 *
 * Satori ne sait pas lire une police variable : le fichier `Fraunces[SOFT,WONK,
 * opsz,wght].ttf` distribué par Google Fonts le fait échouer. On embarque donc
 * l'instance figée qui correspond au titrage du site.
 */
async function fraunces() {
  return readFile(join(process.cwd(), "src/app/_assets/Fraunces-144pt-Light.ttf"));
}

/** Équerre d'angle — le motif du viseur, repris de l'interface. */
function Equerre({ position }: { position: "haut-gauche" | "bas-droit" }) {
  const haut = position === "haut-gauche";
  return (
    <div
      style={{
        position: "absolute",
        width: 56,
        height: 56,
        ...(haut
          ? {
              top: 48,
              left: 56,
              borderTop: `2px solid ${TERRE}`,
              borderLeft: `2px solid ${TERRE}`,
            }
          : {
              bottom: 48,
              right: 56,
              borderBottom: `2px solid ${TERRE}`,
              borderRight: `2px solid ${TERRE}`,
            }),
      }}
    />
  );
}

export async function imageOg({
  surtitre,
  titre,
  faits,
}: {
  surtitre: string;
  titre: string;
  faits: string[];
}) {
  const police = await fraunces();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: CREME,
        padding: "72px 80px",
        position: "relative",
      }}
    >
      <Equerre position="haut-gauche" />
      <Equerre position="bas-droit" />

      {/* Barre claquante, comme sur les ardoises du site */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 14,
          display: "flex",
        }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              backgroundColor: i % 2 === 0 ? NUIT : TERRE,
            }}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 20,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: TERRE,
          fontWeight: 600,
        }}
      >
        {surtitre}
      </div>

      <div
        style={{
          display: "flex",
          fontFamily: "Fraunces",
          fontSize: titre.length > 46 ? 68 : 84,
          lineHeight: 1.04,
          color: ENCRE,
          maxWidth: 1000,
        }}
      >
        {titre}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `1px solid ${ENCRE}33`,
          paddingTop: 28,
        }}
      >
        <div style={{ display: "flex", gap: 28, fontSize: 24, color: ENCRE }}>
          {faits.map((fait) => (
            <div key={fait} style={{ display: "flex" }}>
              {fait}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Fraunces",
            fontSize: 30,
            color: NUIT,
          }}
        >
          Plein Cadre
        </div>
      </div>
    </div>,
    {
      ...tailleOg,
      fonts: [{ name: "Fraunces", data: police, style: "normal", weight: 400 }],
    },
  );
}
