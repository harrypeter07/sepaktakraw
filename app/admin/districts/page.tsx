import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDistrictsPage() {
  const districts = await prisma.district.findMany({
    include: {
      _count: {
        select: {
          officials: true,
          teams: true,
          results: true,
          users: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">District Management</h1>
        <Link
          href="/admin/districts/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New District
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {districts.map((district) => (
          <div key={district.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {district.name}
              </h3>
              <Link
                href={`/admin/districts/${district.id}/edit`}
                className="text-blue-600 hover:text-blue-900 text-sm font-medium"
              >
                Edit
              </Link>
            </div>
            
            {district.about && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {district.about}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {district._count.officials}
                </div>
                <div className="text-gray-500">Officials</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {district._count.teams}
                </div>
                <div className="text-gray-500">Teams</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {district._count.results}
                </div>
                <div className="text-gray-500">Results</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {district._count.users}
                </div>
                <div className="text-gray-500">Users</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Created: {new Date(district.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {districts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No districts found.</p>
        </div>
      )}
    </section>
  );
}
