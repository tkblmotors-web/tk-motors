import { redirect } from "next/navigation";
import { AdminNav } from "@/components/AdminNav";
import { UserCreateForm } from "@/components/UserCreateForm";
import { UserDeleteButton } from "@/components/UserDeleteButton";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/admin/dashboard");

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
        <h1 className="font-display text-3xl mb-8">Admin users</h1>

        <div className="grid lg:grid-cols-[1fr_auto] gap-10">
          <div className="border border-ink/10 divide-y divide-ink/10 h-fit">
            {users.map((u) => (
              <div key={u.id} className="flex items-center justify-between p-4">
                <div>
                  <div className="font-semibold">{u.name}</div>
                  <div className="text-xs text-steel font-mono">
                    {u.email} · {u.role}
                  </div>
                </div>
                {u.id !== session.user.id && <UserDeleteButton id={u.id} />}
              </div>
            ))}
          </div>

          <UserCreateForm />
        </div>
      </main>
    </>
  );
}
