"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    objet: "",
    message: "",
  });

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setForm({ nom: "", prenom: "", email: "", telephone: "", objet: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full border border-ink/20 px-4 py-2.5 focus:outline-none focus:border-stamp bg-paper";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-ink mb-1">
            Nom <span className="text-stamp">*</span>
          </label>
          <input required value={form.nom} onChange={update("nom")} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink mb-1">Prénom</label>
          <input value={form.prenom} onChange={update("prenom")} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink mb-1">
          Adresse e-mail <span className="text-stamp">*</span>
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={update("email")}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink mb-1">
          Numéro de téléphone
        </label>
        <input
          type="tel"
          value={form.telephone}
          onChange={update("telephone")}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink mb-1">Objet</label>
        <input value={form.objet} onChange={update("objet")} className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink mb-1">
          Message <span className="text-stamp">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-stamp hover:bg-stamp-dark transition-colors px-6 py-3 font-semibold text-paper disabled:opacity-60"
      >
        {status === "sending" ? "Envoi en cours..." : "Envoyer le message"}
      </button>

      {status === "sent" && (
        <p className="text-sm text-green-700">Votre message a bien été envoyé, merci !</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-700">
          Une erreur est survenue. Contactez-nous directement par téléphone ou WhatsApp.
        </p>
      )}
    </form>
  );
}
