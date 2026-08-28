// components/custom-order/CustomOrderButton.tsx
"use client";

import { useState } from "react";
import { CustomOrderModal } from "./CustomOrderModal";

interface CustomOrderButtonProps {
  className?: string;
  label?: string;
}

export function CustomOrderButton({
  className,
  label = "Commande sur mesure",
}: CustomOrderButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={
          className ??
          "rounded-sm bg-ink text-paper px-5 py-3 text-sm font-medium hover:bg-stamp transition-colors"
        }
      >
        {label}
      </button>
      <CustomOrderModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
