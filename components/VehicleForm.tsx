"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type VehicleFormValues = {
  id?: string;
  title: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  priceDZD: number;
  mileageKm: number;
  fuelType: string;
  transmission: string;
  color: string;
  engineSize: string;
  origin: string;
  vin: string;
  status: string;
  featured: boolean;
  onPromo: boolean;
  description: string;
  features: string;
  images: string[];
};

const DEFAULTS: VehicleFormValues = {
  title: "",
  make: "",
  model: "",
  trim: "",
  year: new Date().getFullYear(),
  priceDZD: 0,
  mileageKm: 0,
  fuelType: "PETROL",
  transmission: "AUTOMATIC",
  color: "",
  engineSize: "",
  origin: "Corée du Sud",
  vin: "",
  status: "DRAFT",
  featured: false,
  onPromo: false,
  description: "",
  features: "",
  images: [],
};

export function VehicleForm({
  initial,
}: {
  initial?: Partial<VehicleFormValues>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<VehicleFormValues>({
    ...DEFAULTS,
    ...initial,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof VehicleFormValues>(key: K, value: VehicleFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");

    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Échec du téléversement");
        uploaded.push(data.url);
      }
      set("images", [...values.images, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec du téléversement");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function removeImage(url: string) {
    set(
      "images",
      values.images.filter((i) => i !== url)
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...values,
      features: values.features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch(
        initial?.id ? `/api/vehicles/${initial.id}` : "/api/vehicles",
        {
          method: initial?.id ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ? JSON.stringify(data.error) : "Échec de l'enregistrement");
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de l'enregistrement");
      setSaving(false);
    }
  }

  const inputClass = "w-full border border-ink/15 px-3 py-2 text-sm bg-white";
  const labelClass = "text-xs font-mono uppercase tracking-widest text-steel block mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      <section className="space-y-4">
        <h2 className="font-display text-xl">Informations de base</h2>
        <div>
          <label className={labelClass}>Titre de l&apos;annonce</label>
          <input
            required
            value={values.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="ex. Hyundai Tucson Hybrid 2022"
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Marque</label>
            <input
              required
              value={values.make}
              onChange={(e) => set("make", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Modèle</label>
            <input
              required
              value={values.model}
              onChange={(e) => set("model", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Finition (optionnel)</label>
            <input
              value={values.trim}
              onChange={(e) => set("trim", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Année</label>
            <input
              required
              type="text"
              inputMode="numeric"
              value={values.year}
              onChange={(e) =>
                set("year", Number(e.target.value.replace(/[^\d]/g, "")) || 0)
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Prix (DZD)</label>
            <input
              required
              type="text"
              inputMode="numeric"
              value={values.priceDZD}
              onChange={(e) =>
                set("priceDZD", Number(e.target.value.replace(/[^\d]/g, "")) || 0)
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Kilométrage (km)</label>
            <input
              required
              type="text"
              inputMode="numeric"
              value={values.mileageKm}
              onChange={(e) =>
                set("mileageKm", Number(e.target.value.replace(/[^\d]/g, "")) || 0)
              }
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl">Caractéristiques</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Carburant</label>
            <select
              value={values.fuelType}
              onChange={(e) => set("fuelType", e.target.value)}
              className={inputClass}
            >
              <option value="PETROL">Essence</option>
              <option value="DIESEL">Diesel</option>
              <option value="HYBRID">Hybride</option>
              <option value="ELECTRIC">Électrique</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Transmission</label>
            <select
              value={values.transmission}
              onChange={(e) => set("transmission", e.target.value)}
              className={inputClass}
            >
              <option value="AUTOMATIC">Automatique</option>
              <option value="MANUAL">Manuelle</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Couleur</label>
            <input
              value={values.color}
              onChange={(e) => set("color", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Cylindrée</label>
            <input
              value={values.engineSize}
              onChange={(e) => set("engineSize", e.target.value)}
              placeholder="ex. 1.6L"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Origine</label>
            <input
              value={values.origin}
              onChange={(e) => set("origin", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>VIN (optionnel)</label>
            <input
              value={values.vin}
              onChange={(e) => set("vin", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl">Description & équipements</h2>
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            rows={4}
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Équipements (un par ligne)</label>
          <textarea
            rows={4}
            value={values.features}
            onChange={(e) => set("features", e.target.value)}
            placeholder={"Sièges chauffants\nCaméra de recul\nJantes alliage"}
            className={inputClass}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl">Photos</h2>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          disabled={uploading}
          className="text-sm"
        />
        {uploading && <p className="text-xs text-steel">Téléversement…</p>}
        {values.images.length > 0 && (
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {values.images.map((url) => (
              <div key={url} className="relative aspect-square bg-paper-dim group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute top-1 right-1 bg-stamp text-paper text-xs w-5 h-5 flex items-center justify-center rounded-full"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl">Publication</h2>
        <div className="flex items-center gap-6">
          <div>
            <label className={labelClass}>Statut</label>
            <select
              value={values.status}
              onChange={(e) => set("status", e.target.value)}
              className={inputClass}
            >
              <option value="DRAFT">Brouillon (masqué)</option>
              <option value="PUBLISHED">Publié (visible sur le site)</option>
              <option value="RESERVED">Réservé</option>
              <option value="SOLD">Vendu</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm mt-5">
            <input
              type="checkbox"
              checked={values.featured}
              onChange={(e) => set("featured", e.target.checked)}
            />
            Mettre en avant sur la page d&apos;accueil
          </label>
          <label className="flex items-center gap-2 text-sm mt-5">
            <input
              type="checkbox"
              checked={values.onPromo}
              onChange={(e) => set("onPromo", e.target.checked)}
            />
            En promo
          </label>
        </div>
      </section>

      {error && <p className="text-sm text-stamp">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="bg-ink text-paper px-6 py-2.5 font-semibold hover:bg-stamp transition-colors"
        >
          {saving ? "Enregistrement…" : initial?.id ? "Enregistrer les modifications" : "Créer le véhicule"}
        </button>
      </div>
    </form>
  );
}
