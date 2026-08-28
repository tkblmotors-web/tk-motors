import Image from "next/image";
import Link from "next/link";

const SERVICES = [
  {
    label: "Véhicules inspectés en Corée",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
        <path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" />
        <path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4Z" />
        <circle cx="7" cy="17.5" r="1.3" />
        <circle cx="17" cy="17.5" r="1.3" />
      </svg>
    ),
  },
  {
    label: "Transport maritime sécurisé",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
        <path d="M3 17c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0" />
        <path d="M5 14l1-6h12l1 6" />
        <path d="M12 8V4h3" />
      </svg>
    ),
  },
  {
    label: "Dédouanement pris en charge",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
        <rect x="5" y="3" width="14" height="18" rx="1.5" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </svg>
    ),
  },
  {
    label: "Suivi personnalisé et transparent",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
        <path d="M8 12l2.5 2.5L16 9" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    label: "Livraison partout en Algérie",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
        <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.3" />
      </svg>
    ),
  },
];

export function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0B2E68] text-paper">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2">
        {/* Colonne gauche : message */}
        <div className="relative z-10 px-6 sm:px-10 py-16 sm:py-20 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <Image src="/logo.png" alt="TK Motors" width={64} height={64} className="h-14 w-auto" />
            <div className="h-8 w-px bg-paper/25" />
            <span className="text-xs uppercase tracking-[0.2em] text-paper/60">
              Votre confiance, notre engagement
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl leading-tight mb-4">
            L&apos;export automobile{" "}
            <span className="text-[#5FA8FF]">Corée&nbsp;-&nbsp;Algérie</span>, fait
            simplement.
          </h1>
          <p className="text-paper/75 text-base sm:text-lg mb-10 max-w-md">
            Des centaines de véhicules déjà livrés à nos clients à travers l&apos;Algérie.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 max-w-lg">
            {SERVICES.map((s) => (
              <div key={s.label} className="flex flex-col items-start gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 text-[#5FA8FF]">
                  {s.icon}
                </span>
                <span className="text-xs text-paper/80 leading-snug">{s.label}</span>
              </div>
            ))}
          </div>

          <Link
            href="/vehicles"
            className="mt-10 inline-block w-fit bg-stamp hover:bg-stamp-dark transition-colors px-6 py-3 font-semibold"
          >
            Véhicules occasion
          </Link>
        </div>

        {/* Colonne droite : photo showroom */}
        <div className="relative min-h-[320px] lg:min-h-full">
          <Image
            src="/showroom.jpg"
            alt="Showroom TK Motors"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Fondu vers le panneau bleu à gauche */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2E68] via-[#0B2E68]/10 to-transparent lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E68]/70 via-transparent to-transparent lg:hidden" />

          {/* Petit repère trajet Corée → Algérie */}
          <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3 text-[11px] uppercase tracking-wide text-paper/80">
            <span>Corée du Sud</span>
            <span className="h-16 w-px border-l border-dashed border-paper/50" />
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#5FA8FF]">
              <path d="M3 17c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0M5 14l1-6h12l1 6M12 8V4h3" />
            </svg>
            <span className="h-16 w-px border-l border-dashed border-paper/50" />
            <span>Algérie</span>
          </div>
        </div>
      </div>
    </section>
  );
}
