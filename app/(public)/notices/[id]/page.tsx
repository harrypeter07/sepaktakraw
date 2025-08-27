import { notFound } from "next/navigation";
import { data } from "@/lib/data";
import { Button, Card, Badge } from "@/components/ui";

export default async function NoticeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Use mock data instead of Prisma
  const item = data.notices.find(n => 
    n.slug === id || n.id.toString() === id
  );
  
  if (!item) return notFound();

  return (
    <div className="min-h-screen bg-off-white py-8 md:py-12">
      <div className="container-content">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="primary" size="sm">{item.category}</Badge>
              <span className="text-sm text-medium-gray">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-display text-dark-gray mb-4">{item.title}</h1>
            {item.summary && (
              <p className="text-lead text-medium-gray mb-6">{item.summary}</p>
            )}
          </div>

          {/* Content */}
          <Card className="mb-8">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: item.body }} />
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" href="/notices">
              ← Back to Notices
            </Button>
            <Button variant="primary" href="/contact">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


