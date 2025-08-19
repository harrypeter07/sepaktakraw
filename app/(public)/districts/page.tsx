import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DistrictsIndex() {
  const districts = await prisma.district.findMany({ orderBy: { name: "asc" } });
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-xl font-semibold mb-4">Districts</h1>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {districts.map((d) => (
          <li key={d.id} className="border rounded p-4">
            <Link href={`/districts/${d.slug}`} className="font-medium hover:underline">{d.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}


