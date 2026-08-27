import { notFound } from "next/navigation";
import { AdminNav } from "@/components/AdminNav";
import { VehicleForm } from "@/components/VehicleForm";
import { prisma } from "@/lib/prisma";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: { images: { orderBy: { position: "asc" } } },
  });

  if (!vehicle) notFound();

  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
        <h1 className="font-display text-3xl mb-8">Modifier le véhicule</h1>
        <VehicleForm
          initial={{
            id: vehicle.id,
            title: vehicle.title,
            make: vehicle.make,
            model: vehicle.model,
            trim: vehicle.trim ?? "",
            year: vehicle.year,
            priceDZD: vehicle.priceDZD,
            mileageKm: vehicle.mileageKm,
            fuelType: vehicle.fuelType,
            transmission: vehicle.transmission,
            color: vehicle.color ?? "",
            engineSize: vehicle.engineSize ?? "",
            origin: vehicle.origin,
            vin: vehicle.vin ?? "",
            status: vehicle.status,
            featured: vehicle.featured,
            onPromo: vehicle.onPromo,
            description: vehicle.description ?? "",
            features: vehicle.features.join("\n"),
            images: vehicle.images.map((i) => i.url),
          }}
        />
      </main>
    </>
  );
}
