import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const electionId = Number(params.id);
    const { candidateId, voterEmail, voterId } = await req.json();

    // Get client IP
    const ipAddress = req.headers.get("x-forwarded-for") || 
                     req.headers.get("x-real-ip") || 
                     "unknown";

    // Check if election is active
    const election = await prisma.election.findUnique({
      where: { id: electionId }
    });

    if (!election) {
      return NextResponse.json({ error: "Election not found" }, { status: 404 });
    }

    if (election.status !== "ACTIVE") {
      return NextResponse.json({ error: "Election is not active" }, { status: 400 });
    }

    // Check if user has already voted
    const existingVote = await prisma.vote.findFirst({
      where: {
        electionId,
        OR: [
          { voterId: voterId || undefined },
          { voterEmail: voterEmail || undefined },
          { ipAddress }
        ]
      }
    });

    if (existingVote) {
      return NextResponse.json({ error: "You have already voted in this election" }, { status: 400 });
    }

    // Create vote
    const vote = await prisma.vote.create({
      data: {
        electionId,
        candidateId,
        voterId: voterId || null,
        voterEmail: voterEmail || null,
        ipAddress
      }
    });

    return NextResponse.json(vote, { status: 201 });
  } catch (error) {
    console.error("Vote creation error:", error);
    return NextResponse.json(
      { error: "Failed to cast vote" },
      { status: 500 }
    );
  }
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const electionId = Number(params.id);
    
    // Get vote statistics
    const stats = await prisma.vote.groupBy({
      by: ['candidateId'],
      where: { electionId },
      _count: { candidateId: true }
    });

    // Get candidate details
    const candidates = await prisma.candidate.findMany({
      where: { electionId },
      include: { district: true }
    });

    const voteResults = stats.map(stat => {
      const candidate = candidates.find(c => c.id === stat.candidateId);
      return {
        candidateId: stat.candidateId,
        candidateName: candidate?.name || "Unknown",
        candidatePosition: candidate?.position || "",
        voteCount: stat._count.candidateId
      };
    });

    return NextResponse.json(voteResults);
  } catch (error) {
    console.error("Vote stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch vote statistics" },
      { status: 500 }
    );
  }
}
