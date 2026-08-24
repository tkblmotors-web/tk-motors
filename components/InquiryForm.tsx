"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";
import { whatsappLink } from "@/lib/format";

export function InquiryForm({
  vehicleId,
  vehicleTitle,
}: {
  vehicleId?: string;
  vehicleTitle?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    vehicleTitle ? `I'm interested in the ${vehicleTitle}.` : ""
  );
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicleId, name, phone, message }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div id="contact" className="border border-ink/10 bg-white/60 p-6">
      <h3 className="font-display text-xl mb-1">Ask about this vehicle</h3>
      <p className="text-sm text-steel mb-4">
        Leave your details and we&apos;ll reply, or message us directly on WhatsApp.
      </p>

      {status === "sent" ? (
        <p className="text-sm text-brass font-medium">
          Thanks — we&apos;ve received your message and will get back to you shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-ink/15 px-3 py-2 text-sm bg-white"
          />
          <input
            required
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-ink/15 px-3 py-2 text-sm bg-white"
          />
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-ink/15 px-3 py-2 text-sm bg-white"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-ink text-paper py-2 font-semibold hover:bg-stamp transition-colors disabled:opacity-50"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          {status === "error" && (
            <p className="text-xs text-stamp">
              Something went wrong — please try WhatsApp instead.
            </p>
          )}
        </form>
      )}

      <a
        href={whatsappLink(
          siteConfig.whatsappNumber,
          vehicleTitle ? `Hi, I'm interested in the ${vehicleTitle}.` : "Hi, I have a question."
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block text-center border border-brass text-brass py-2 font-semibold hover:bg-brass hover:text-paper transition-colors"
      >
        Message on WhatsApp
      </a>
    </div>
  );
}
