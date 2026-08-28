import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
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
          <span className="hidden sm:inline text-xs font-mono uppercase tracking-widest text-steel">
            Corée du Sud → Algérie
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/vehicles" className="hover:text-stamp transition-colors">
            Véhicules occasion
          </Link>
          <Link href="/import-process" className="hidden sm:inline hover:text-stamp transition-colors">
            Processus d&apos;importation
          </Link>
          <Link
            href="/contact"
            className="rounded-sm bg-ink text-paper px-4 py-2 hover:bg-stamp transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
