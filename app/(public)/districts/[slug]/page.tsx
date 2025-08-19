import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps { params: { slug: string } }

export default async function DistrictPage({ params }: PageProps) {
  const district = await prisma.district.findUnique({ where: { slug: params.slug }, include: { officials: true } });
  if (!district) return notFound();
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">{district.name}</h1>
      {district.about && <p className="text-gray-700 mt-2">{district.about}</p>}
      <h2 className="text-lg font-semibold mt-6">Officials</h2>
      <ul className="mt-2 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {district.officials.map((o) => (
          <li key={o.id} className="border rounded p-3">
            <div className="font-medium">{o.name}</div>
            <div className="text-sm text-gray-600">{o.position}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}


