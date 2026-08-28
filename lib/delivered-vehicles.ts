// lib/delivered-vehicles.ts
//
// Edit this array to add/remove "livré récemment" entries. Newest first.
// Each entry needs at least imageUrl, vehicleName, and city. Add photos to
// /public/delivered/ and reference them here.

export interface DeliveredVehicle {
  id: string;
  vehicleName: string; // e.g. "Kia Sportage 2023"
  imageUrl: string; // e.g. "/delivered/kia-sportage-constantine.jpg"
  clientCity: string; // e.g. "Constantine"
  deliveredMonth: string; // e.g. "Août 2026" — free text, kept simple
}

export const DELIVERED_VEHICLES: DeliveredVehicle[] = [
   
   {
   id: "1",
   vehicleName: "Kia picanto 2023",
     imageUrl: "/delivered/FullSizeRender.jpeg",
     clientCity: "biskra",
     deliveredMonth: "juillet 2026",
   },
];
