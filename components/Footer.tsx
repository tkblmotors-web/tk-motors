import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <div className="font-display text-lg mb-2">{siteConfig.name}</div>
          <p className="text-paper/60">{siteConfig.tagline}</p>
        </div>
        <div>
          <div className="font-mono uppercase tracking-widest text-xs text-brass mb-2">
            Manifest
          </div>
          <p className="text-paper/70">Origin: {siteConfig.originPort}</p>
          <p className="text-paper/70">Destination: {siteConfig.destinationPort}</p>
        </div>
        <div>
          <div className="font-mono uppercase tracking-widest text-xs text-brass mb-2">
            Contact
          </div>
          <p className="text-paper/70">{siteConfig.phoneDisplay}</p>
          <p className="text-paper/70">{siteConfig.email}</p>
          <p className="text-paper/70">{siteConfig.city}</p>
        </div>
      </div>
      <div className="border-t border-paper/10 py-4 text-center text-xs text-paper/40">
        © {new Date().getFullYear()} {siteConfig.name}. All vehicles inspected prior to shipment.
      </div>
    </footer>
  );
}
