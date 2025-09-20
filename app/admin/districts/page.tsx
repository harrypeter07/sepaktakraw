import { db } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDistricts() {
  // Fetch all districts with counts from database
  const districts = await db.getDistricts();

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
              

              
              <div className="flex justify-between items-center">
                <Link
                  href={`/admin/districts/${district.id}/edit`}
                  className="text-blue-600 hover:text-blue-800 font-semibold text-sm hover:underline"
                >
                  Edit District
                </Link>
                

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
