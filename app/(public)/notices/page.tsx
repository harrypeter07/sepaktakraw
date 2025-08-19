import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function NoticesPage() {
  const items = await prisma.notice.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-xl font-semibold mb-4">Notices</h1>
      <ul className="divide-y">
        {items.map((n) => (
          <li key={n.id} className="py-3">
            <Link href={`/notices/${n.slug}`} className="font-medium hover:underline">{n.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}


