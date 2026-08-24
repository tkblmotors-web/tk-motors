import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/config";

const STEPS = [
  {
    title: "Auction sourcing",
    body: "We select vehicles from South Korean auction houses using their official grade and inspection reports, matched to what buyers in Algeria are asking for.",
  },
  {
    title: "Pre-shipment inspection",
    body: "Every vehicle is inspected again before loading — mechanical condition, mileage verification, and photo documentation of any existing wear.",
  },
  {
    title: "Export documentation",
    body: `Export paperwork, de-registration, and shipping documents are prepared and filed for the ${siteConfig.originPort} departure.`,
  },
  {
    title: "Ocean freight",
    body: "Vehicles travel by container or RoRo shipping to Algeria, tracked from departure to arrival.",
  },
  {
    title: "Customs clearance",
    body: `We manage customs clearance at the ${siteConfig.destinationPort} and handle the required import duties and registration paperwork.`,
  },
  {
    title: "Delivery & handover",
    body: "Collect your vehicle from our showroom with a full document set and a final pre-delivery inspection.",
  },
];

export default function ImportProcessPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-ink text-paper py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="font-mono text-xs uppercase tracking-widest text-brass mb-2">
              How it works
            </div>
            <h1 className="font-display text-4xl max-w-2xl">
              From a Korean auction lot to your driveway in Algeria.
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 sm:px-8 py-16">
          <ol className="space-y-10">
            {STEPS.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4">
                <div className="font-display text-3xl text-brass">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h2 className="font-display text-xl mb-1">{step.title}</h2>
                  <p className="text-ink/75 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </>
  );
}
