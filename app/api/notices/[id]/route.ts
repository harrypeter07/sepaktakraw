import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const item = await prisma.notice.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = req.cookies.get("user-session");
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number(params.id);
  const body = await req.json();
  const updated = await prisma.notice.update({ where: { id }, data: body });
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  // Note: middleware already requires cookie for /admin, but enforce for API as well if needed
  const id = Number(params.id);
  await prisma.notice.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}


