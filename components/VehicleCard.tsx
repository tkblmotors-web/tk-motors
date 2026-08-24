import Link from "next/link";
import Image from "next/image";
import { StampBadge } from "@/components/StampBadge";
import { formatDZD, formatKm } from "@/lib/format";

type VehicleCardData = {
  id: string;
  slug: string;
  title: string;
  year: number;
  priceDZD: number;
  mileageKm: number;
  fuelType: string;
  transmission: string;
  status: string;
  images: { url: string }[];
};

export function VehicleCard({ vehicle }: { vehicle: VehicleCardData }) {
  const cover = vehicle.images[0]?.url;

  return (
    <Link
      href={`/vehicles/${vehicle.slug}`}
      className="group block border border-ink/10 bg-white/60 hover:border-stamp/40 transition-colors"
    >
      <div className="relative aspect-[4/3] bg-paper-dim overflow-hidden">
        {cover ? (
          <Image
            src={cover}
            alt={vehicle.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-steel-soft font-mono text-xs">
            No photo yet
          </div>
        )}
        <div className="absolute top-3 right-3">
          <StampBadge status={vehicle.status} />
        </div>
      </div>
      <div className="p-4">
        <div className="text-xs font-mono uppercase tracking-widest text-steel mb-1">
          {vehicle.year} · {vehicle.fuelType} · {vehicle.transmission}
        </div>
        <h3 className="font-display text-lg leading-snug mb-2">{vehicle.title}</h3>
        <div className="flex items-baseline justify-between">
          <span className="font-mono font-semibold text-lg text-stamp">
            {formatDZD(vehicle.priceDZD)}
          </span>
          <span className="text-xs text-steel">{formatKm(vehicle.mileageKm)}</span>
        </div>
      </div>
    </Link>
  );
}
