import Link from "next/link";
import { db } from "@/lib/data";
import { Card, Section, Grid, Badge } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function ResultsPage() {
  // Fetch results from database
  const results = await db.getResults({ published: true, limit: 20 });

  return (
    <div className="min-h-screen bg-off-white py-8 md:py-12">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-display text-dark-gray mb-3 md:mb-4">Match Results</h1>
          <p className="text-lead">
            Latest results and scores from Maharashtra Sepaktakraw Association
          </p>
        </div>

        {/* Results List */}
        <Section title="Recent Results" className="mb-8 md:mb-12">
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow duration-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-heading">
                          {result.teamA} vs {result.teamB}
                        </h3>
                        <Badge variant="secondary" size="sm">
                          {result.level}
                        </Badge>
                        {result.stage && (
                          <Badge variant="outline" size="sm">
                            {result.stage}
                          </Badge>
                        )}
                      </div>
                      <div className="mobile-grid-2 md:grid-cols-4 gap-4 text-small text-medium-gray">
                        <div>
                          <span className="font-medium">Date:</span>
                          <br />
                          {new Date(result.date).toLocaleDateString()}
                        </div>
                        {result.venue && (
                          <div>
                            <span className="font-medium">Venue:</span>
                            <br />
                            <span className="line-clamp-2">{result.venue}</span>
                          </div>
                        )}
                        {result.district && (
                          <div>
                            <span className="font-medium">District:</span>
                            <br />
                            {result.district.name}
                          </div>
                        )}
                        {result.matchNo && (
                          <div>
                            <span className="font-medium">Match:</span>
                            <br />
                            {result.matchNo}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      {result.scoreA !== null && result.scoreB !== null ? (
                        <div className="text-center">
                          <div className="text-3xl font-bold text-bright-red mb-2">
                            {result.scoreA} - {result.scoreB}
                          </div>
                          <div className="text-small text-medium-gray">Final Score</div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-2xl font-semibold text-medium-gray mb-2">TBD</div>
                          <div className="text-small text-medium-gray">Score Pending</div>
                        </div>
                      )}
                    </div>
                  </div>
                  {result.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-small text-dark-gray">
                        <span className="font-medium">Notes:</span> {result.notes}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-dark-gray mb-2">No Results Available</h3>
                <p className="text-medium-gray">Check back later for the latest match results</p>
              </div>
            </Card>
          )}
        </Section>

        {/* CTA Section */}
        <Section title="Stay Updated" className="mb-8 md:mb-12">
          <Card className="bg-gradient-to-r from-bright-red to-orange text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Get the Latest Updates
            </h3>
            <p className="text-lg text-white/90 mb-6">
              Stay informed with the latest results, notices, and updates from the 
              Maharashtra Sepaktakraw Association.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/notices"
                className="btn-secondary bg-white text-bright-red hover:bg-white/90"
              >
                View Notices
              </Link>
              <Link
                href="/districts"
                className="btn-outline bg-white text-bright-red hover:bg-white/90"
              >
                Explore Districts
              </Link>
            </div>
          </Card>
        </Section>
      </div>
    </div>
  );
}


