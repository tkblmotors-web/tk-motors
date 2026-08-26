// Rotating alert/news ticker — shown as a thin strip above the navbar.
// Edit the messages array below to update what's displayed.
// Each entry is one message; they're joined with a separator and scroll continuously.
const messages: string[] = [
  "🚨 info nouvelle adresse Nouvelle ville UV 10 en face de l`hopital melitaire",
  "Nouveautés disponibles ce mois-ci — renseignez-vous sur les disponibilités",
  "📞 WhatsApp us +82 10-2510-7410 / 0558 50 93 65",
];

export function AlertTicker() {
  if (messages.length === 0) return null;

  const loop = [...messages, ...messages];

  return (
    <div className="bg-stamp text-paper overflow-hidden">
      <div className="relative flex whitespace-nowrap py-2 text-xs sm:text-sm font-mono uppercase tracking-wide">
        <div className="animate-ticker flex shrink-0 gap-12 pr-12">
          {loop.map((msg, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>{msg}</span>
              <span className="text-paper/40">&bull;</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
