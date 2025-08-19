import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { tag } = await req.json();
  if (typeof tag !== "string" || !tag) return NextResponse.json({ ok: false }, { status: 400 });
  revalidateTag(tag);
  return NextResponse.json({ ok: true });
}


