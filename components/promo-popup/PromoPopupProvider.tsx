// components/promo-popup/PromoPopupProvider.tsx
"use client";

import { DEFAULT_POPUP_CONFIG, PromoPopupConfig } from "@/lib/promo-popup/config";
import { usePromoPopupTrigger } from "@/hooks/use-promo-popup-trigger";
import { PromoPopup } from "./PromoPopup";

interface PromoPopupProviderProps {
  /**
   * Optional override, e.g. built with buildVehiclePopupConfig(vehicleName)
   * on a vehicle detail page. Falls back to the site-wide default offer.
   */
  config?: PromoPopupConfig;
}

export function PromoPopupProvider({
  config = DEFAULT_POPUP_CONFIG,
}: PromoPopupProviderProps) {
  const { isOpen, close } = usePromoPopupTrigger({
    active: config.active,
    delayMs: config.delayMs,
    scrollTriggerPercent: config.scrollTriggerPercent,
    cooldownHours: config.cooldownHours,
  });

  if (!config.active) return null;

  return <PromoPopup config={config} isOpen={isOpen} onClose={close} />;
}
