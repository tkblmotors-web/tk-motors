import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { AlertTicker } from "@/components/AlertTicker";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <AlertTicker />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <Image
            src="/logo.png"
            alt={siteConfig.name}
            width={160}
            height={53}
            className="h-9 w-auto"
            priority
          />
          <span className="hidden sm:inline text-xs font-mono uppercase tracking-widest text-steel">
            Corée du Sud → Algérie
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/vehicles" className="hover:text-stamp transition-colors">
            Inventaire
          </Link>
          <Link href="/import-process" className="hidden sm:inline hover:text-stamp transition-colors">
            Processus d&apos;importation
          </Link>
          <Link
            href="/vehicles#contact"
            className="rounded-sm bg-ink text-paper px-4 py-2 hover:bg-stamp transition-colors"
          >
            Contact
          </Link>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm bg-brass text-ink px-4 py-2 hover:opacity-90 transition-colors"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
