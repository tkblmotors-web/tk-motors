// lib/promo-popup/whatsapp.ts
//
// Reuses the same siteConfig.whatsappNumber that WhatsAppFloatButton.tsx
// already uses, so there is only one source of truth for the number.

import { siteConfig } from "@/lib/config";

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}

// --- Lightweight analytics shim -------------------------------------------
// Wires into whatever is already on the page (GA4 gtag, GTM dataLayer, or
// Plausible). If none of these exist, it just logs in dev and no-ops in prod.
// Replace this with a direct call into your existing analytics util if you
// have one (e.g. lib/analytics.ts).

type PopupEvent =
  | "popup_view"
  | "popup_close"
  | "popup_cta_click"
  | "popup_whatsapp_click";

export function trackPopupEvent(
  event: PopupEvent,
  meta: Record<string, string | undefined> = {}
) {
  if (typeof window === "undefined") return;

  const w = window as any;

  if (typeof w.gtag === "function") {
    w.gtag("event", event, meta);
    return;
  }
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event, ...meta });
    return;
  }
  if (typeof w.plausible === "function") {
    w.plausible(event, { props: meta });
    return;
  }
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[promo-popup]", event, meta);
  }
}
