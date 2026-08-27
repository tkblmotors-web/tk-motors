import SocialProofBanner from "@/components/SocialProofBanner";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VehicleCard } from "@/components/VehicleCard";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = await prisma.vehicle.findMany({
    where: { status: { in: ["PUBLISHED", "SOLD"] } },
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    take: 6,
  });

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-brass mb-6">
              Manifeste d&apos;importation &middot; inchuon &rarr; Alger
            </div>
            <h1 className="font-display text-4xl sm:text-6xl leading-[1.05] max-w-3xl mb-6">
              Chaque véhicule que nous expédions porte son historique complet avec lui.
            </h1>
            <p className="text-paper/70 max-w-xl text-lg mb-10">
              {siteConfig.name} sélectionne des véhicules inspectés directement dans les
              enchères sud-coréennes, gère le dédouanement, et livre en Algérie avec un
              rapport d&apos;état documenté pour chaque véhicule.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/vehicles"
                className="bg-stamp hover:bg-stamp-dark transition-colors px-6 py-3 font-semibold"
              >
                Voir l&apos;inventaire actuel
              </Link>
              <Link
                href="/import-process"
                className="border border-paper/30 hover:border-paper transition-colors px-6 py-3 font-semibold"
              >
                Comment fonctionne l&apos;importation
              </Link>
            </div>

            <div className="mt-16 flex items-center gap-4 text-sm font-mono text-paper/60">
              <span>{siteConfig.originPort}</span>
              <span className="flex-1 h-px bg-paper/20 relative">
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-brass">
                  &#9972;
                </span>
              </span>
              <span>{siteConfig.destinationPort}</span>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14">
          <SocialProofBanner />
        </div>

        <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-steel mb-2">
                Stock actuel
              </div>
              <h2 className="font-display text-3xl">Arrivées récentes</h2>
            </div>
            <Link href="/vehicles" className="text-sm font-semibold hover:text-stamp">
              Voir tout &rarr;
            </Link>
          </div>

          {featured.length === 0 ? (
            <div className="border border-dashed border-ink/20 p-12 text-center text-steel">
              De nouveaux véhicules sont ajoutés régulièrement — revenez bientôt, ou
              contactez-nous pour la recherche d&apos;un modèle spécifique.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          )}
        </section>

        <section className="bg-paper-dim border-y border-ink/10">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 grid gap-8 sm:grid-cols-3">
            <div>
              <div className="font-mono text-brass text-xs uppercase tracking-widest mb-2">
                01 — Sélection
              </div>
              <p className="text-sm text-ink/80">
                Les véhicules sont sélectionnés directement auprès des maisons de
                vente aux enchères coréennes, sur la base de leurs rapports de
                grade et d&apos;inspection.
              </p>
            </div>
            <div>
              <div className="font-mono text-brass text-xs uppercase tracking-widest mb-2">
                02 — Expédition
              </div>
              <p className="text-sm text-ink/80">
                Nous gérons la documentation d&apos;export, le fret maritime, et le
                dédouanement en Algérie.
              </p>
            </div>
            <div>
              <div className="font-mono text-brass text-xs uppercase tracking-widest mb-2">
                03 — Livraison
              </div>
              <p className="text-sm text-ink/80">
                Récupérez votre véhicule dans notre showroom avec tous les
                documents et une inspection avant livraison.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
