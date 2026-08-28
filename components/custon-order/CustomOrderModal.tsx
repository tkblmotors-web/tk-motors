// components/custom-order/CustomOrderModal.tsx
"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { buildWhatsAppUrl } from "@/lib/promo-popup/whatsapp";

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomOrderModal({ isOpen, onClose }: CustomOrderModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [model, setModel] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  // Focus trap + restore + Escape + body scroll lock, same pattern as PromoPopup
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    firstFieldRef.current?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !model.trim()) return;

    const lines = [
      "Bonjour TK MOTORS, je souhaite commander un véhicule sur mesure.",
      `Modèle recherché : ${model}`,
      budget.trim() ? `Budget : ${budget}` : null,
      `Nom : ${name}`,
      `Téléphone : ${phone}`,
      message.trim() ? `Message : ${message}` : null,
    ].filter(Boolean);

    window.open(
      buildWhatsAppUrl(lines.join("\n")),
      "_blank",
      "noopener,noreferrer"
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        data-testid="custom-order-backdrop"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="custom-order-title"
        className="relative w-full sm:max-w-md sm:mx-4 max-h-[90vh] overflow-y-auto bg-paper rounded-t-[22px] sm:rounded-[16px] p-6 sm:p-7 border border-ink/10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la fenêtre"
          className="absolute top-4 right-4 h-9 w-9 flex items-center justify-center rounded-full text-steel hover:text-ink hover:bg-ink/5 transition-colors"
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

        <h2
          id="custom-order-title"
          className="font-semibold text-xl text-ink mb-1"
        >
          Commande sur mesure
        </h2>
        <p className="text-sm text-steel mb-5">
          Vous cherchez un modèle précis ? Dites-nous ce qu&apos;il vous faut,
          nous vous répondons sur WhatsApp.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="co-name" className="block text-sm font-medium text-ink mb-1">
              Nom *
            </label>
            <input
              ref={firstFieldRef}
              id="co-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-ink/20"
            />
          </div>

          <div>
            <label htmlFor="co-phone" className="block text-sm font-medium text-ink mb-1">
              Téléphone *
            </label>
            <input
              id="co-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-ink/20"
            />
          </div>

          <div>
            <label htmlFor="co-model" className="block text-sm font-medium text-ink mb-1">
              Modèle recherché *
            </label>
            <input
              id="co-model"
              type="text"
              required
              placeholder="ex. Hyundai Tucson 2023"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-ink/20"
            />
          </div>

          <div>
            <label htmlFor="co-budget" className="block text-sm font-medium text-ink mb-1">
              Budget (optionnel)
            </label>
            <input
              id="co-budget"
              type="text"
              placeholder="ex. 3 500 000 DZD"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-ink/20"
            />
          </div>

          <div>
            <label htmlFor="co-message" className="block text-sm font-medium text-ink mb-1">
              Message (optionnel)
            </label>
            <textarea
              id="co-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-ink/20"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-sm bg-ink text-paper font-medium hover:bg-stamp transition-colors"
          >
            Envoyer sur WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
