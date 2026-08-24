import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/authz";
import bcrypt from "bcryptjs";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["ADMIN", "EDITOR"]),
});

// Admin-user management is ADMIN-only, enforced here server-side (not just
// hidden in the UI or gated by middleware) — an EDITOR token can never
// read or create accounts through this route.
export async function GET() {
  const authResult = await requireAdmin();
  if (!authResult.ok) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const authResult = await requireAdmin();
  if (!authResult.ok) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const body = await req.json();
  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { name, email, password, role } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, passwordHash, role },
    select: { id: true, name: true, email: true, role: true },
  });

  return NextResponse.json(user, { status: 201 });
}
