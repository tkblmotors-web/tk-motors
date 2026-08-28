// lib/promo-popup/config.ts
//
// All editable popup copy/behavior lives in this file.
// To change the offer text, delay, or cooldown later, edit DEFAULT_POPUP_CONFIG
// below — no need to touch the component code.

export interface PromoPopupConfig {
  /** Master switch. Set to false to disable the popup site-wide. */
  active: boolean;
  /** Small eyebrow label, e.g. "🇰🇷 OFFRE DU JOUR" */
  badge: string;
  /** Main headline (use \n for a manual line break) */
  title: string;
  /** Supporting paragraph under the headline */
  description: string;
  /** Primary button label */
  ctaLabel: string;
  /** Secondary / dismiss link label */
  dismissLabel: string;
  /** WhatsApp message template. Use {vehicle} as a placeholder on vehicle pages. */
  whatsappMessage: string;
  /** Milliseconds to wait before showing (time-based trigger) */
  delayMs: number;
  /** % of page height scrolled that also triggers the popup on mobile (0-100) */
  scrollTriggerPercent: number;
  /** Hours before the popup is eligible to show again after being dismissed */
  cooldownHours: number;
}

export const DEFAULT_POPUP_CONFIG: PromoPopupConfig = {
  active: true,
  badge: "🇰🇷 OFFRE DU JOUR",
  title: "Commandez aujourd'hui\net profitez d'un avantage exclusif.",
  description:
    "Vous avez trouvé votre prochaine voiture ? Contactez TK MOTORS aujourd'hui et découvrez notre offre actuelle sur les véhicules importés de Corée.",
  ctaLabel: "PROFITER DE L'OFFRE",
  dismissLabel: "Plus tard",
  whatsappMessage:
    "Bonjour TK MOTORS, je suis intéressé par l'offre du jour. Pouvez-vous me donner plus d'informations ?",
  delayMs: 7000,
  scrollTriggerPercent: 60,
  cooldownHours: 24,
};

/**
 * Builds a vehicle-page variant of the popup config from a vehicle name.
 * Call this on vehicle detail pages instead of using DEFAULT_POPUP_CONFIG.
 *
 * Example: buildVehiclePopupConfig("KIA SELTOS GRAVITY 2025")
 */
export function buildVehiclePopupConfig(
  vehicleName: string,
  overrides: Partial<PromoPopupConfig> = {}
): PromoPopupConfig {
  return {
    ...DEFAULT_POPUP_CONFIG,
    badge: "🇰🇷 VOUS AVEZ TROUVÉ VOTRE VOITURE ?",
    title: vehicleName,
    description:
      "Contactez-nous aujourd'hui pour vérifier sa disponibilité et recevoir les détails.",
    ctaLabel: "JE SUIS INTÉRESSÉ",
    whatsappMessage: `Bonjour TK MOTORS, je suis intéressé par la ${vehicleName}. Pouvez-vous me donner plus d'informations ?`,
    ...overrides,
  };
}
