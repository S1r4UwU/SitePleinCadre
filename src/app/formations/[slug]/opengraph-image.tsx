import { notFound } from "next/navigation";
import { getSession, sessions } from "@/content/sessions";
import { periode } from "@/lib/dates";
import { duree, libellePrix } from "@/lib/format";
import { imageOg, tailleOg, typeOg } from "@/lib/og";

export const size = tailleOg;
export const contentType = typeOg;

export function generateStaticParams() {
  return sessions.map((session) => ({ slug: session.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = getSession(slug);
  if (!session) notFound();

  return imageOg({
    surtitre: `${session.lieu.ville} · ${periode(session.dateDebut, session.dateFin)}`,
    titre: session.titre,
    faits: [duree(session), libellePrix(session), "AFDAS · France Travail"],
  });
}
