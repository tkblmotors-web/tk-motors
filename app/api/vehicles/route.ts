import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/authz";
import { vehicleSchema } from "@/lib/validation";
import { slugify, withUniqueSuffix } from "@/lib/slug";

// GET /api/vehicles - public + admin listing with filters
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const authResult = await requireStaff();
  const isStaff = authResult.ok;

  const make = searchParams.get("make") ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const featured = searchParams.get("featured");
  const q = searchParams.get("q") ?? undefined;
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const where: Record<string, unknown> = {};

  // Only authenticated ADMIN/EDITOR staff can ever see DRAFT/RESERVED
  // vehicles through this endpoint. Every other caller — including a
  // logged-out visitor or anyone forging query params — is hard-locked
  // to PUBLISHED/SOLD, regardless of what they pass in `status`.
  if (!isStaff) {
    where.status = { in: ["PUBLISHED", "SOLD"] };
  } else if (status) {
    where.status = status;
  }

  if (make) where.make = { equals: make, mode: "insensitive" };
  if (featured === "true") where.featured = true;
  if (minPrice || maxPrice) {
    where.priceDZD = {
      ...(minPrice ? { gte: Number(minPrice) } : {}),
      ...(maxPrice ? { lte: Number(maxPrice) } : {}),
    };
  }
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { make: { contains: q, mode: "insensitive" } },
      { model: { contains: q, mode: "insensitive" } },
    ];
  }

  const vehicles = await prisma.vehicle.findMany({
    where,
    include: { images: { orderBy: { position: "asc" } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(vehicles);
}

// POST /api/vehicles - create a new vehicle (ADMIN or EDITOR only)
export async function POST(req: NextRequest) {
  const authResult = await requireStaff();
  if (!authResult.ok) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const body = await req.json();
  const parsed = vehicleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const baseSlug = slugify(`${data.year}-${data.make}-${data.model}-${data.trim ?? ""}`);

  let slug = baseSlug;
  const existing = await prisma.vehicle.findUnique({ where: { slug } });
  if (existing) slug = withUniqueSuffix(baseSlug);

  const vehicle = await prisma.vehicle.create({
    data: {
      slug,
      title: data.title,
      make: data.make,
      model: data.model,
      trim: data.trim ?? null,
      year: data.year,
      priceDZD: data.priceDZD,
      mileageKm: data.mileageKm,
      fuelType: data.fuelType,
      transmission: data.transmission,
      color: data.color ?? null,
      engineSize: data.engineSize ?? null,
      origin: data.origin,
      vin: data.vin ?? null,
      status: data.status,
      featured: data.featured,
      onPromo: data.onPromo,
      description: data.description ?? null,
      features: data.features,
      arrivalDate: data.arrivalDate ? new Date(data.arrivalDate) : null,
      images: {
        create: data.images.map((url, i) => ({ url, position: i })),
      },
    },
    include: { images: true },
  });

  return NextResponse.json(vehicle, { status: 201 });
}
