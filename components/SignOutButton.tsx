"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="border border-paper/30 px-3 py-1.5 hover:bg-paper hover:text-ink transition-colors text-xs font-semibold"
    >
      Sign out
    </button>
  );
}
