// lib/vehicles/recently-viewed.ts
//
// Stores a small snapshot of each vehicle the visitor opens, so the
// homepage can show "Récemment consultés" without needing a backend or
// re-fetching the full vehicle list.
//
// Assumed vehicle shape — adjust field names here if yours differ:
export interface VehicleSnapshot {
  id: string;
  slug: string; // used to build the href, e.g. `/vehicles/${slug}`
  name: string; // e.g. "KIA SELTOS GRAVITY 2025"
  price?: number; // in DZD
  imageUrl: string;
}

const STORAGE_KEY = "tkm_recently_viewed_v1";
const MAX_ITEMS = 8;

export function recordVehicleView(vehicle: VehicleSnapshot) {
  if (typeof window === "undefined") return;
  try {
    const existing = readRecentlyViewed();
    const withoutThisOne = existing.filter((v) => v.id !== vehicle.id);
    const updated = [vehicle, ...withoutThisOne].slice(0, MAX_ITEMS);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage unavailable — fail silently, this is a nice-to-have feature
  }
}

export function readRecentlyViewed(): VehicleSnapshot[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as VehicleSnapshot[]) : [];
  } catch {
    return [];
  }
}
