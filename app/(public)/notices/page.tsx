import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  const notices = await prisma.notice.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  // Group notices by category
  const noticesByCategory = notices.reduce((acc, notice) => {
    if (!acc[notice.category]) {
      acc[notice.category] = [];
    }
    acc[notice.category].push(notice);
    return acc;
  }, {} as Record<string, typeof notices>);

  const categories = Object.keys(noticesByCategory);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Notices & Announcements</h1>
      
      {categories.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Notices Available</h3>
          <p className="text-gray-500">Check back later for updates and announcements.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 capitalize">
                {category.replace("_", " ")}
              </h2>
              
              <div className="space-y-4">
                {noticesByCategory[category].map((notice) => (
                  <div key={notice.id} className="border-l-4 border-blue-500 pl-4 py-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {notice.title}
                        </h3>
                        <p className="text-gray-600 mb-3 line-clamp-3">
                          {notice.body}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>📅 {new Date(notice.createdAt).toLocaleDateString()}</span>
                          {notice.fileUrl && (
                            <span className="ml-4 text-blue-600">
                              📎 Has attachment
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <Link
                        href={`/notices/${notice.slug}`}
                        className="ml-4 text-blue-600 hover:text-blue-800 font-medium text-sm whitespace-nowrap"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}


