"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const STATUS_OPTIONS = ["DRAFT", "PUBLISHED", "RESERVED", "SOLD"];

export function VehicleRowActions({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function updateStatus(newStatus: string) {
    setBusy(true);
    await fetch(`/api/vehicles/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setBusy(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Delete this vehicle permanently? This cannot be undone.")) return;
    setBusy(true);
    await fetch(`/api/vehicles/${id}`, { method: "DELETE" });
    setBusy(false);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        disabled={busy}
        onChange={(e) => updateStatus(e.target.value)}
        className="border border-ink/15 text-xs px-2 py-1 bg-white"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <Link
        href={`/admin/dashboard/vehicles/${id}/edit`}
        className="text-xs font-semibold px-2 py-1 border border-ink/15 hover:border-ink"
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        disabled={busy}
        className="text-xs font-semibold px-2 py-1 border border-stamp text-stamp hover:bg-stamp hover:text-paper transition-colors"
      >
        Delete
      </button>
    </div>
  );
}
