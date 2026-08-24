export function formatDZD(value: number): string {
  return new Intl.NumberFormat("fr-DZ", {
    maximumFractionDigits: 0,
  }).format(value) + " DA";
}

export function formatKm(value: number): string {
  return new Intl.NumberFormat("fr-DZ", { maximumFractionDigits: 0 }).format(value) + " km";
}

export function whatsappLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
