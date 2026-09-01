"use client";
import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/");
  const currentLocale = segments[1] === "ar" ? "ar" : "fr";
  const otherLocale = currentLocale === "fr" ? "ar" : "fr";

  const switchLocale = () => {
    segments[1] = otherLocale;
    router.push(segments.join("/"));
  };

  return (
    <button
      onClick={switchLocale}
      className="text-sm font-semibold border border-current px-3 py-1 rounded-full hover:bg-black/5"
    >
      {otherLocale === "ar" ? "العربية" : "Français"}
    </button>
  );
}
