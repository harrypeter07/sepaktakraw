// import { prisma } from "@/lib/prisma"; // Commented out for future database implementation
import { getDistrictsWithCounts } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDistricts() {
  // Fetch all districts with counts
  // TODO: Replace with Prisma query when database is ready
  // const districts = await prisma.district.findMany({
  //   include: {
  //     _count: {
  //       select: {
  //         officials: true,
  //         teams: true,
  //         results: true,
  //         users: true
  //       }
  //     }
  //   },
  //   orderBy: {
  //     name: "asc"
  //   }
  // });

  // Using mock data instead
  const districts = getDistrictsWithCounts()
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">District Management</h1>
        <Link
          href="/admin/districts/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add District
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {districts.map((district) => (
          <div key={district.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {district.image && (
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <div className="text-white text-6xl font-bold">
                  {district.name.charAt(0)}
                </div>
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {district.name}
              </h3>
              
              {district.about && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {district.about}
                </p>
              )}
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {district._count.officials}
                  </div>
                  <div className="text-xs text-gray-500">Officials</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {district._count.results}
                  </div>
                  <div className="text-xs text-gray-500">Results</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {district._count.users}
                  </div>
                  <div className="text-xs text-gray-500">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {district._count.teams}
                  </div>
                  <div className="text-xs text-gray-500">Teams</div>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                {district.address && (
                  <div className="flex items-start text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2 mt-0.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs">{district.address}</span>
                  </div>
                )}
                
                {district.phone && (
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-xs">{district.phone}</span>
                  </div>
                )}
                
                {district.email && (
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs">{district.email}</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <Link
                  href={`/admin/districts/${district.id}/edit`}
                  className="text-blue-600 hover:text-blue-800 font-semibold text-sm hover:underline"
                >
                  Edit District
                </Link>
                
                {district.website && (
                  <a
                    href={district.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800 text-sm hover:underline"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {districts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No districts found</div>
          <p className="text-gray-400 mt-2">Get started by adding your first district</p>
        </div>
      )}
    </section>
  );
}
