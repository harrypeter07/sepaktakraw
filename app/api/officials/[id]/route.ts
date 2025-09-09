import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  // Optionally enforce cookie
  const id = Number(params.id);
  await prisma.official.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}


