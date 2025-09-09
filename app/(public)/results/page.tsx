import { repo } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ResultsPage() {
  // Fetch all published results with district information
  // TODO: Replace with Prisma query when database is ready
  // const results = await prisma.result.findMany({
  //   where: {
  //     published: true
  //   },
  //   include: {
  //     district: true
  //   },
  //   orderBy: {
  //     date: "desc"
  //   }
  // });

  const results = (await repo.results.list()).filter((r: any) => r.published);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Match Results
          </h1>
          <p className="text-xl text-blue-100">
            Latest results and scores from Maharashtra Sepaktakraw Association
          </p>
        </div>
      </section>

      {/* Results List */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          {results.length > 0 ? (
            <div className="grid gap-6">
              {results.map((result) => (
                <div key={result.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {result.teamA} vs {result.teamB}
                        </h3>
                        {result.district && (
                          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                            {result.district.name}
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Date:</span>
                          <br />
                          {new Date(result.date).toLocaleDateString()}
                        </div>
                        {result.venue && (
                          <div>
                            <span className="font-medium">Venue:</span>
                            <br />
                            {result.venue}
                          </div>
                        )}
                        {result.level && (
                          <div>
                            <span className="font-medium">Level:</span>
                            <br />
                            {result.level}
                          </div>
                        )}
                        {result.stage && (
                          <div>
                            <span className="font-medium">Stage:</span>
                            <br />
                            {result.stage}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 md:ml-6">
                      {result.scoreA !== null && result.scoreB !== null ? (
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {result.scoreA} - {result.scoreB}
                          </div>
                          <div className="text-sm text-gray-500">
                            Final Score
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-2xl font-semibold text-gray-400 mb-2">
                            TBD
                          </div>
                          <div className="text-sm text-gray-500">
                            Score Pending
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No results available</div>
              <p className="text-gray-400">Check back later for the latest match results</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-6">
            Get the latest results, notices, and updates from the Maharashtra Sepaktakraw Association
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/notices"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View Notices
            </Link>
            <Link
              href="/districts"
              className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Explore Districts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


