import Link from "next/link";
// import { prisma } from "@/lib/prisma"; // Commented out for future database implementation
import { data } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch some recent data for the homepage
  // TODO: Replace with Prisma queries when database is ready
  // const recentResults = await prisma.result.findMany({
  //   orderBy: { date: "desc" },
  //   take: 3,
  //   where: { published: true }
  // });

  // const recentNotices = await prisma.notice.findMany({
  //   orderBy: { createdAt: "desc" },
  //   take: 3,
  //   where: { published: true }
  // });

  // const districts = await prisma.district.findMany({
  //   orderBy: { name: "asc" },
  //   take: 6
  // });

  // Using mock data instead
  const recentResults = data.results
    .filter(r => r.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const recentNotices = data.notices
    .filter(n => n.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const districts = data.districts
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Maharashtra Sepaktakraw Association
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Official portal for results, notices, districts and compliance
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/results" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              View Results
            </Link>
            <Link 
              href="/districts" 
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Explore Districts
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Association Overview
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{districts.length}</div>
              <div className="text-gray-600">Active Districts</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{recentResults.length}</div>
              <div className="text-gray-600">Recent Matches</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">{recentNotices.length}</div>
              <div className="text-gray-600">Latest Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Results */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Recent Results</h2>
            <Link href="/results" className="text-blue-600 hover:underline font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentResults.map((result) => (
              <div key={result.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(result.date).toLocaleDateString()}
                </div>
                <div className="font-semibold text-lg mb-2">
                  {result.teamA} vs {result.teamB}
                </div>
                {result.scoreA !== null && result.scoreB !== null && (
                  <div className="text-2xl font-bold text-center text-blue-600">
                    {result.scoreA} - {result.scoreB}
                  </div>
                )}
                <div className="text-sm text-gray-600 mt-2">
                  {result.venue && `Venue: ${result.venue}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Notices */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Latest Notices</h2>
            <Link href="/notices" className="text-blue-600 hover:underline font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentNotices.map((notice) => (
              <div key={notice.id} className="bg-gray-50 rounded-lg p-6">
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(notice.createdAt).toLocaleDateString()}
                </div>
                <h3 className="font-semibold text-lg mb-2">{notice.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{notice.body}</p>
                <div className="mt-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {notice.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Districts Preview */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Our Districts</h2>
            <Link href="/districts" className="text-blue-600 hover:underline font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {districts.map((district) => (
              <div key={district.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-xl mb-2">{district.name}</h3>
                {district.about && (
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {district.about}
                  </p>
                )}
                <Link 
                  href={`/districts/${district.slug}`}
                  className="text-blue-600 hover:underline font-semibold text-sm"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
