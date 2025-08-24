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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-dark-gray via-bright-red to-orange text-white py-16">
        <div className="container-main text-center">
          <div className="mb-8">
            <div className="inline-block p-3 bg-white/20 rounded-full mb-6">
              <Image 
                src="/mskt-logo.svg" 
                alt="MSKT Logo" 
                width={60} 
                height={60}
                className="w-12 h-12"
              />
            </div>
          </div>
          <h1 className="text-hero mb-6">
            Maharashtra Sepaktakraw Association
          </h1>
          <p className="text-subtitle mb-8 max-w-4xl mx-auto text-white">
            Official portal for results, notices, districts and compliance. Promoting the traditional sport of Sepaktakraw across Maharashtra.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" size="lg" href="/results">
              View Results
            </Button>
            <Button variant="secondary" size="lg" href="/districts">
              Explore Districts
            </Button>
            <Button variant="accent" size="lg" href="/events">
              Upcoming Events
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebars */}
      <div className="container-main py-8">
        <div className="grid-sidebar">
          
          {/* Left Sidebar - Districts Navigation */}
          <div className="lg:col-span-3">
            <div className="sidebar-sticky">
              <h2 className="section-subheader flex items-center">
                <Image 
                  src="/mskt-logo.svg" 
                  alt="MSKT Logo" 
                  width={20} 
                  height={20}
                  className="w-5 h-5 mr-2"
                />
                Districts
              </h2>
              <nav className="space-y-2">
                {districts.map((district) => (
                  <Link
                    key={district.id}
                    href={`/districts/${district.slug}`}
                    className="block p-3 rounded-lg hover:bg-off-white hover:text-bright-red transition-colors duration-200 border-l-4 border-transparent hover:border-bright-red"
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
                  className="block p-3 rounded-lg bg-off-white text-bright-red font-medium text-center hover:bg-bright-red hover:text-white transition-colors duration-200"
                >
                  View All Districts →
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-6">
            {/* Quick Stats */}
            <Card className="mb-8">
              <h2 className="section-header">
                Association Overview
              </h2>
              <Grid cols={3} gap="lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-bright-red mb-2">{districts.length}</div>
                  <div className="text-caption">Active Districts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange mb-2">{recentResults.length}</div>
                  <div className="text-caption">Recent Matches</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-dark-gray mb-2">{recentNotices.length}</div>
                  <div className="text-caption">Latest Updates</div>
                </div>
              </Grid>
            </Card>

            {/* Quick Links */}
            <Card className="mb-8">
              <h2 className="section-subheader">Quick Access</h2>
              <Grid cols={4} gap="md">
                <Link href="/rules" className="flex flex-col items-center p-4 rounded-lg bg-off-white hover:bg-bright-red hover:text-white transition-colors duration-200">
                  <svg className="w-8 h-8 text-bright-red mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Rules</span>
                </Link>
                <Link href="/compliance" className="flex flex-col items-center p-4 rounded-lg bg-off-white hover:bg-orange hover:text-white transition-colors duration-200">
                  <svg className="w-8 h-8 text-orange mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Compliance</span>
                </Link>
                <Link href="/events" className="flex flex-col items-center p-4 rounded-lg bg-off-white hover:bg-bright-red hover:text-white transition-colors duration-200">
                  <svg className="w-8 h-8 text-bright-red mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Events</span>
                </Link>
                <Link href="/media" className="flex flex-col items-center p-4 rounded-lg bg-off-white hover:bg-orange hover:text-white transition-colors duration-200">
                  <svg className="w-8 h-8 text-orange mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                  </svg>
                  <span className="text-sm font-medium">Media</span>
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
              <div className="mt-6">
                <Link 
                  href="/rules" 
                  className="link-primary"
                >
                  Learn more about the rules and gameplay →
                </Link>
              </div>
            </Card>
          </div>

          {/* Right Sidebar - News, Results, Notices */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Recent Results */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="section-subheader">Recent Results</h3>
                  <Link href="/results" className="link-primary text-sm">View All</Link>
                </div>
                <div className="space-y-3">
                  {recentResults.slice(0, 3).map((result) => (
                    <div key={result.id} className="p-3 bg-off-white rounded-lg">
                      <div className="text-caption mb-1">
                        {new Date(result.date).toLocaleDateString()}
                      </div>
                      <div className="font-medium text-sm text-dark-gray mb-1">
                        {result.teamA} vs {result.teamB}
                      </div>
                      {result.scoreA !== null && result.scoreB !== null && (
                        <div className="text-lg font-bold text-bright-red text-center">
                          {result.scoreA} - {result.scoreB}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Latest News */}
              {recentNews.length > 0 && (
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="section-subheader">Latest News</h3>
                    <Link href="/notices" className="link-primary text-sm">View All</Link>
                  </div>
                  <div className="space-y-3">
                    {recentNews.map((news) => (
                      <div key={news.id} className="p-3 bg-off-white rounded-lg">
                        <div className="text-caption mb-1">
                          {new Date(news.createdAt).toLocaleDateString()}
                        </div>
                        <div className="font-medium text-sm text-dark-gray line-clamp-2">
                          {news.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Latest Notices */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="section-subheader">Latest Notices</h3>
                  <Link href="/notices" className="link-primary text-sm">View All</Link>
                </div>
                <div className="space-y-3">
                  {recentNotices.slice(0, 3).map((notice) => (
                    <div key={notice.id} className="p-3 bg-off-white rounded-lg">
                      <div className="text-caption mb-1">
                        {new Date(notice.createdAt).toLocaleDateString()}
                      </div>
                      <div className="font-medium text-sm text-dark-gray line-clamp-2 mb-2">
                        {notice.title}
                      </div>
                      <Badge variant="primary" size="sm">
                        {notice.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Contact Info */}
              <div className="bg-bright-red text-white rounded-lg p-6">
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  href="/contact"
                  className="mt-4 w-full"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
