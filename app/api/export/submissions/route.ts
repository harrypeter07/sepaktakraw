import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get submissions from database
    const rows = await prisma.submission.findMany({
      orderBy: { createdAt: "desc" }
    });
    
    const header = ["id", "formKey", "data", "createdAt"];
    const csv = [header.join(",")].concat(
      rows.map((r) => [
        r.id, 
        r.formKey, 
        JSON.stringify(r.data).replaceAll(",", ";"), 
        new Date(r.createdAt).toISOString()
      ].join(","))
    ).join("\n");
    
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=mskt-submissions.csv",
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Failed to export submissions" },
      { status: 500 }
    );
  }
}


