import Link from "next/link";
import { AdminNav } from "@/components/AdminNav";
import { VehicleRowActions } from "@/components/VehicleRowActions";
import { prisma } from "@/lib/prisma";
import { formatDZD, formatKm } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const vehicles = await prisma.vehicle.findMany({
    include: { images: { take: 1, orderBy: { position: "asc" } } },
    orderBy: { createdAt: "desc" },
  });

  const counts = {
    total: vehicles.length,
    published: vehicles.filter((v) => v.status === "PUBLISHED").length,
    draft: vehicles.filter((v) => v.status === "DRAFT").length,
    sold: vehicles.filter((v) => v.status === "SOLD").length,
  };

  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl mb-1">Vehicles</h1>
            <p className="text-sm text-steel">
              {counts.total} total · {counts.published} published · {counts.draft} draft ·{" "}
              {counts.sold} sold
            </p>
          </div>
          <Link
            href="/admin/dashboard/vehicles/new"
            className="bg-ink text-paper px-5 py-2.5 font-semibold hover:bg-stamp transition-colors"
          >
            + Add vehicle
          </Link>
        </div>

        {vehicles.length === 0 ? (
          <div className="border border-dashed border-ink/20 p-16 text-center text-steel">
            No vehicles yet. Add your first vehicle to get it on the site.
          </div>
        ) : (
          <div className="border border-ink/10 divide-y divide-ink/10">
            {vehicles.map((v) => (
              <div
                key={v.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4"
              >
                <div className="w-20 h-16 bg-paper-dim shrink-0 overflow-hidden">
                  {v.images[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={v.images[0].url}
                      alt={v.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{v.title}</div>
                  <div className="text-xs text-steel font-mono">
                    {formatDZD(v.priceDZD)} · {formatKm(v.mileageKm)}
                  </div>
                </div>
                <VehicleRowActions id={v.id} status={v.status} />
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
