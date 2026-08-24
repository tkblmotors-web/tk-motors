"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-paper p-8 border border-paper/10"
      >
        <div className="font-mono text-xs uppercase tracking-widest text-stamp mb-2">
          TK Motors · Admin
        </div>
        <h1 className="font-display text-2xl mb-6">Sign in</h1>

        <label className="text-xs font-mono uppercase tracking-widest text-steel block mb-1">
          Email
        </label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-ink/15 px-3 py-2 text-sm bg-white mb-4"
        />

        <label className="text-xs font-mono uppercase tracking-widest text-steel block mb-1">
          Password
        </label>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-ink/15 px-3 py-2 text-sm bg-white mb-6"
        />

        {error && <p className="text-sm text-stamp mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink text-paper py-2.5 font-semibold hover:bg-stamp transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
