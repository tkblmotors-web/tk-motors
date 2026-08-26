
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-paper text-ink">
   <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
  <div className="font-mono uppercase tracking-widest text-xs text-brass mb-2">
    Contact
  </div>
  <p className="text-ink/70">{siteConfig.phoneDisplay}</p>
  <p className="text-ink/70">{siteConfig.email}</p>
  <p className="text-ink/70">{siteConfig.address}</p>
  <div className="mt-3 flex flex-wrap gap-2">
    <a
      href={`https://wa.me/${siteConfig.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-full bg-[#25D366] px-4 py-2 text-xs font-mono uppercase tracking-widest text-white hover:opacity-90"
    >
      WhatsApp (DZ)
    </a>
    <a
      href={`https://wa.me/${siteConfig.whatsappNumberKR}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-full bg-[#25D366] px-4 py-2 text-xs font-mono uppercase tracking-widest text-white hover:opacity-90"
    >
      WhatsApp (KR)
    </a>
  </div>
</div>

      <div className="border-t border-ink/10 py-4 text-center text-xs text-ink/40">
        © {new Date().getFullYear()} {siteConfig.name}. Tous les véhicules sont inspectés avant expédition.
      </div>
    </footer>
  );
}
