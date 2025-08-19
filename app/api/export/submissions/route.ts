import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const rows = await prisma.submission.findMany({ orderBy: { createdAt: "desc" } });
  const header = ["id", "formKey", "data", "createdAt"];
  const csv = [header.join(",")].concat(
    rows.map((r) => [r.id, r.formKey, JSON.stringify(r.data).replaceAll(",", ";"), r.createdAt.toISOString()].join(","))
  ).join("\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=mskt-submissions.csv",
    },
  });
}


