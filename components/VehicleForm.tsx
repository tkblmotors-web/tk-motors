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
  origin: "South Korea",
  vin: "",
  status: "DRAFT",
  featured: false,
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
        if (!res.ok) throw new Error(data.error || "Upload failed");
        uploaded.push(data.url);
      }
      set("images", [...values.images, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
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
      if (!res.ok) throw new Error(data.error ? JSON.stringify(data.error) : "Save failed");
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  }

  const inputClass = "w-full border border-ink/15 px-3 py-2 text-sm bg-white";
  const labelClass = "text-xs font-mono uppercase tracking-widest text-steel block mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      <section className="space-y-4">
        <h2 className="font-display text-xl">Basics</h2>
        <div>
          <label className={labelClass}>Listing title</label>
          <input
            required
            value={values.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. 2022 Hyundai Tucson Hybrid"
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Make</label>
            <input
              required
              value={values.make}
              onChange={(e) => set("make", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Model</label>
            <input
              required
              value={values.model}
              onChange={(e) => set("model", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Trim (optional)</label>
            <input
              value={values.trim}
              onChange={(e) => set("trim", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Year</label>
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
            <label className={labelClass}>Price (DZD)</label>
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
            <label className={labelClass}>Mileage (km)</label>
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
        <h2 className="font-display text-xl">Specifications</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Fuel type</label>
            <select
              value={values.fuelType}
              onChange={(e) => set("fuelType", e.target.value)}
              className={inputClass}
            >
              <option value="PETROL">Petrol</option>
              <option value="DIESEL">Diesel</option>
              <option value="HYBRID">Hybrid</option>
              <option value="ELECTRIC">Electric</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Transmission</label>
            <select
              value={values.transmission}
              onChange={(e) => set("transmission", e.target.value)}
              className={inputClass}
            >
              <option value="AUTOMATIC">Automatic</option>
              <option value="MANUAL">Manual</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Color</label>
            <input
              value={values.color}
              onChange={(e) => set("color", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Engine size</label>
            <input
              value={values.engineSize}
              onChange={(e) => set("engineSize", e.target.value)}
              placeholder="e.g. 1.6L"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Origin</label>
            <input
              value={values.origin}
              onChange={(e) => set("origin", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>VIN (optional)</label>
            <input
              value={values.vin}
              onChange={(e) => set("vin", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl">Description & features</h2>
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
          <label className={labelClass}>Features (one per line)</label>
          <textarea
            rows={4}
            value={values.features}
            onChange={(e) => set("features", e.target.value)}
            placeholder={"Heated seats\nReversing camera\nAlloy wheels"}
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
        {uploading && <p className="text-xs text-steel">Uploading…</p>}
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
        <h2 className="font-display text-xl">Publishing</h2>
        <div className="flex items-center gap-6">
          <div>
            <label className={labelClass}>Status</label>
            <select
              value={values.status}
              onChange={(e) => set("status", e.target.value)}
              className={inputClass}
            >
              <option value="DRAFT">Draft (hidden)</option>
              <option value="PUBLISHED">Published (live on site)</option>
              <option value="RESERVED">Reserved</option>
              <option value="SOLD">Sold</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm mt-5">
            <input
              type="checkbox"
              checked={values.featured}
              onChange={(e) => set("featured", e.target.checked)}
            />
            Feature on homepage
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
          {saving ? "Saving…" : initial?.id ? "Save changes" : "Create vehicle"}
        </button>
      </div>
    </form>
  );
}
