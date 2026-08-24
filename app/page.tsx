import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VehicleCard } from "@/components/VehicleCard";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = await prisma.vehicle.findMany({
    where: { status: "PUBLISHED" },
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
              Import manifest &middot; Busan &rarr; Algiers
            </div>
            <h1 className="font-display text-4xl sm:text-6xl leading-[1.05] max-w-3xl mb-6">
              Every vehicle we ship carries its full history with it.
            </h1>
            <p className="text-paper/70 max-w-xl text-lg mb-10">
              {siteConfig.name} sources inspected vehicles directly from South Korean
              auctions, handles customs clearance, and delivers to Algeria with a
              documented condition report on every unit.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/vehicles"
                className="bg-stamp hover:bg-stamp-dark transition-colors px-6 py-3 font-semibold"
              >
                View current inventory
              </Link>
              <Link
                href="/import-process"
                className="border border-paper/30 hover:border-paper transition-colors px-6 py-3 font-semibold"
              >
                How the import works
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

        <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-steel mb-2">
                Current stock
              </div>
              <h2 className="font-display text-3xl">Recently landed</h2>
            </div>
            <Link href="/vehicles" className="text-sm font-semibold hover:text-stamp">
              View all &rarr;
            </Link>
          </div>

          {featured.length === 0 ? (
            <div className="border border-dashed border-ink/20 p-12 text-center text-steel">
              New vehicles are added regularly — check back soon, or contact us about
              sourcing a specific model.
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
                01 — Sourced
              </div>
              <p className="text-sm text-ink/80">
                Vehicles are selected directly from Korean auction houses using
                grade and inspection reports.
              </p>
            </div>
            <div>
              <div className="font-mono text-brass text-xs uppercase tracking-widest mb-2">
                02 — Shipped
              </div>
              <p className="text-sm text-ink/80">
                We handle export documentation, ocean freight, and customs
                clearance in Algeria.
              </p>
            </div>
            <div>
              <div className="font-mono text-brass text-xs uppercase tracking-widest mb-2">
                03 — Delivered
              </div>
              <p className="text-sm text-ink/80">
                Collect from our showroom with full paperwork and a
                pre-delivery inspection.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
