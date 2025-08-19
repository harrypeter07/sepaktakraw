import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ResultsPage() {
  const results = await prisma.result.findMany({ orderBy: { date: "desc" }, take: 20 });
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-xl font-semibold mb-4">Results</h1>
      <ul className="divide-y">
        {results.map((r) => (
          <li key={r.id} className="py-3 text-sm">
            <div className="font-medium">{r.teamA} vs {r.teamB} • {new Date(r.date).toLocaleDateString()}</div>
            {r.scoreA != null && r.scoreB != null && (
              <div className="text-gray-600">Score: {r.scoreA} - {r.scoreB}</div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}


