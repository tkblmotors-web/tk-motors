import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VehicleCard } from "@/components/VehicleCard";
import { InquiryForm } from "@/components/InquiryForm";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  make?: string;
  q?: string;
  minPrice?: string;
  maxPrice?: string;
}>;

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const where: Prisma.VehicleWhereInput = { status: "PUBLISHED" };
  if (params.make) where.make = { equals: params.make, mode: "insensitive" };
  if (params.q) {
    where.OR = [
      { title: { contains: params.q, mode: "insensitive" } },
      { make: { contains: params.q, mode: "insensitive" } },
      { model: { contains: params.q, mode: "insensitive" } },
    ];
  }
  if (params.minPrice || params.maxPrice) {
    where.priceDZD = {
      ...(params.minPrice ? { gte: Number(params.minPrice) } : {}),
      ...(params.maxPrice ? { lte: Number(params.maxPrice) } : {}),
    };
  }

  const [vehicles, makes] = await Promise.all([
    prisma.vehicle.findMany({
      where,
      include: { images: { orderBy: { position: "asc" }, take: 1 } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.vehicle.findMany({
      where: { status: "PUBLISHED" },
      select: { make: true },
      distinct: ["make"],
    }),
  ]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-ink text-paper py-12">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="font-mono text-xs uppercase tracking-widest text-brass mb-2">
              Inventory
            </div>
            <h1 className="font-display text-4xl">Vehicles in stock</h1>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 sm:px-8 py-10 grid lg:grid-cols-[240px_1fr] gap-10">
          <form className="space-y-4 h-fit border border-ink/10 bg-white/60 p-5">
            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-steel block mb-1">
                Search
              </label>
              <input
                name="q"
                defaultValue={params.q}
                placeholder="Model, make…"
                className="w-full border border-ink/15 px-3 py-2 text-sm bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-steel block mb-1">
                Make
              </label>
              <select
                name="make"
                defaultValue={params.make ?? ""}
                className="w-full border border-ink/15 px-3 py-2 text-sm bg-white"
              >
                <option value="">All makes</option>
                {makes.map((m) => (
                  <option key={m.make} value={m.make}>
                    {m.make}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-steel block mb-1">
                  Min DA
                </label>
                <input
                  name="minPrice"
                  type="number"
                  defaultValue={params.minPrice}
                  className="w-full border border-ink/15 px-3 py-2 text-sm bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-steel block mb-1">
                  Max DA
                </label>
                <input
                  name="maxPrice"
                  type="number"
                  defaultValue={params.maxPrice}
                  className="w-full border border-ink/15 px-3 py-2 text-sm bg-white"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-ink text-paper py-2 text-sm font-semibold hover:bg-stamp transition-colors"
            >
              Apply filters
            </button>
          </form>

          <div>
            {vehicles.length === 0 ? (
              <div className="border border-dashed border-ink/20 p-12 text-center text-steel">
                No vehicles match those filters right now.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 mb-12">
                {vehicles.map((v) => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>
            )}
            <InquiryForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
