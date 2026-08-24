import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { requireStaff } from "@/lib/authz";

// Only real, safely-rendered image formats are accepted. SVG is deliberately
// excluded — it can carry embedded scripts and isn't safe to serve back
// as-is.
const ALLOWED_MIME_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8MB

export async function POST(req: NextRequest) {
  const authResult = await requireStaff();
  if (!authResult.ok) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const extension = ALLOWED_MIME_TYPES[file.type];
  if (!extension) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WEBP, or GIF images are allowed" },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "Image must be under 8MB" }, { status: 400 });
  }

  if (file.size === 0) {
    return NextResponse.json({ error: "The uploaded file is empty" }, { status: 400 });
  }

  // Filename is fully generated server-side — the original filename is
  // never used, so there's no path-traversal or naming-collision surface
  // from user input.
  const filename = `vehicles/${randomUUID()}.${extension}`;

  const blob = await put(filename, file, {
    access: "public",
    contentType: file.type,
  });

  return NextResponse.json({ url: blob.url });
}
