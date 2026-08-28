import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#1E4FD6]">
      <div className="mx-auto max-w-7xl px-5 sm:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <Image
            src="/logo.png"
            alt={siteConfig.name}
            width={200}
            height={66}
            className="h-12 w-auto"
            priority
          />
          <span className="hidden sm:inline text-xs font-mono uppercase tracking-widest text-white/70">
            🇰🇷 Corée du Sud → 🇩🇿 Algérie
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-white">
          <Link href="/vehicles" className="hover:text-white/70 transition-colors">
            Véhicules 
          </Link>
          <Link href="/import-process" className="hidden sm:inline hover:text-white/70 transition-colors">
            Processus d&apos;importation
          </Link>
          <Link
            href="/contact"
            className="rounded-sm bg-white text-[#1E4FD6] px-4 py-2 hover:bg-white/90 transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
