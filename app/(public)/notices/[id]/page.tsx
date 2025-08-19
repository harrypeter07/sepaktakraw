import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Params = { params: { id: string } };

export default async function NoticeDetail({ params }: Params) {
  const item = await prisma.notice.findFirst({ where: { OR: [{ slug: params.id }, { id: Number(params.id) || 0 }] } });
  if (!item) return notFound();
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold">{item.title}</h1>
      <article className="prose mt-4" dangerouslySetInnerHTML={{ __html: item.body }} />
    </section>
  );
}


