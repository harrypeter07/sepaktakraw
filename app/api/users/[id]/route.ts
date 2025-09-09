import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const id = String(params.id);
  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}


