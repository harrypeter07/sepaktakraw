import Link from "next/link";
import { Card, Badge } from "@/components/ui";

interface NewsItem {
  id: number;
  title: string;
  body: string;
  category: string;
  createdAt: string;
}

interface NewsSectionProps {
  news: NewsItem[];
}

export function NewsSection({ news }: NewsSectionProps) {
  return (
    <section className="bg-white py-6 sm:py-8 md:py-12">
      <div className="container-main">
        <h2 className="mobile-text-base sm:text-xl md:text-3xl font-bold text-dark-gray mb-4 sm:mb-6 text-center">Latest News</h2>
        <div className="mobile-grid-2 sm:grid-cols-2 lg:grid-cols-3 mobile-gap-3">
          {news.map((newsItem) => (
            <Card key={newsItem.id} className="hover:shadow-md transition-shadow duration-200 mobile-card-compact">
              <div className="mb-3">
                <Badge variant="primary" size="sm" className="mb-2">{newsItem.category}</Badge>
                <h3 className="mobile-text-sm font-semibold text-dark-gray mb-1 line-clamp-2">{newsItem.title}</h3>
                <p className="mobile-text-xs text-gray-500 mb-2">
                  {new Date(newsItem.createdAt).toLocaleDateString()}
                </p>
                <p className="mobile-text-xs text-gray-700 line-clamp-3">{newsItem.body}</p>
              </div>
              <Link 
                href={`/notices/${newsItem.id}`}
                className="text-bright-red hover:text-red-700 font-medium mobile-text-xs underline decoration-2 underline-offset-2"
              >
                Read more →
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
