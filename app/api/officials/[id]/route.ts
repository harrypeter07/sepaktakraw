import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const official = await prisma.official.findUnique({
      where: { id },
      include: { district: true }
    });
    
    if (!official) {
      return NextResponse.json({ error: "Official not found" }, { status: 404 });
    }
    
    return NextResponse.json(official);
  } catch (error) {
    console.error("Official fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch official" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const body = await req.json();
    
    const updated = await prisma.official.update({
      where: { id },
      data: body,
      include: { district: true }
    });
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Official update error:", error);
    return NextResponse.json(
      { error: "Failed to update official" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    await prisma.official.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Official delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete official" },
      { status: 500 }
    );
  }
}


