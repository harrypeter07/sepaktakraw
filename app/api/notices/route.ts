import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const notices = await prisma.notice.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(notices);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const created = await prisma.notice.create({ data: body });
  return NextResponse.json(created, { status: 201 });
}


