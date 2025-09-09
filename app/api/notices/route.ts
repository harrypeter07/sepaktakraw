import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const notices = await prisma.notice.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(notices);
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get("user-session");
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const created = await prisma.notice.create({ data: body });
  return NextResponse.json(created, { status: 201 });
}


