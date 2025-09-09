import Link from "next/link";
import Image from "next/image";
import { Suspense, lazy } from "react";
import { repo } from "@/lib/data";
import { Button, Card, Badge, Grid } from "@/components/ui";

export const dynamic = "force-dynamic";

// Lazy load heavy components
const NewsSection = lazy(() => import("@/components/sections/NewsSection").then(mod => ({ default: mod.NewsSection })));
const CTASection = lazy(() => import("@/components/sections/CTASection").then(mod => ({ default: mod.CTASection })));

// Loading components
function HeroLoading() {
  return (
    <section className="bg-gradient-to-r from-dark-gray via-bright-red to-orange text-white py-12 sm:py-16 md:py-20">
      <div className="container-main text-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4"></div>
          <div className="h-8 bg-white/20 rounded mb-4 mx-auto max-w-md"></div>
          <div className="h-4 bg-white/20 rounded mb-8 mx-auto max-w-2xl"></div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <div className="w-32 h-10 bg-white/20 rounded"></div>
            <div className="w-32 h-10 bg-white/20 rounded"></div>
            <div className="w-32 h-10 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsLoading() {
  return (
    <Card className="mobile-card">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="text-center">
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="text-center">
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function QuickLinksLoading() {
  return (
    <Card className="mobile-card">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default async function HomePage() {
  // Fetch data for the homepage (Prisma-backed with fallback)
  const [resultsAll, noticesAll, districts] = await Promise.all([
    repo.results.list(),
    repo.notices.list(),
    repo.safe(() => prisma.district.findMany({ orderBy: { name: 'asc' } }) as any, (await import("@/lib/data")).data.districts as any),
  ]);

  const recentResults = resultsAll
    .filter((r: any) => r.published)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const recentNotices = noticesAll
    .filter((n: any) => n.published)
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const recentNews = noticesAll
    .filter((n: any) => n.published && n.category === 'NEWS')
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section - Mobile Optimized */}
      <Suspense fallback={<HeroLoading />}>
        <section className="bg-gradient-to-r from-dark-gray via-bright-red to-orange text-white py-12 sm:py-16 md:py-20">
          <div className="container-main text-center">
            <div className="mb-4 sm:mb-6">
              <div className="inline-block p-2 sm:p-3 bg-white/20 rounded-full mb-3 sm:mb-4">
                <Image 
                  src="/mskt-logo.svg" 
                  alt="MSKT Logo" 
                  width={50} 
                  height={50}
                  className="w-10 h-10 sm:w-12 sm:h-12"
                  priority
                />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
              Maharashtra Sepaktakraw Association
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Official portal for results, notices, districts and compliance. Promoting the traditional sport of Sepaktakraw across Maharashtra.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <Button variant="outline" size="lg" href="/results" className="w-full sm:w-auto bg-white text-bright-red hover:bg-white/90 touch-target">
                View Results
              </Button>
              <Button variant="outline" size="lg" href="/districts" className="w-full sm:w-auto bg-white text-bright-red hover:bg-white/90 touch-target">
                Explore Districts
              </Button>
              <Button variant="outline" size="lg" href="/events" className="w-full sm:w-auto bg-white text-bright-red hover:bg-white/90 touch-target">
                Upcoming Events
              </Button>
            </div>
          </div>
        </section>
      </Suspense>

      {/* Main Content - Mobile First Layout */}
      <div className="container-main py-6 sm:py-8">
        {/* Mobile Stats Section - COMPACT */}
        <div className="block lg:hidden mb-4">
          <Suspense fallback={<StatsLoading />}>
            <Card className="mobile-card-compact">
              <h2 className="mobile-text-sm font-bold text-dark-gray mb-3 text-center">
                Association Overview
              </h2>
              <div className="mobile-grid-3">
                <div className="text-center">
                  <div className="mobile-text-base font-bold text-bright-red mb-1">{districts.length}</div>
                  <div className="mobile-text-xs text-gray-600">Active Districts</div>
                </div>
                <div className="text-center">
                  <div className="mobile-text-base font-bold text-orange mb-1">{recentResults.length}</div>
                  <div className="mobile-text-xs text-gray-600">Recent Matches</div>
                </div>
                <div className="text-center">
                  <div className="mobile-text-base font-bold text-dark-gray mb-1">{recentNotices.length}</div>
                  <div className="mobile-text-xs text-gray-600">Latest Updates</div>
                </div>
              </div>
            </Card>
          </Suspense>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Sidebar - Districts Navigation */}
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
                    className="sidebar-item block touch-target"
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
                  className="block p-3 rounded-lg bg-off-white text-bright-red font-medium text-center hover:bg-bright-red hover:text-white transition-colors duration-200 text-sm touch-target"
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
            {/* Quick Stats - Desktop Only */}
            <div className="hidden lg:block">
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
            </div>

            {/* Quick Links - COMPACT */}
            <Card className="content-section">
              <h2 className="section-subheader">Quick Access</h2>
              <div className="mobile-grid-2 sm:grid-cols-4 mobile-gap-2">
                <Link href="/rules" className="flex flex-col items-center p-2 sm:p-3 md:p-4 rounded-lg bg-off-white hover:bg-bright-red hover:text-white transition-colors duration-200 touch-target">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-bright-red mb-1 sm:mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="mobile-text-xs font-medium text-center">Rules</span>
                </Link>
                <Link href="/compliance" className="flex flex-col items-center p-2 sm:p-3 md:p-4 rounded-lg bg-off-white hover:bg-orange hover:text-white transition-colors duration-200 touch-target">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange mb-1 sm:mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="mobile-text-xs font-medium text-center">Compliance</span>
                </Link>
                <Link href="/events" className="flex flex-col items-center p-2 sm:p-3 md:p-4 rounded-lg bg-off-white hover:bg-bright-red hover:text-white transition-colors duration-200 touch-target">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-bright-red mb-1 sm:mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="mobile-text-xs font-medium text-center">Events</span>
                </Link>
                <Link href="/media" className="flex flex-col items-center p-2 sm:p-3 md:p-4 rounded-lg bg-off-white hover:bg-orange hover:text-white transition-colors duration-200 touch-target">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange mb-1 sm:mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                  </svg>
                  <span className="mobile-text-xs font-medium text-center">Media</span>
                </Link>
              </div>
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

        {/* Mobile Quick Links */}
        <div className="block lg:hidden">
          <Suspense fallback={<QuickLinksLoading />}>
            <Card className="mobile-card">
              <h2 className="text-lg sm:text-xl font-semibold text-dark-gray mb-4">Quick Access</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/rules" className="flex flex-col items-center p-4 rounded-lg bg-off-white hover:bg-bright-red hover:text-white transition-colors duration-200 touch-target">
                  <svg className="w-6 h-6 text-bright-red mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-center">Rules</span>
                </Link>
                <Link href="/compliance" className="flex flex-col items-center p-4 rounded-lg bg-off-white hover:bg-orange hover:text-white transition-colors duration-200 touch-target">
                  <svg className="w-6 h-6 text-orange mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-center">Compliance</span>
                </Link>
                <Link href="/events" className="flex flex-col items-center p-4 rounded-lg bg-off-white hover:bg-bright-red hover:text-white transition-colors duration-200 touch-target">
                  <svg className="w-6 h-6 text-bright-red mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-center">Events</span>
                </Link>
                <Link href="/media" className="flex flex-col items-center p-4 rounded-lg bg-off-white hover:bg-orange hover:text-white transition-colors duration-200 touch-target">
                  <svg className="w-6 h-6 text-orange mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                  </svg>
                  <span className="text-sm font-medium text-center">Media</span>
                </Link>
              </div>
            </Card>
          </Suspense>
        </div>

        {/* Mobile About Section */}
        <div className="block lg:hidden mt-6">
          <Card className="mobile-card">
            <h2 className="text-lg sm:text-xl font-semibold text-dark-gray mb-3">About Sepaktakraw</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Sepaktakraw is a traditional sport native to Southeast Asia, particularly popular in Malaysia, 
              Thailand, and Indonesia. It combines elements of volleyball, football, and martial arts, 
              requiring exceptional skill, agility, and teamwork.
            </p>
            <div className="mt-4">
              <Link 
                href="/rules" 
                className="text-bright-red hover:text-red-700 font-medium text-sm sm:text-base underline decoration-2 underline-offset-2"
              >
                Learn more about the rules and gameplay →
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* News Section - Lazy Loaded */}
      {recentNews.length > 0 && (
        <Suspense fallback={
          <section className="bg-white py-8 sm:py-12">
            <div className="container-main">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-6 mx-auto max-w-xs"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        }>
          <NewsSection news={recentNews} />
        </Suspense>
      )}

      {/* CTA Section - Lazy Loaded */}
      <Suspense fallback={
        <section className="bg-gradient-to-r from-bright-red to-orange text-white py-12 sm:py-16">
          <div className="container-main text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-white/20 rounded mb-4 mx-auto max-w-xs"></div>
              <div className="h-4 bg-white/20 rounded mb-6 mx-auto max-w-2xl"></div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <div className="w-32 h-10 bg-white/20 rounded"></div>
                <div className="w-32 h-10 bg-white/20 rounded"></div>
                <div className="w-32 h-10 bg-white/20 rounded"></div>
              </div>
            </div>
          </div>
        </section>
      }>
        <CTASection />
      </Suspense>
    </div>
  );
}


