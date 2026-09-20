"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container, Email, Section } from "@/components/ui";
import { site } from "@/content/site";

export default function Erreur({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">Incident technique</p>
            <h1 className="mt-6 text-4xl sm:text-5xl">
              Il y a eu un raté sur cette prise.
            </h1>
            <p className="measure mt-8 text-lg text-ink-soft">
              Cette page n'a pas pu s'afficher. Ce n'est pas vous : c'est de notre côté.
              Réessayez, et si le problème persiste, écrivez-nous — nous répondons vite.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={reset}
                className="rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-navy-deep"
              >
                Réessayer
              </button>
              <Link
                href="/"
                className="rounded-full border border-navy/30 px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-cream"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border-t border-ink/15 pt-6">
              <h2 className="eyebrow">Nous joindre</h2>
              <p className="tnum mt-5 text-lg">
                <a
                  href={`tel:${site.contact.telephoneLien}`}
                  className="font-semibold text-navy underline underline-offset-4"
                >
                  {site.contact.telephone}
                </a>
              </p>
              <p className="mt-2">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-navy underline underline-offset-4"
                >
                  <Email adresse={site.contact.email} />
                </a>
              </p>
              {error.digest && (
                <p className="tnum mt-6 text-xs text-ink-mute">
                  Référence technique : {error.digest}
                </p>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
