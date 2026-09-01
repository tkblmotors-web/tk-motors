import Link from "next/link";
import Image from "next/image";
import { StampBadge, PromoBadge } from "@/components/StampBadge";
import { formatDZD, formatKm } from "@/lib/format";
import { siteConfig } from "@/lib/config";

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
  onPromo?: boolean;
  images: { url: string }[];
};

export function VehicleCard({ vehicle }: { vehicle: VehicleCardData }) {
  const cover = vehicle.images[0]?.url;

  const whatsappMessage = encodeURIComponent(
    `Bonjour, je suis intéressé(e) par le véhicule : ${vehicle.title} (${formatDZD(vehicle.priceDZD)})`
  );
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="group border border-ink/10 bg-white/60 hover:border-stamp/40 transition-colors">
      <Link href={`/vehicles/${vehicle.slug}`} className="block">
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
              Aucune photo pour le moment
            </div>
          )}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
            <StampBadge status={vehicle.status} />
            {vehicle.onPromo && <PromoBadge />}
          </div>
        </div>
        <div className="p-4 pb-2">
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

      <div className="px-4 pb-4">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.35a9.87 9.87 0 0 0 4.62 1.15h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.77 14.02c-.24.68-1.39 1.3-1.92 1.36-.49.06-1.11.09-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.12-4.85-4.31-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.38.26-.28.57-.35.76-.35h.55c.18 0 .42-.03.65.5.24.55.8 1.9.87 2.04.07.14.11.3.02.49-.09.19-.13.3-.26.46-.13.16-.28.36-.4.48-.13.13-.27.28-.11.55.16.28.7 1.16 1.51 1.88 1.04.93 1.92 1.22 2.19 1.36.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.28.36-.23.6-.14.24.09 1.55.73 1.81.86.27.14.45.2.51.32.07.12.07.68-.17 1.36Z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  );
}
