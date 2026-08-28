// hooks/use-track-vehicle-view.ts
"use client";

import { useEffect } from "react";
import { recordVehicleView, VehicleSnapshot } from "@/lib/vehicles/recently-viewed";

/**
 * Call this once on a vehicle detail page to record it in "recently viewed".
 *
 * Example (in your vehicle detail page component):
 *
 *   useTrackVehicleView({
 *     id: vehicle.id,
 *     slug: vehicle.slug,
 *     name: vehicle.name,
 *     price: vehicle.price,
 *     imageUrl: vehicle.images[0],
 *   });
 */
export function useTrackVehicleView(vehicle: VehicleSnapshot | null | undefined) {
  useEffect(() => {
    if (!vehicle) return;
    recordVehicleView(vehicle);
    // Only re-run if the vehicle actually changes (id changes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicle?.id]);
}
