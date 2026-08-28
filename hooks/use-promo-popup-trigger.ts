// hooks/use-promo-popup-trigger.ts
"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "tkm_promo_popup_state_v1";
const SESSION_KEY = "tkm_promo_popup_shown_this_session_v1";

interface StoredState {
  lastDismissedAt?: number; // epoch ms
  lastCtaClickedAt?: number;
}

function readStoredState(): StoredState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredState) : {};
  } catch {
    return {};
  }
}

function writeStoredState(state: StoredState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable (private mode etc.) — fail silently, popup
    // will just be eligible to show again next load, which is an acceptable
    // fallback rather than crashing the page.
  }
}

function isWithinCooldown(state: StoredState, cooldownHours: number): boolean {
  const last = state.lastDismissedAt ?? state.lastCtaClickedAt;
  if (!last) return false;
  const elapsedHours = (Date.now() - last) / (1000 * 60 * 60);
  return elapsedHours < cooldownHours;
}

function alreadyShownThisSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markShownThisSession() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // ignore
  }
}

export interface UsePromoPopupTriggerOptions {
  active: boolean;
  delayMs: number;
  scrollTriggerPercent: number;
  cooldownHours: number;
  /** Enable desktop mouse-exit-intent trigger. Ignored on touch devices. */
  enableExitIntent?: boolean;
}

export function usePromoPopupTrigger({
  active,
  delayMs,
  scrollTriggerPercent,
  cooldownHours,
  enableExitIntent = true,
}: UsePromoPopupTriggerOptions) {
  const [isOpen, setIsOpen] = useState(false);
  const hasFiredRef = useRef(false);

  useEffect(() => {
    if (!active) return;
    if (typeof window === "undefined") return;

    const state = readStoredState();
    if (alreadyShownThisSession()) return;
    if (isWithinCooldown(state, cooldownHours)) return;

    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const fireOnce = () => {
      if (hasFiredRef.current) return;
      hasFiredRef.current = true;
      setIsOpen(true);
      markShownThisSession();
    };

    // 1) Time-based trigger (works on all devices)
    const timer = window.setTimeout(fireOnce, delayMs);

    // 2) Scroll-depth trigger (primary mobile signal, also works on desktop)
    const handleScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const percent = total > 0 ? (scrolled / total) * 100 : 0;
      if (percent >= scrollTriggerPercent) {
        fireOnce();
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 3) Exit-intent trigger (desktop only, never on touch devices)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        fireOnce();
      }
    };
    if (enableExitIntent && !isTouchDevice) {
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      if (enableExitIntent && !isTouchDevice) {
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [active, delayMs, scrollTriggerPercent, cooldownHours, enableExitIntent]);

  const close = (reason: "dismiss" | "cta") => {
    setIsOpen(false);
    const state = readStoredState();
    if (reason === "dismiss") {
      writeStoredState({ ...state, lastDismissedAt: Date.now() });
    } else {
      writeStoredState({ ...state, lastCtaClickedAt: Date.now() });
    }
  };

  return { isOpen, close };
}
