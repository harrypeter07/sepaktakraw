import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function NoticeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.notice.findFirst({ where: { OR: [{ slug: id }, { id: Number(id) || 0 }] } });
  if (!item) return notFound();
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold">{item.title}</h1>
      <article className="prose mt-4" dangerouslySetInnerHTML={{ __html: item.body }} />
    </section>
  );
}


