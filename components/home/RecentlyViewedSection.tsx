// components/home/RecentlyViewedSection.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { readRecentlyViewed, VehicleSnapshot } from "@/lib/vehicles/recently-viewed";

export function RecentlyViewedSection() {
  const [vehicles, setVehicles] = useState<VehicleSnapshot[] | null>(null);

  useEffect(() => {
    // Read after mount only — localStorage isn't available during SSR,
    // and reading it here avoids a server/client markup mismatch.
    setVehicles(readRecentlyViewed());
  }, []);

  // Nothing recorded yet (or first load before hydration) — render nothing,
  // don't show a loading skeleton for a non-critical section like this.
  if (!vehicles || vehicles.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-10 py-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-lg sm:text-xl text-ink">
          Récemment consultés
        </h2>
        <Link
          href="/vehicles"
          className="text-sm text-stamp hover:underline"
        >
          Voir tout l&apos;inventaire
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0">
        {vehicles.map((vehicle) => (
          <Link
            key={vehicle.id}
            href={`/vehicles/${vehicle.slug}`}
            className="group shrink-0 w-48 sm:w-56 rounded-sm border border-ink/10 overflow-hidden hover:border-ink/30 transition-colors"
          >
            <div className="relative h-32 sm:h-36 bg-paper">
              <Image
                src={vehicle.imageUrl}
                alt={vehicle.name}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform"
                sizes="224px"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-ink line-clamp-1">
                {vehicle.name}
              </p>
              {vehicle.price != null && (
                <p className="text-xs text-steel mt-0.5">
                  {vehicle.price.toLocaleString("fr-FR")} DZD
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
