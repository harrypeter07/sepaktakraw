import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.result.findMany({ include: { district: true }, orderBy: { date: "desc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const created = await prisma.result.create({ data: body });
  return NextResponse.json(created, { status: 201 });
}


