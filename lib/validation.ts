import { z } from "zod";

export const vehicleSchema = z.object({
  title: z.string().min(3, "Title is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  trim: z.string().optional().nullable(),
  year: z.coerce.number().int().min(1990).max(new Date().getFullYear() + 1),
  priceDZD: z.coerce.number().int().min(0),
  mileageKm: z.coerce.number().int().min(0),
  fuelType: z.enum(["PETROL", "DIESEL", "HYBRID", "ELECTRIC"]),
  transmission: z.enum(["AUTOMATIC", "MANUAL"]),
  color: z.string().optional().nullable(),
  engineSize: z.string().optional().nullable(),
  origin: z.string().default("South Korea"),
  vin: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "SOLD", "RESERVED"]).default("DRAFT"),
  featured: z.coerce.boolean().default(false),
  onPromo: z.coerce.boolean().default(false),
  description: z.string().optional().nullable(),
  features: z.array(z.string()).default([]),
  arrivalDate: z.string().optional().nullable(),
  images: z.array(z.string().url()).default([]),
});

export type VehicleInput = z.infer<typeof vehicleSchema>;
