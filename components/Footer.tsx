
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-ink text-paper">
   <div>
  <div className="font-mono uppercase tracking-widest text-xs text-brass mb-2">
    Contact
  </div>
  <p className="text-paper/70">{siteConfig.phoneDisplay}</p>
  <p className="text-paper/70">{siteConfig.email}</p>
  <p className="text-paper/70">{siteConfig.address}</p>
  <div className="mt-3 flex flex-wrap gap-2">
    <a
      href={`https://wa.me/${siteConfig.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-full bg-brass px-4 py-2 text-xs font-mono uppercase tracking-widest text-ink hover:opacity-90"
    >
      WhatsApp (DZ)
    </a>
    <a
      href={`https://wa.me/${siteConfig.whatsappNumberKR}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-full bg-brass px-4 py-2 text-xs font-mono uppercase tracking-widest text-ink hover:opacity-90"
    >
      WhatsApp (KR)
    </a>
  </div>
</div>

      <div className="border-t border-paper/10 py-4 text-center text-xs text-paper/40">
        © {new Date().getFullYear()} {siteConfig.name}. All vehicles inspected prior to shipment.
      </div>
    </footer>
  );
}
