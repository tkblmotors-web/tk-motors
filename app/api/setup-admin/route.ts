import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  if (key !== process.env.SETUP_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = process.env.SEED_ADMIN_EMAIL!;
  const password = process.env.SEED_ADMIN_PASSWORD!;
  const name = process.env.SEED_ADMIN_NAME || "TK Motors Admin";

  const passwordHash = await bcrypt.hash(password, 12);

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    await prisma.user.update({
      where: { email },
      data: { passwordHash, role: "ADMIN" },
    });
    return NextResponse.json({ message: `Password reset for: ${email}` });
  }

  await prisma.user.create({
    data: { name, email, passwordHash, role: "ADMIN" },
  });

  return NextResponse.json({ message: `Created admin: ${email}` });
}
