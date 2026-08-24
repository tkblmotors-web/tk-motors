import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StampBadge } from "@/components/StampBadge";
import { InquiryForm } from "@/components/InquiryForm";
import { prisma } from "@/lib/prisma";
import { formatDZD, formatKm } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await prisma.vehicle.findUnique({
    where: { slug },
    include: { images: { orderBy: { position: "asc" } } },
  });

  // Public visitors may only view PUBLISHED vehicles. DRAFT, RESERVED, and
  // SOLD vehicles never render on the public site, even via a direct link.
  if (!vehicle || vehicle.status !== "PUBLISHED") notFound();

  const specs: [string, string][] = [
    ["Make", vehicle.make],
    ["Model", vehicle.model],
    ["Trim", vehicle.trim ?? "—"],
    ["Year", String(vehicle.year)],
    ["Mileage", formatKm(vehicle.mileageKm)],
    ["Fuel", vehicle.fuelType],
    ["Transmission", vehicle.transmission],
    ["Color", vehicle.color ?? "—"],
    ["Engine", vehicle.engineSize ?? "—"],
    ["Origin", vehicle.origin],
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
          <div className="mb-6">
            <StampBadge status={vehicle.status} />
          </div>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10">
            <div>
              <div className="relative aspect-[4/3] bg-paper-dim mb-3 overflow-hidden">
                {vehicle.images[0] ? (
                  <Image
                    src={vehicle.images[0].url}
                    alt={vehicle.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-steel-soft font-mono text-xs">
                    No photo yet
                  </div>
                )}
              </div>
              {vehicle.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {vehicle.images.slice(1).map((img) => (
                    <div
                      key={img.id}
                      className="relative aspect-square bg-paper-dim overflow-hidden"
                    >
                      <Image
                        src={img.url}
                        alt={vehicle.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              <h1 className="font-display text-3xl sm:text-4xl mt-8 mb-2">
                {vehicle.title}
              </h1>
              <div className="font-mono text-2xl text-stamp font-semibold mb-6">
                {formatDZD(vehicle.priceDZD)}
              </div>

              {vehicle.description && (
                <p className="text-ink/80 leading-relaxed mb-8 whitespace-pre-line">
                  {vehicle.description}
                </p>
              )}

              <div className="border border-ink/10">
                <div className="bg-ink text-paper font-mono text-xs uppercase tracking-widest px-4 py-2">
                  Vehicle dossier
                </div>
                <dl className="grid grid-cols-2 divide-x divide-y divide-ink/10">
                  {specs.map(([label, value]) => (
                    <div key={label} className="px-4 py-3">
                      <dt className="text-xs font-mono uppercase tracking-widest text-steel">
                        {label}
                      </dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {vehicle.features.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-display text-xl mb-3">Equipment & features</h2>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    {vehicle.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="text-brass">—</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <InquiryForm vehicleId={vehicle.id} vehicleTitle={vehicle.title} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
