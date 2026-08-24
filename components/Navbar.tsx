import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display font-semibold text-xl tracking-tight text-ink">
            {siteConfig.name}
          </span>
          <span className="hidden sm:inline text-xs font-mono uppercase tracking-widest text-steel">
            Busan → Algiers
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/vehicles" className="hover:text-stamp transition-colors">
            Inventory
          </Link>
          <Link href="/import-process" className="hidden sm:inline hover:text-stamp transition-colors">
            Import process
          </Link>
          <Link
            href="/vehicles#contact"
            className="rounded-sm bg-ink text-paper px-4 py-2 hover:bg-stamp transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
