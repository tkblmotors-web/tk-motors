import Link from "next/link";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/config";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export async function Navbar() {
  const locale = await getLocale();
  const t = await getTranslations("Nav");

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#1E4FD6]">
      <div className="mx-auto max-w-7xl px-5 sm:px-10 h-20 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-baseline gap-2">
          <Image
            src="/logo.png"
            alt={siteConfig.name}
            width={200}
            height={66}
            className="h-12 w-auto"
            priority
          />
          <span className="hidden sm:inline text-xs font-mono uppercase tracking-widest text-white/70">
            {t("tagline")}
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-white">
          <Link href={`/${locale}/vehicles`} className="hover:text-white/70 transition-colors">
            {t("vehicles")}
          </Link>
          <Link
            href={`/${locale}/import-process`}
            className="hidden sm:inline hover:text-white/70 transition-colors"
          >
            {t("importProcess")}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="rounded-sm bg-white text-[#1E4FD6] px-4 py-2 hover:bg-white/90 transition-colors"
          >
            {t("contact")}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}

