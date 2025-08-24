import Link from "next/link";
import { data } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch data for the homepage
  const recentResults = data.results
    .filter(r => r.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const recentNotices = data.notices
    .filter(n => n.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const districts = data.districts
    .sort((a, b) => a.name.localeCompare(b.name));

  // Filter notices to get news items
  const recentNews = data.notices
    .filter((n: any) => n.published && n.category === 'NEWS')
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="mb-8">
            <div className="inline-block p-3 bg-white/20 rounded-full mb-6">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Maharashtra Sepaktakraw Association
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            Official portal for results, notices, districts and compliance. Promoting the traditional sport of Sepaktakraw across Maharashtra.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/results" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View Results
            </Link>
            <Link 
              href="/districts" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Explore Districts
            </Link>
            <Link 
              href="/events" 
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Upcoming Events
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebars */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - Districts Navigation */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Districts
              </h2>
              <nav className="space-y-2">
                {districts.map((district) => (
                  <Link
                    key={district.id}
                    href={`/districts/${district.slug}`}
                    className="block p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 border-l-4 border-transparent hover:border-blue-500"
                  >
                    <div className="font-medium text-gray-800">{district.name}</div>
                    {district.about && (
                      <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {district.about}
                      </div>
                    )}
                  </Link>
                ))}
                <Link
                  href="/districts"
                  className="block p-3 rounded-lg bg-blue-50 text-blue-700 font-medium text-center hover:bg-blue-100 transition-colors duration-200"
                >
                  View All Districts →
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-6">
            {/* Quick Stats */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Association Overview
              </h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{districts.length}</div>
                  <div className="text-gray-600 text-sm">Active Districts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{recentResults.length}</div>
                  <div className="text-gray-600 text-sm">Recent Matches</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{recentNotices.length}</div>
                  <div className="text-gray-600 text-sm">Latest Updates</div>
                </div>
              </div>
            </section>

            {/* Quick Links */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Access</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/rules" className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
                  <svg className="w-8 h-8 text-blue-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Rules</span>
                </Link>
                <Link href="/compliance" className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors duration-200">
                  <svg className="w-8 h-8 text-green-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Compliance</span>
                </Link>
                <Link href="/events" className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-orange-50 transition-colors duration-200">
                  <svg className="w-8 h-8 text-orange-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Events</span>
                </Link>
                <Link href="/media" className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-purple-50 transition-colors duration-200">
                  <svg className="w-8 h-8 text-purple-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Media</span>
                </Link>
              </div>
            </section>

            {/* About Section */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About Sepaktakraw</h2>
              <p className="text-gray-600 leading-relaxed">
                Sepaktakraw is a traditional sport native to Southeast Asia, particularly popular in Malaysia, 
                Thailand, and Indonesia. It combines elements of volleyball, football, and martial arts, 
                requiring exceptional skill, agility, and teamwork. The Maharashtra Sepaktakraw Association 
                is dedicated to promoting this exciting sport across the state, organizing tournaments, 
                training programs, and fostering talent development.
              </p>
              <div className="mt-6">
                <Link 
                  href="/rules" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Learn more about the rules and gameplay →
                </Link>
              </div>
            </section>
          </div>

          {/* Right Sidebar - News, Results, Notices */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Recent Results */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Recent Results</h3>
                  <Link href="/results" className="text-sm text-blue-600 hover:underline">View All</Link>
                </div>
                <div className="space-y-3">
                  {recentResults.slice(0, 3).map((result) => (
                    <div key={result.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">
                        {new Date(result.date).toLocaleDateString()}
                      </div>
                      <div className="font-medium text-sm text-gray-800 mb-1">
                        {result.teamA} vs {result.teamB}
                      </div>
                      {result.scoreA !== null && result.scoreB !== null && (
                        <div className="text-lg font-bold text-blue-600 text-center">
                          {result.scoreA} - {result.scoreB}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Latest News */}
              {recentNews.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Latest News</h3>
                    <Link href="/notices" className="text-sm text-blue-600 hover:underline">View All</Link>
                  </div>
                  <div className="space-y-3">
                    {recentNews.map((news: any) => (
                      <div key={news.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">
                          {new Date(news.createdAt).toLocaleDateString()}
                        </div>
                        <div className="font-medium text-sm text-gray-800 line-clamp-2">
                          {news.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Latest Notices */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Latest Notices</h3>
                  <Link href="/notices" className="text-sm text-blue-600 hover:underline">View All</Link>
                </div>
                <div className="space-y-3">
                  {recentNotices.slice(0, 3).map((notice) => (
                    <div key={notice.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">
                        {new Date(notice.createdAt).toLocaleDateString()}
                      </div>
                      <div className="font-medium text-sm text-gray-800 line-clamp-2 mb-2">
                        {notice.title}
                      </div>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {notice.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-blue-600 text-white rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">Get in Touch</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>info@mskt.org</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>+91-98765-43210</span>
                  </div>
                </div>
                <Link 
                  href="/contact" 
                  className="inline-block mt-4 bg-white text-blue-600 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
