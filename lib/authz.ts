import { auth } from "@/lib/auth";

const STAFF_ROLES = ["ADMIN", "EDITOR"] as const;
type StaffRole = (typeof STAFF_ROLES)[number];

type AuthorizedSession = {
  user: {
    id: string;
    role: StaffRole;
    email?: string | null;
    name?: string | null;
  };
};

/**
 * Verifies the current request is authenticated as ADMIN or EDITOR.
 * Every mutating/admin API route must call this itself — middleware only
 * protects page navigation, not API calls, so this is the real enforcement
 * point and must not be skipped even if a route also sits under /admin.
 */
export async function requireStaff(): Promise<
  { ok: true; session: AuthorizedSession } | { ok: false; status: number; error: string }
> {
  const session = await auth();
  const role = session?.user?.role;

  if (!session?.user || !role) {
    return { ok: false, status: 401, error: "Unauthorized" };
  }

  if (!STAFF_ROLES.includes(role as StaffRole)) {
    return { ok: false, status: 403, error: "Forbidden" };
  }

  return { ok: true, session: session as AuthorizedSession };
}

/**
 * Verifies the current request is authenticated as ADMIN specifically.
 */
export async function requireAdmin(): Promise<
  { ok: true; session: AuthorizedSession } | { ok: false; status: number; error: string }
> {
  const session = await auth();
  const role = session?.user?.role;

  if (!session?.user || !role) {
    return { ok: false, status: 401, error: "Unauthorized" };
  }

  if (role !== "ADMIN") {
    return { ok: false, status: 403, error: "Forbidden" };
  }

  return { ok: true, session: session as AuthorizedSession };
}
