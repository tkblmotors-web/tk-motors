import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notre processus d'importation - TK Motors",
  description:
    "TK Motors : exportation de véhicules neufs et d'occasion depuis la Corée du Sud vers l'Algérie. Découvrez notre processus d'importation clé en main.",
};

const whyItems = [
  {
    icon: "🚗",
    title: "Expertise du marché coréen",
    text: "Nous maîtrisons le marché automobile sud-coréen — enchères, concessionnaires et réseaux locaux à Busan — pour vous proposer les meilleurs véhicules aux meilleures conditions.",
  },
  {
    icon: "⏱️",
    title: "Gain de temps",
    text: "Nous nous occupons de toutes les démarches d'achat, d'inspection et d'expédition, simplifiant un processus qui peut être long et complexe pour qui n'y est pas familiarisé.",
  },
  {
    icon: "🤝",
    title: "Réseau de partenaires fiable",
    text: "TK Motors dispose d'un réseau de partenaires de confiance (transporteurs maritimes, transitaires, inspecteurs) pour garantir une coordination optimale à chaque étape.",
  },
  {
    icon: "💰",
    title: "Optimisation des coûts",
    text: "Nous sélectionnons soigneusement chaque véhicule pour offrir un excellent rapport qualité-prix, avec une transparence totale sur les frais liés à l'importation.",
  },
  {
    icon: "🛡️",
    title: "Simplicité et tranquillité d'esprit",
    text: "Suivez tout le processus en toute sérénité : nous vous accompagnons à chaque étape, sans avoir à gérer les détails administratifs complexes.",
  },
  {
    icon: "🎯",
    title: "Accompagnement personnalisé",
    text: "De la sélection du véhicule jusqu'à son arrivée en Algérie, TK Motors vous offre un suivi sur mesure et répond à toutes vos questions.",
  },
];

export default function ImportProcessPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0a2540] to-[#123a5e] px-5 py-20 text-center text-white sm:py-24">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold sm:text-4xl">
          Notre processus d&apos;importation
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-200">
          De la Corée du Sud à l&apos;Algérie : un accompagnement complet,
          transparent et sans stress, à chaque étape de votre projet
          automobile.
        </p>
      </section>

      <div className="mx-auto max-w-4xl px-5 py-16">
        {/* Intro */}
        <h2 className="mb-4 border-l-4 border-[#c9a227] pl-4 text-2xl font-bold text-[#0a2540]">
          Bienvenue chez TK Motors
        </h2>
        <div className="mb-12 space-y-4 rounded-xl bg-slate-50 p-8">
          <p className="text-neutral-600">
            TK Motors est une entreprise spécialisée dans l&apos;exportation
            de véhicules neufs et d&apos;occasion depuis la Corée du Sud
            (Busan) vers l&apos;Algérie. Nous simplifions chaque étape du
            processus, avec un service clé en main qui englobe tout : de la
            sélection du véhicule au transport maritime, en passant par les
            formalités administratives et douanières.
          </p>
          <p className="text-neutral-600">
            <strong className="text-[#0a2540]">Notre mission</strong> est de
            rendre l&apos;importation de véhicules simple et sans tracas.
            Nous prenons en charge toutes les démarches nécessaires —
            sélection, achat, inspection, documentation et expédition — pour
            vous offrir un accompagnement de A à Z, sans stress et sans
            mauvaise surprise.
          </p>
          <p className="text-neutral-600">
            <strong className="text-[#0a2540]">Nos valeurs</strong> : nous
            plaçons la confiance et la satisfaction de nos client(e)s au
            cœur de notre approche. TK Motors s&apos;engage à offrir un
            service transparent et fiable, adapté aux besoins spécifiques de
            chaque client. Grâce à notre expertise du marché coréen et de la
            logistique internationale, nous garantissons une importation
            fluide et sécurisée jusqu&apos;en Algérie.
          </p>
        </div>

        {/* Why choose us */}
        <h2 className="mb-4 border-l-4 border-[#c9a227] pl-4 text-2xl font-bold text-[#0a2540]">
          Pourquoi choisir TK Motors ?
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
          <h2 className="mb-3 text-2xl font-bold">
            Vous souhaitez en savoir plus ?
          </h2>
          <p className="mb-6 text-slate-200">
            Nous sommes là pour répondre à toutes vos questions et vous
            guider dans chaque étape de votre projet auto.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-[#c9a227] px-8 py-3 font-semibold text-[#0a2540] transition hover:opacity-85"
          >
            Contactez-nous
          </Link>
        </div>
      </div>
    </main>
  );
}
