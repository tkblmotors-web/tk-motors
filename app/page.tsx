import Image from "next/image";
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
        <HeroBanner />


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
              Véhicules occasion &rarr;
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
