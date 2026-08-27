import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/authz";
import { vehicleSchema } from "@/lib/validation";

// GET /api/vehicles/[id] - a logged-out or non-staff caller may only ever
// retrieve a PUBLISHED or SOLD vehicle here. DRAFT/RESERVED vehicles are
// only visible to authenticated ADMIN/EDITOR staff.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authResult = await requireStaff();

  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: { images: { orderBy: { position: "asc" } } },
  });

  if (!vehicle) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (!authResult.ok && vehicle.status !== "PUBLISHED" && vehicle.status !== "SOLD") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(vehicle);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireStaff();
  if (!authResult.ok) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const { id } = await params;
  const body = await req.json();
  const parsed = vehicleSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  // Replace images if a new set is provided
  if (data.images) {
    await prisma.vehicleImage.deleteMany({ where: { vehicleId: id } });
  }

  const vehicle = await prisma.vehicle.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.make !== undefined && { make: data.make }),
      ...(data.model !== undefined && { model: data.model }),
      ...(data.trim !== undefined && { trim: data.trim }),
      ...(data.year !== undefined && { year: data.year }),
      ...(data.priceDZD !== undefined && { priceDZD: data.priceDZD }),
      ...(data.mileageKm !== undefined && { mileageKm: data.mileageKm }),
      ...(data.fuelType !== undefined && { fuelType: data.fuelType }),
      ...(data.transmission !== undefined && { transmission: data.transmission }),
      ...(data.color !== undefined && { color: data.color }),
      ...(data.engineSize !== undefined && { engineSize: data.engineSize }),
      ...(data.origin !== undefined && { origin: data.origin }),
      ...(data.vin !== undefined && { vin: data.vin }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.featured !== undefined && { featured: data.featured }),
      ...(data.onPromo !== undefined && { onPromo: data.onPromo }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.features !== undefined && { features: data.features }),
      ...(data.arrivalDate !== undefined && {
        arrivalDate: data.arrivalDate ? new Date(data.arrivalDate) : null,
      }),
      ...(data.images && {
        images: { create: data.images.map((url, i) => ({ url, position: i })) },
      }),
    },
    include: { images: { orderBy: { position: "asc" } } },
  });

  return NextResponse.json(vehicle);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireStaff();
  if (!authResult.ok) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const { id } = await params;
  await prisma.vehicle.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
