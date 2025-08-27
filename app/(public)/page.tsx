import Link from "next/link";
import Image from "next/image";
import { data } from "@/lib/data";
import { Button, Card, Badge, Section, Grid } from "@/components/ui";

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
    .filter((n) => n.published && n.category === 'NEWS')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section - Reduced Height */}
      <section className="bg-gradient-to-r from-dark-gray via-bright-red to-orange text-white py-16 md:py-20">
        <div className="container-main text-center">
          <div className="mb-6">
            <div className="inline-block p-3 bg-white/20 rounded-full mb-4">
              <Image 
                src="/mskt-logo.svg" 
                alt="MSKT Logo" 
                width={50} 
                height={50}
                className="w-12 h-12"
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Maharashtra Sepaktakraw Association
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Official portal for results, notices, districts and compliance. Promoting the traditional sport of Sepaktakraw across Maharashtra.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" size="lg" href="/results" className="bg-white text-bright-red hover:bg-white/90">
              View Results
            </Button>
            <Button variant="outline" size="lg" href="/districts" className="bg-white text-bright-red hover:bg-white/90">
              Explore Districts
            </Button>
            <Button variant="outline" size="lg" href="/events" className="bg-white text-bright-red hover:bg-white/90">
              Upcoming Events
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content with Improved Sidebars */}
      <div className="container-main py-8">
        <div className="grid-sidebar">
          
          {/* Left Sidebar - Districts Navigation - Reduced Padding */}
          <div className="lg:col-span-3">
            <div className="sidebar-sticky sidebar-compact">
              <h2 className="sidebar-title">
                <Image 
                  src="/mskt-logo.svg" 
                  alt="MSKT Logo" 
                  width={18} 
                  height={18}
                  className="w-4 h-4 mr-2"
                />
                Districts
              </h2>
              <nav className="space-y-1">
                {districts.slice(0, 8).map((district) => (
                  <Link
                    key={district.id}
                    href={`/districts/${district.slug}`}
                    className="sidebar-item block"
                  >
                    <div className="font-medium text-dark-gray">{district.name}</div>
                    {district.about && (
                      <div className="text-caption mt-1 line-clamp-2">
                        {district.about}
                      </div>
                    )}
                  </Link>
                ))}
                <Link
                  href="/districts"
                  className="block p-3 rounded-lg bg-off-white text-bright-red font-medium text-center hover:bg-bright-red hover:text-white transition-colors duration-200 text-sm"
                >
                  View All Districts →
                </Link>
              </nav>
              
              {/* Quick Stats in Sidebar */}
              <div className="mt-6 p-4 bg-gradient-to-br from-bright-red to-orange text-white rounded-lg">
                <h3 className="text-heading mb-3">Quick Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Active Districts</span>
                    <span className="font-bold">{districts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recent Matches</span>
                    <span className="font-bold">{recentResults.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Latest Updates</span>
                    <span className="font-bold">{recentNotices.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-6">
            {/* Quick Stats */}
            <Card className="content-section">
              <h2 className="section-header">
                Association Overview
              </h2>
              <Grid cols={3} gap="md">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-bright-red mb-2">{districts.length}</div>
                  <div className="text-caption">Active Districts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-orange mb-2">{recentResults.length}</div>
                  <div className="text-caption">Recent Matches</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-dark-gray mb-2">{recentNotices.length}</div>
                  <div className="text-caption">Latest Updates</div>
                </div>
              </Grid>
            </Card>

            {/* Quick Links */}
            <Card className="content-section">
              <h2 className="section-subheader">Quick Access</h2>
              <Grid cols={4} gap="md">
                <Link href="/rules" className="flex flex-col items-center p-3 rounded-lg bg-off-white hover:bg-bright-red hover:text-white transition-colors duration-200">
                  <svg className="w-6 h-6 text-bright-red mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium">Rules</span>
                </Link>
                <Link href="/compliance" className="flex flex-col items-center p-3 rounded-lg bg-off-white hover:bg-orange hover:text-white transition-colors duration-200">
                  <svg className="w-6 h-6 text-orange mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium">Compliance</span>
                </Link>
                <Link href="/events" className="flex flex-col items-center p-3 rounded-lg bg-off-white hover:bg-bright-red hover:text-white transition-colors duration-200">
                  <svg className="w-6 h-6 text-bright-red mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium">Events</span>
                </Link>
                <Link href="/media" className="flex flex-col items-center p-3 rounded-lg bg-off-white hover:bg-orange hover:text-white transition-colors duration-200">
                  <svg className="w-6 h-6 text-orange mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                  </svg>
                  <span className="text-xs font-medium">Media</span>
                </Link>
              </Grid>
            </Card>

            {/* About Section */}
            <Card>
              <h2 className="section-subheader">About Sepaktakraw</h2>
              <p className="text-body">
                Sepaktakraw is a traditional sport native to Southeast Asia, particularly popular in Malaysia, 
                Thailand, and Indonesia. It combines elements of volleyball, football, and martial arts, 
                requiring exceptional skill, agility, and teamwork. The Maharashtra Sepaktakraw Association 
                is dedicated to promoting this exciting sport across the state, organizing tournaments, 
                training programs, and fostering talent development.
              </p>
              <div className="mt-4">
                <Link 
                  href="/rules" 
                  className="link-primary"
                >
                  Learn more about the rules and gameplay →
                </Link>
              </div>
            </Card>
          </div>

          {/* Right Sidebar - Recent Results */}
          <div className="lg:col-span-3">
            <div className="sidebar-sticky sidebar-compact">
              <div className="flex items-center justify-between mb-4">
                <h2 className="sidebar-title">Recent Results</h2>
                <Link href="/results" className="text-bright-red hover:text-orange text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {recentResults.map((result) => (
                  <div key={result.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="text-xs text-medium-gray mb-1">
                      {new Date(result.date).toLocaleDateString()}
                    </div>
                    <div className="font-medium text-dark-gray text-sm mb-1">
                      {result.teamA} vs {result.teamB}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-medium-gray">
                        {result.level} {result.stage && `• ${result.stage}`}
                      </span>
                      {result.scoreA !== null && result.scoreB !== null ? (
                        <div className="text-sm font-bold">
                          <span className="text-bright-red">{result.scoreA}</span>
                          <span className="mx-1 text-gray-400">-</span>
                          <span className="text-orange">{result.scoreB}</span>
                        </div>
                      ) : (
                        <Badge variant="secondary" size="sm">TBD</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Section */}
      {recentNews.length > 0 && (
        <section className="bg-white py-12">
          <div className="container-main">
            <h2 className="section-header">Latest News</h2>
            <Grid cols={3} gap="lg">
              {recentNews.map((news) => (
                <Card key={news.id} className="hover:shadow-md transition-shadow duration-200">
                  <div className="mb-4">
                    <Badge variant="primary" size="sm" className="mb-2">{news.category}</Badge>
                    <h3 className="text-heading mb-2 line-clamp-2">{news.title}</h3>
                    <p className="text-small text-medium-gray mb-3">
                      {new Date(news.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-body line-clamp-3">{news.body}</p>
                  </div>
                  <Link 
                    href={`/notices/${news.id}`}
                    className="link-primary text-sm"
                  >
                    Read more →
                  </Link>
                </Card>
              ))}
            </Grid>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-bright-red to-orange text-white py-16">
        <div className="container-main text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Involved
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join the Maharashtra Sepaktakraw Association and be part of promoting this 
            exciting traditional sport across the state.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" size="lg" href="/districts" className="bg-white text-bright-red hover:bg-white/90">
              Find Your District
            </Button>
            <Button variant="outline" size="lg" href="/contact" className="bg-white text-bright-red hover:bg-white/90">
              Contact Us
            </Button>
            <Button variant="outline" size="lg" href="/media" className="bg-white text-bright-red hover:bg-white/90">
              View Resources
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}


