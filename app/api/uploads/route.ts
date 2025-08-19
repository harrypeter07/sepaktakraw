import { NextRequest, NextResponse } from "next/server";

const ALLOWED = ["application/pdf", "image/jpeg", "image/png"];

export async function POST(req: NextRequest) {
  const { mime, path } = await req.json();
  if (!ALLOWED.includes(mime)) {
    return NextResponse.json({ error: "Invalid MIME type" }, { status: 400 });
  }
  // Placeholder: return signed URL from Supabase Storage
  return NextResponse.json({ url: `/uploads/${encodeURIComponent(path)}` });
}


