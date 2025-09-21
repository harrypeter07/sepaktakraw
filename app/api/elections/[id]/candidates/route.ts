import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const electionId = Number(params.id);
    const candidates = await prisma.candidate.findMany({
      where: { electionId },
      include: { 
        district: true,
        _count: {
          select: { votes: true }
        }
      },
      orderBy: { name: "asc" }
    });

    return NextResponse.json(candidates);
  } catch (error) {
    console.error("Candidates fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch candidates" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = req.cookies.get("user-session");
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const electionId = Number(params.id);
    const body = await req.json();
    const candidate = await prisma.candidate.create({ 
      data: { ...body, electionId }
    });
    
    return NextResponse.json(candidate, { status: 201 });
  } catch (error) {
    console.error("Candidate creation error:", error);
    return NextResponse.json(
      { error: "Failed to create candidate" },
      { status: 500 }
    );
  }
}
