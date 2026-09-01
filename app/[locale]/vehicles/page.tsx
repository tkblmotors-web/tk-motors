import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VehicleCard } from "@/components/VehicleCard";
import { InquiryForm } from "@/components/InquiryForm";
import { prisma } from "@/lib/prisma";
import { Prisma } from '@/generated/prisma/client';
import { getTranslations, setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  make?: string;
  q?: string;
  minPrice?: string;
  maxPrice?: string;
}>;

export default async function VehiclesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Vehicles");

  const sp = await searchParams;

  const where: Prisma.VehicleWhereInput = { status: { in: ["PUBLISHED", "SOLD"] } };
  if (sp.make) where.make = { equals: sp.make, mode: "insensitive" };
  if (sp.q) {
    where.OR = [
      { title: { contains: sp.q, mode: "insensitive" } },
      { make: { contains: sp.q, mode: "insensitive" } },
      { model: { contains: sp.q, mode: "insensitive" } },
    ];
  }
  if (sp.minPrice || sp.maxPrice) {
    where.priceDZD = {
      ...(sp.minPrice ? { gte: Number(sp.minPrice) } : {}),
      ...(sp.maxPrice ? { lte: Number(sp.maxPrice) } : {}),
    };
  }

  const [vehicles, makes] = await Promise.all([
    prisma.vehicle.findMany({
      where,
      include: { images: { orderBy: { position: "asc" }, take: 1 } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.vehicle.findMany({
      where: { status: { in: ["PUBLISHED", "SOLD"] } },
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
              {t("inventoryLabel")}
            </div>
            <h1 className="font-display text-4xl">{t("title")}</h1>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 sm:px-8 py-10 grid lg:grid-cols-[240px_1fr] gap-10">
          <form className="space-y-4 h-fit border border-ink/10 bg-white/60 p-5">
            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-steel block mb-1">
                {t("searchLabel")}
              </label>
              <input
                name="q"
                defaultValue={sp.q}
                placeholder={t("searchPlaceholder")}
                className="w-full border border-ink/15 px-3 py-2 text-sm bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-steel block mb-1">
                {t("makeLabel")}
              </label>
              <select
                name="make"
                defaultValue={sp.make ?? ""}
                className="w-full border border-ink/15 px-3 py-2 text-sm bg-white"
              >
                <option value="">{t("allMakes")}</option>
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
                  {t("minPrice")}
                </label>
                <input
                  name="minPrice"
                  type="number"
                  defaultValue={sp.minPrice}
                  className="w-full border border-ink/15 px-3 py-2 text-sm bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-steel block mb-1">
                  {t("maxPrice")}
                </label>
                <input
                  name="maxPrice"
                  type="number"
                  defaultValue={sp.maxPrice}
                  className="w-full border border-ink/15 px-3 py-2 text-sm bg-white"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-ink text-paper py-2 text-sm font-semibold hover:bg-stamp transition-colors"
            >
              {t("applyFilters")}
            </button>
          </form>

          <div>
            {vehicles.length === 0 ? (
              <div className="border border-dashed border-ink/20 p-12 text-center text-steel">
                {t("noResults")}
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
