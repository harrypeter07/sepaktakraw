import { NextResponse } from "next/server";
import { data } from "@/lib/data";

export async function GET() {
  try {
    // Use mock data instead of Prisma for now
    const rows = data.submissions.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
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


