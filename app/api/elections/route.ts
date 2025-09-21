import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const published = searchParams.get("published");
    const limit = searchParams.get("limit");

    const where: any = {};
    if (status) where.status = status;
    if (published !== null) where.published = published === "true";

    const elections = await prisma.election.findMany({
      where,
      include: {
        documents: true,
        candidates: {
          include: { district: true }
        },
        _count: {
          select: {
            candidates: true,
            votes: true
          }
        }
      },
      orderBy: { startDate: "desc" },
      take: limit ? parseInt(limit) : 50
    });

    return NextResponse.json(elections);
  } catch (error) {
    console.error("Elections fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch elections" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = req.cookies.get("user-session");
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const election = await prisma.election.create({ data: body });
    
    return NextResponse.json(election, { status: 201 });
  } catch (error) {
    console.error("Election creation error:", error);
    return NextResponse.json(
      { error: "Failed to create election" },
      { status: 500 }
    );
  }
}
