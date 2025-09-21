import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const election = await prisma.election.findUnique({
      where: { id },
      include: {
        documents: true,
        candidates: {
          include: { district: true }
        },
        votes: true,
        _count: {
          select: {
            candidates: true,
            votes: true
          }
        }
      }
    });

    if (!election) {
      return NextResponse.json({ error: "Election not found" }, { status: 404 });
    }

    return NextResponse.json(election);
  } catch (error) {
    console.error("Election fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch election" },
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
    const election = await prisma.election.update({
      where: { id },
      data: body
    });

    return NextResponse.json(election);
  } catch (error) {
    console.error("Election update error:", error);
    return NextResponse.json(
      { error: "Failed to update election" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    await prisma.election.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Election delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete election" },
      { status: 500 }
    );
  }
}
