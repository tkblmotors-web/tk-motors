import type React from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

const SOCIALS = [
  { name: "Facebook", href: "https://www.facebook.com/share/1ExMVPukM1/?mibextid=wwXIfr" },
  { name: "Instagram", href: "https://www.instagram.com/tk_motors_kr?igsi=aDV0NzJvaHh6aHRs" },
  { name: "TikTok", href: "https://www.tiktok.com/@tk_motors?_r=1&_t=ZS-99EaWFdlHiH" },
  { name: "WhatsApp", href: "https://wa.me/213558509365" },
  { name: "Email", href: "mailto:tkbl.motors@gmail.com" },
  { name: "Téléphone", href: "tel:+213558509365" },
];

const ICONS: Record<string, React.ReactNode> = {
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.15" fill="currentColor" />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M16.6 5.82c-.9-.6-1.55-1.55-1.75-2.65h-3.05v13.2c0 1.5-1.22 2.72-2.72 2.72a2.72 2.72 0 0 1 0-5.44c.27 0 .53.04.78.11V10.6a5.8 5.8 0 0 0-.78-.05 5.77 5.77 0 1 0 5.77 5.77V9.4a8.2 8.2 0 0 0 4.75 1.5V7.85c-1.07 0-2.06-.36-2.85-.98-.06-.05-.09-.02-.15-.05Z" />
    </svg>
  ),
  WhatsApp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.35a9.87 9.87 0 0 0 4.62 1.15h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.77 14.02c-.24.68-1.39 1.3-1.92 1.36-.49.06-1.11.09-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.12-4.85-4.31-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.38.26-.28.57-.35.76-.35h.55c.18 0 .42-.03.65.5.24.55.8 1.9.87 2.04.07.14.11.3.02.49-.09.19-.13.3-.26.46-.13.16-.28.36-.4.48-.13.13-.27.28-.11.55.16.28.7 1.16 1.51 1.88 1.04.93 1.92 1.22 2.19 1.36.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.28.36-.23.6-.14.24.09 1.55.73 1.81.86.27.14.45.2.51.32.07.12.07.68-.17 1.36Z" />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  Téléphone: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.6 21 3 12.4 3 2c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z" />
    </svg>
  ),
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
            <h1 className="font-display text-4xl sm:text-5xl mb-4">Contactez-nous !</h1>
            <p className="text-paper/70 max-w-2xl text-lg">
              Besoin de connaître les démarches, d&apos;obtenir des informations sur un
              véhicule, ou de faire une demande particulière ? Vous êtes au bon
              endroit — TK Motors, votre contact export de véhicules vers l&apos;Algérie.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16 grid gap-12 lg:grid-cols-2">
          {/* Colonne gauche : photo + coordonnées */}
          <div>
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0 rounded-full overflow-hidden border border-ink/10">
              <Image
                src="/contact-photo.jpg"
                alt="Showroom TK Motors"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>

            <div className="mt-8 flex gap-4 justify-center lg:justify-start">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink hover:bg-stamp hover:text-paper hover:border-stamp transition-colors"
                >
                  {ICONS[s.name]}
                </a>
              ))}
            </div>

            <div className="mt-8 space-y-3 text-center lg:text-left">
              <p className="font-semibold text-ink">
                📍 Nouvelle ville UV10, à côté de l&apos;hôpital militaire, Constantine
              </p>
              <p className="text-ink/80">
                📞 Algérie : <a href="tel:+213558509365" className="hover:text-stamp">0558 50 93 65</a>
              </p>
              <p className="text-ink/80">
                📞 Corée du Sud : <a href="tel:+821025107410" className="hover:text-stamp">+82 10-2510-7410</a>
              </p>
              <p className="text-ink/80">
                ✉️ <a href="mailto:tkbl.motors@gmail.com" className="hover:text-stamp">tkbl.motors@gmail.com</a>
              </p>
            </div>
          </div>

          {/* Colonne droite : formulaire */}
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
