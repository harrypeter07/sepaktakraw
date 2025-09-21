import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const candidate = await prisma.candidate.findUnique({
      where: { id },
      include: { 
        district: true,
        election: true,
        votes: true
      }
    });

    if (!candidate) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    return NextResponse.json(candidate);
  } catch (error) {
    console.error("Candidate fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch candidate" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = req.cookies.get("user-session");
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = Number(params.id);
    const body = await req.json();
    const candidate = await prisma.candidate.update({
      where: { id },
      data: body
    });

    return NextResponse.json(candidate);
  } catch (error) {
    console.error("Candidate update error:", error);
    return NextResponse.json(
      { error: "Failed to update candidate" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    await prisma.candidate.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Candidate delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete candidate" },
      { status: 500 }
    );
  }
}
