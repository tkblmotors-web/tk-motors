const STYLES: Record<string, string> = {
  PUBLISHED: "text-brass",
  DRAFT: "text-steel",
  RESERVED: "text-stamp",
  SOLD: "text-ink-soft",
};

const LABELS: Record<string, string> = {
  PUBLISHED: "New Arrival",
  DRAFT: "Draft",
  RESERVED: "Reserved",
  SOLD: "Sold",
};

export function StampBadge({ status }: { status: string }) {
  return (
    <span
      className={`stamp-badge inline-block px-3 py-1 text-xs font-semibold bg-paper/90 ${
        STYLES[status] ?? "text-steel"
      }`}
    >
      {LABELS[status] ?? status}
    </span>
  );
}
