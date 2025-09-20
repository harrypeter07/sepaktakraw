import Link from "next/link";
import { db } from "@/lib/data";
import { Card, Section, Grid, Badge } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function DistrictsPage() {
  // Fetch districts from database
  const districts = await db.getDistricts();

  return (
    <div className="min-h-screen bg-off-white py-8 md:py-12">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-display text-dark-gray mb-3 md:mb-4">Our Districts</h1>
          <p className="text-lead">
            Explore the districts under Maharashtra Sepaktakraw Association
          </p>
        </div>

        {/* Districts Grid */}
        <Section title="District Associations" className="mb-8 md:mb-12">
          {districts.length > 0 ? (
            <Grid cols={3} gap="lg">
              {districts.map((district) => (
                <Card key={district.id} className="hover:shadow-xl transition-shadow duration-200">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" size="sm">
                        {district._count.teams} Teams
                      </Badge>
                      <Badge variant="outline" size="sm">
                        {district._count.officials} Officials
                      </Badge>
                    </div>
                    <h3 className="text-heading mb-2">{district.name}</h3>
                    {district.about && (
                      <p className="text-small text-medium-gray line-clamp-3 mb-3">
                        {district.about}
                      </p>
                    )}
                    <div className="space-y-2 mb-4">
                      {district.address && (
                        <div className="flex items-start text-xs text-medium-gray">
                          <svg className="w-3 h-3 mr-2 mt-0.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="line-clamp-2">{district.address}</span>
                        </div>
                      )}
                      {district.phone && (
                        <div className="flex items-center text-xs text-medium-gray">
                          <svg className="w-3 h-3 mr-2 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{district.phone}</span>
                        </div>
                      )}
                      {district.email && (
                        <div className="flex items-center text-xs text-medium-gray">
                          <svg className="w-3 h-3 mr-2 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="line-clamp-1">{district.email}</span>
                        </div>
                      )}
                    </div>
                    <div className="mobile-grid-2 gap-2 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-bright-red">{district._count.results}</div>
                        <div className="text-xs text-medium-gray">Results</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange">{district._count.users}</div>
                        <div className="text-xs text-medium-gray">Users</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/districts/${district.slug}`} 
                      className="text-bright-red hover:text-red-700 font-medium text-sm hover:underline"
                    >
                      Learn More →
                    </Link>
                    {district.website && (
                      <a 
                        href={district.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-orange hover:text-orange-600 text-sm hover:underline"
                      >
                        Website
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </Grid>
          ) : (
            <Card>
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-dark-gray mb-2">No Districts Available</h3>
                <p className="text-medium-gray">Check back later for district information</p>
              </div>
            </Card>
          )}
        </Section>

        {/* CTA Section */}
        <Section title="Get Involved" className="mb-8 md:mb-12">
          <Card className="bg-gradient-to-r from-bright-red to-orange text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Join Your Local District
            </h3>
            <p className="text-lg text-white/90 mb-6">
              Join your local district association and participate in sepaktakraw events, 
              tournaments, and training programs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/results" 
                className="btn-secondary bg-white text-bright-red hover:bg-white/90"
              >
                View Results
              </Link>
              <Link 
                href="/notices" 
                className="btn-outline bg-white text-bright-red hover:bg-white/90"
              >
                Latest Notices
              </Link>
            </div>
          </Card>
        </Section>
      </div>
    </div>
  );
}


