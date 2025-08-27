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
    <section className="bg-white py-8 sm:py-12">
      <div className="container-main">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-dark-gray mb-6 text-center">Latest News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {news.map((newsItem) => (
            <Card key={newsItem.id} className="hover:shadow-md transition-shadow duration-200 mobile-card">
              <div className="mb-4">
                <Badge variant="primary" size="sm" className="mb-2">{newsItem.category}</Badge>
                <h3 className="text-base sm:text-lg font-semibold text-dark-gray mb-2 line-clamp-2">{newsItem.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-3">
                  {new Date(newsItem.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm sm:text-base text-gray-700 line-clamp-3">{newsItem.body}</p>
              </div>
              <Link 
                href={`/notices/${newsItem.id}`}
                className="text-bright-red hover:text-red-700 font-medium text-sm underline decoration-2 underline-offset-2"
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
