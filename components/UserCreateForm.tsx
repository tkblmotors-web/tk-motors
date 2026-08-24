"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function UserCreateForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EDITOR");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setError(data.error?.formErrors?.[0] || data.error || "Could not create user");
      return;
    }
    setName("");
    setEmail("");
    setPassword("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="border border-ink/10 bg-white/60 p-5 space-y-3 max-w-md">
      <h2 className="font-display text-lg mb-1">Add an admin user</h2>
      <input
        required
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-ink/15 px-3 py-2 text-sm bg-white"
      />
      <input
        required
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-ink/15 px-3 py-2 text-sm bg-white"
      />
      <input
        required
        type="password"
        placeholder="Password (min. 8 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-ink/15 px-3 py-2 text-sm bg-white"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full border border-ink/15 px-3 py-2 text-sm bg-white"
      >
        <option value="EDITOR">Editor — can manage vehicles</option>
        <option value="ADMIN">Admin — full access incl. user management</option>
      </select>
      {error && <p className="text-sm text-stamp">{error}</p>}
      <button
        type="submit"
        disabled={saving}
        className="w-full bg-ink text-paper py-2 font-semibold hover:bg-stamp transition-colors disabled:opacity-50"
      >
        {saving ? "Creating…" : "Create user"}
      </button>
    </form>
  );
}
