import Link from "next/link";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/SignOutButton";

export async function AdminNav() {
  const session = await auth();

  return (
    <header className="border-b border-ink/10 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/admin/dashboard" className="font-display text-lg">
            TK Motors <span className="text-brass text-sm font-mono">/ admin</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-5 text-sm">
            <Link href="/admin/dashboard" className="hover:text-brass transition-colors">
              Vehicles
            </Link>
            <Link
              href="/admin/dashboard/vehicles/new"
              className="hover:text-brass transition-colors"
            >
              Add vehicle
            </Link>
            {session?.user?.role === "ADMIN" && (
              <Link
                href="/admin/dashboard/users"
                className="hover:text-brass transition-colors"
              >
                Admin users
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-paper/60 hidden sm:inline">
            {session?.user?.email} · {session?.user?.role}
          </span>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
