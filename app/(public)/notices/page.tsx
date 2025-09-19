import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  const supabase = createClient();
  let notices: any[] = [];

  try {
    const { data, error } = await supabase
      .from("notices")
      .select("id, title, body, category, attachments, priority, createdAt, published")
      .eq("published", true)
      .order("createdAt", { ascending: false });
    if (!error && data) notices = data;
  } catch {}

  const noticesByCategory = notices.reduce((acc: Record<string, any[]>, notice: any) => {
    const category = notice.category || "General";
    if (!acc[category]) acc[category] = [];
    acc[category].push(notice);
    return acc;
  }, {});
  const categories = Object.keys(noticesByCategory).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Notices & Updates</h1>
          <p className="text-xl text-purple-100">Stay informed with the latest announcements from Maharashtra Sepaktakraw Association</p>
        </div>
      </section>

      {/* Notices by Category */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          {categories.length > 0 ? (
            <div className="space-y-12">
              {categories.map((category) => (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-2 h-8 bg-purple-600 rounded mr-3"></span>
                    {category}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {noticesByCategory[category].map((notice) => (
                      <div key={notice.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">{notice.category}</span>
                            <span className="text-xs text-gray-500">{new Date(notice.createdAt).toLocaleDateString()}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{notice.title}</h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{notice.body}</p>
                          {Array.isArray(notice.attachments) && notice.attachments.length > 0 && (
                            <div className="mb-4">
                              <div className="text-xs text-gray-500 mb-2">Attachments:</div>
                              <div className="flex flex-wrap gap-2">
                                {notice.attachments.slice(0, 3).map((attachment: string, index: number) => (
                                  <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">📎 {attachment}</span>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <Link href={`/notices/${notice.id}`} className="text-purple-600 hover:text-purple-800 font-semibold text-sm hover:underline">Read More →</Link>
                            {notice.priority === "HIGH" && (
                              <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">High Priority</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No notices available</div>
              <p className="text-gray-400">Check back later for the latest updates</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Connected</h2>
          <p className="text-gray-600 mb-6">Never miss an important update from the association</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/results" className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">View Results</Link>
            <Link href="/districts" className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">Explore Districts</Link>
          </div>
        </div>
      </section>
    </div>
  );
}


