// components/promo-popup/PromoPopup.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { PromoPopupConfig } from "@/lib/promo-popup/config";
import { buildWhatsAppUrl, trackPopupEvent } from "@/lib/promo-popup/whatsapp";

interface PromoPopupProps {
  config: PromoPopupConfig;
  isOpen: boolean;
  onClose: (reason: "dismiss" | "cta") => void;
}

export function PromoPopup({ config, isOpen, onClose }: PromoPopupProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect prefers-reduced-motion once on mount
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Fire popup_view once when it opens
  useEffect(() => {
    if (isOpen) {
      trackPopupEvent("popup_view", { title: config.title });
    }
  }, [isOpen, config.title]);

  // Focus trap + focus restore + Escape to close + lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose("dismiss");
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDismiss = () => {
    trackPopupEvent("popup_close", { title: config.title });
    onClose("dismiss");
  };

  const handleCta = () => {
    trackPopupEvent("popup_cta_click", { title: config.title });
    trackPopupEvent("popup_whatsapp_click", { title: config.title });
    onClose("cta");
    window.open(buildWhatsAppUrl(config.whatsappMessage), "_blank", "noopener,noreferrer");
  };

  const handleBackdropClick = () => {
    // Closing on outside click is desktop behavior per spec; harmless on
    // mobile since the sheet fills most of the tap area anyway.
    handleDismiss();
  };

  const transitionClass = reducedMotion
    ? ""
    : "transition-all duration-300 ease-out";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      aria-hidden={false}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 ${transitionClass}`}
        onClick={handleBackdropClick}
        data-testid="promo-popup-backdrop"
      />

      {/* Panel: bottom sheet on mobile, centered card on sm+ */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-popup-title"
        aria-describedby="promo-popup-description"
        className={`
          relative w-full sm:max-w-md sm:mx-4
          max-h-[50vh] sm:max-h-[85vh]
          overflow-y-auto
          bg-[#15181C] border border-[#292D32]
          rounded-t-[22px] sm:rounded-[16px]
          p-6 sm:p-7
          ${transitionClass}
          ${
            reducedMotion
              ? "opacity-100"
              : "animate-[promoPopupSlideUp_280ms_ease-out] sm:animate-[promoPopupFadeScale_280ms_ease-out]"
          }
        `}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={handleDismiss}
          aria-label="Fermer la fenêtre"
          className="absolute top-4 right-4 h-9 w-9 flex items-center justify-center rounded-full text-[#9CA3AF] hover:text-[#F5F5F5] hover:bg-white/5 transition-colors"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <span
          className="inline-block text-xs font-semibold tracking-wide uppercase text-[#D6A84F] mb-3"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {config.badge}
        </span>

        <h2
          id="promo-popup-title"
          className="text-[#F5F5F5] font-semibold text-xl sm:text-2xl leading-snug whitespace-pre-line mb-3"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          {config.title}
        </h2>

        <p
          id="promo-popup-description"
          className="text-[#9CA3AF] text-sm sm:text-base leading-relaxed mb-6"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {config.description}
        </p>

        <button
          type="button"
          onClick={handleCta}
          className="w-full h-12 sm:h-13 rounded-full bg-[#D6A84F] hover:bg-[#E5BD67] text-[#0B0D0F] font-bold text-sm sm:text-base tracking-wide uppercase transition-colors"
        >
          {config.ctaLabel}
        </button>

        <button
          type="button"
          onClick={handleDismiss}
          className="w-full text-center mt-3 text-sm text-[#9CA3AF] hover:text-[#F5F5F5] transition-colors"
        >
          {config.dismissLabel}
        </button>
      </div>

      {/* Keyframes for entrance animation. Move into your global CSS file if preferred. */}
      <style jsx global>{`
        @keyframes promoPopupSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes promoPopupFadeScale {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
