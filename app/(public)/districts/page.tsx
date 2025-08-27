// import { prisma } from "@/lib/prisma"; // Commented out for future database implementation
import { data } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DistrictsPage() {
  // Fetch all districts
  // TODO: Replace with Prisma query when database is ready
  // const districts = await prisma.district.findMany({
  //   orderBy: {
  //     name: "asc"
  //   }
  // });

  // Using mock data instead
  const districts = data.districts
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Districts
          </h1>
          <p className="text-xl text-green-100">
            Explore the districts under Maharashtra Sepaktakraw Association
          </p>
        </div>
      </section>

      {/* Districts Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          {districts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {districts.map((district) => (
                <div key={district.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {/* District initial letter display */}
                  <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <div className="text-white text-6xl font-bold">
                      {district.name.charAt(0)}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {district.name}
                    </h3>
                    
                    {district.about && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {district.about}
                      </p>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <Link
                        href={`/districts/${district.slug}`}
                        className="text-green-600 hover:text-green-800 font-semibold text-sm hover:underline"
                      >
                        Learn More →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No districts available</div>
              <p className="text-gray-400">Check back later for district information</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Get Involved
          </h2>
          <p className="text-gray-600 mb-6">
            Join your local district association and participate in sepaktakraw events
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/results"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              View Results
            </Link>
            <Link
              href="/notices"
              className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Latest Notices
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


