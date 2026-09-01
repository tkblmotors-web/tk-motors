import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Notre processus d'importation - TK Motors",
  description:
    "TK Motors : exportation de véhicules neufs et d'occasion depuis la Corée du Sud vers l'Algérie. Découvrez notre processus d'importation clé en main.",
};

export default async function ImportProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ImportProcess");

  const whyItems = [
    { icon: "🚗", title: t("why1Title"), text: t("why1Text") },
    { icon: "⏱️", title: t("why2Title"), text: t("why2Text") },
    { icon: "🤝", title: t("why3Title"), text: t("why3Text") },
    { icon: "💰", title: t("why4Title"), text: t("why4Text") },
    { icon: "🛡️", title: t("why5Title"), text: t("why5Text") },
    { icon: "🎯", title: t("why6Title"), text: t("why6Text") },
  ];

  return (
    <main className="bg-white text-neutral-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0a2540] to-[#123a5e] px-5 py-20 text-center text-white sm:py-24">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold sm:text-4xl">
          {t("heroTitle")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-200">
          {t("heroSubtitle")}
        </p>
      </section>

      <div className="mx-auto max-w-4xl px-5 py-16">
        {/* Intro */}
        <h2 className="mb-4 border-l-4 border-[#c9a227] pl-4 text-2xl font-bold text-[#0a2540]">
          {t("welcomeTitle")}
        </h2>
        <div className="mb-12 space-y-4 rounded-xl bg-slate-50 p-8">
          <p className="text-neutral-600">{t("intro1")}</p>
          <p className="text-neutral-600">
            <strong className="text-[#0a2540]">{t("missionLabel")}</strong>{" "}
            {t("intro2")}
          </p>
          <p className="text-neutral-600">
            <strong className="text-[#0a2540]">{t("valuesLabel")}</strong>
            {t("intro3")}
          </p>
        </div>

        {/* Why choose us */}
        <h2 className="mb-4 border-l-4 border-[#c9a227] pl-4 text-2xl font-bold text-[#0a2540]">
          {t("whyTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyItems.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="mb-2 block text-2xl">{item.icon}</span>
              <h3 className="mb-2 text-lg font-semibold text-[#0a2540]">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600">{item.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl bg-[#0a2540] px-6 py-12 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold">{t("ctaTitle")}</h2>
          <p className="mb-6 text-slate-200">{t("ctaText")}</p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block rounded-full bg-[#c9a227] px-8 py-3 font-semibold text-[#0a2540] transition hover:opacity-85"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </div>
    </main>
  );
}
