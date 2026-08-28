// components/home/DeliveredRecentlySection.tsx
import Image from "next/image";
import { DELIVERED_VEHICLES } from "@/lib/delivered-vehicles";

export function DeliveredRecentlySection() {
  // If you haven't added any entries to DELIVERED_VEHICLES yet, hide the
  // section rather than showing an empty block.
  if (DELIVERED_VEHICLES.length === 0) return null;

  return (
    <section className="bg-ink text-paper py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <h2 className="font-semibold text-lg sm:text-xl mb-1">
          Livré récemment
        </h2>
        <p className="text-sm text-paper/60 mb-6">
          Des véhicules importés et remis à nos clients à travers l&apos;Algérie.
        </p>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {DELIVERED_VEHICLES.map((item) => (
            <div
              key={item.id}
              className="shrink-0 w-56 sm:w-64 rounded-sm overflow-hidden bg-paper/5 border border-paper/10"
            >
              <div className="relative h-36 sm:h-40">
                <Image
                  src={item.imageUrl}
                  alt={item.vehicleName}
                  fill
                  className="object-cover"
                  sizes="256px"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium">{item.vehicleName}</p>
                <p className="text-xs text-paper/60 mt-0.5">
                  {item.clientCity} · {item.deliveredMonth}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
