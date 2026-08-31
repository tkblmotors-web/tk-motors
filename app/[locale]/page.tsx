import SocialProofBanner from "@/components/SocialProofBanner";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroBanner } from "@/components/HeroBanner";
import { AlertTicker } from "@/components/AlertTicker";
import { VehicleCard } from "@/components/VehicleCard";
import { prisma } from "@/lib/prisma";
import { RecentlyViewedSection } from "@/components/home/RecentlyViewedSection";
import { DeliveredRecentlySection } from "@/components/home/DeliveredRecentlySection";
import { CustomOrderButton } from "@/components/custom-order/CustomOrderButton";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

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
        <AlertTicker />

        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14">
          <SocialProofBanner />
        </div>

        <div className="mx-auto max-w-6xl px-5 sm:px-8 flex justify-center sm:justify-start">
          <CustomOrderButton />
        </div>

        <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-steel mb-2">
                {t("stockLabel")}
              </div>
              <h2 className="font-display text-3xl">{t("recentArrivals")}</h2>
            </div>
            <Link href="/vehicles" className="text-sm font-semibold hover:text-stamp">
              {t("seeUsedVehicles")}
            </Link>
          </div>

          {featured.length === 0 ? (
            <div className="border border-dashed border-ink/20 p-12 text-center text-steel">
              {t("noVehicles")}
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
                {t("step1Title")}
              </div>
              <p className="text-sm text-ink/80">{t("step1Text")}</p>
            </div>
            <div>
              <div className="font-mono text-brass text-xs uppercase tracking-widest mb-2">
                {t("step2Title")}
              </div>
              <p className="text-sm text-ink/80">{t("step2Text")}</p>
            </div>
            <div>
              <div className="font-mono text-brass text-xs uppercase tracking-widest mb-2">
                {t("step3Title")}
              </div>
              <p className="text-sm text-ink/80">{t("step3Text")}</p>
            </div>
          </div>
        </section>

        <RecentlyViewedSection />
        <DeliveredRecentlySection />
      </main>
      <Footer />
    </>
  );
}
