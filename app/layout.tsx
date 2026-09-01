import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { WhatsAppFloatButton } from "@/components/WhatsAppFloatButton";
import "./globals.css";
import { PromoPopupProvider } from "@/components/promo-popup/PromoPopupProvider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = JetBrains_Mono({
  variable: "--font-mono-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "TK MOTORS — Importation de véhicules coréens vers l'Algérie",
  description:
    "TK MOTORS importe des véhicules inspectés, de qualité enchère, depuis la Corée du Sud vers l'Algérie. Consultez l'inventaire actuel ou demandez un véhicule sur commande.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
        <WhatsAppFloatButton />
        <PromoPopupProvider />
      </body>
    </html>
  );
}
