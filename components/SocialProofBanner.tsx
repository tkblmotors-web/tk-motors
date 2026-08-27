import Image from "next/image";
import Link from "next/link";

// Chiffres mis à jour manuellement — modifiez-les ici quand ils changent.
const SOCIAL_STATS = [
  {
    name: "Instagram",
    handle: "@tk_motors_kr",
    href: "https://www.instagram.com/tk_motors_kr?igsi=aDV0NzJvaHh6aHRs",
    value: "2K",
    sub: "abonnés",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.2" stroke="white" strokeWidth="1.8" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="white" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    handle: "TK Motors",
    href: "https://www.facebook.com/share/1ExMVPukM1/?mibextid=wwXIfr",
    value: "17K",
    sub: "abonnés",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="h-7 w-7">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@tk_motors",
    href: "https://www.tiktok.com/@tk_motors?_r=1&_t=ZS-99EaWFdlHiH",
    value: "39K",
    sub: "abonnés · 629K j'aime",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="h-7 w-7">
        <path d="M16.6 5.82c-.9-.6-1.55-1.55-1.75-2.65h-3.05v13.2c0 1.5-1.22 2.72-2.72 2.72a2.72 2.72 0 0 1 0-5.44c.27 0 .53.04.78.11V10.6a5.8 5.8 0 0 0-.78-.05 5.77 5.77 0 1 0 5.77 5.77V9.4a8.2 8.2 0 0 0 4.75 1.5V7.85c-1.07 0-2.06-.36-2.85-.98-.06-.05-.09-.02-.15-.05Z" />
      </svg>
    ),
  },
];

export default function SocialProofBanner() {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl">
      {/* Photo du showroom en fond */}
      <Image
        src="/showroom.jpg"
        alt="Showroom TK Motors"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Voile bleu clair pour la lisibilité (au lieu du bleu marine du site) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E6FD9]/85 via-[#2C7EE8]/80 to-[#1E6FD9]/90" />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 py-14 text-center sm:px-10 sm:py-16">
        <Image
          src="/tk-motors-logo.png"
          alt="TK Motors"
          width={140}
          height={140}
          className="drop-shadow-lg"
        />

        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Suivez TK Motors sur les réseaux
          </h2>
          <p className="mt-2 text-sm text-white/80 sm:text-base">
            Nos dernières arrivées, exports et avis clients, en direct de Corée du Sud.
          </p>
        </div>

        <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {SOCIAL_STATS.map((s) => (
            <Link
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-6 backdrop-blur-sm transition hover:bg-white/20"
            >
              {s.icon}
              <span className="text-2xl font-extrabold text-white">{s.value}</span>
              <span className="text-xs uppercase tracking-wide text-white/70">{s.sub}</span>
              <span className="mt-1 text-sm font-medium text-white/90 group-hover:underline">
                {s.handle}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
