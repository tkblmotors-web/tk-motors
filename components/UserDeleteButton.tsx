"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function UserDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!confirm("Remove this admin user? They will lose access immediately.")) return;
    setBusy(true);
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={busy}
      className="text-xs font-semibold px-2 py-1 border border-stamp text-stamp hover:bg-stamp hover:text-paper transition-colors disabled:opacity-50"
    >
      Remove
    </button>
  );
}
