import Image from "next/image";
import Link from "next/link";

export function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden text-paper">
      <Image
        src="/showroom.jpg"
        alt="Showroom TK Motors"
        fill
        priority
        className="object-cover -z-10"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0B2E68]/92 via-[#123E82]/90 to-[#0B2E68]/95" />

      <div className="mx-auto max-w-4xl px-6 py-28 sm:py-36 flex flex-col items-center text-center">
        <h1 className="font-display text-4xl sm:text-6xl leading-tight mb-6">
          L&apos;export automobile{" "}
          <span className="text-[#5FA8FF]">Corée&nbsp;-&nbsp;Algérie</span>, fait
          simplement.
        </h1>
        <p className="text-paper/80 text-lg sm:text-xl mb-10 max-w-xl">
          Des centaines de véhicules déjà livrés à nos clients à travers l&apos;Algérie.
        </p>
        <Link
          href="/vehicles"
          className="bg-stamp hover:bg-stamp-dark transition-colors px-8 py-4 font-semibold text-lg"
        >
          Véhicules occasion
        </Link>
      </div>
    </section>
  );
}
