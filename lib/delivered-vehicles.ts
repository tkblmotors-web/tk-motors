export type DeliveredVehicle = {
  id: string;
  vehicleName: string;
  imageUrl: string;
  clientCity: string;
  deliveredMonth: string;
};

export const DELIVERED_VEHICLES: DeliveredVehicle[] = [
  {
    id: "1",
    vehicleName: "Kia picanto 2023",
    imageUrl: "/delivered/FullSizeRender.jpeg",
    clientCity: "biskra",
    deliveredMonth: "juillet 2026",
  },
];

