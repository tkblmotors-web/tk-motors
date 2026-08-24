import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/authz";
import { z } from "zod";

const inquirySchema = z.object({
  vehicleId: z.string().optional().nullable(),
  name: z.string().min(2),
  phone: z.string().min(6),
  message: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const inquiry = await prisma.inquiry.create({ data: parsed.data });
  return NextResponse.json(inquiry, { status: 201 });
}

export async function GET() {
  const authResult = await requireStaff();
  if (!authResult.ok) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  return NextResponse.json(inquiries);
}
