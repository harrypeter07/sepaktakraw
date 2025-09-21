import { db } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDistricts() {
  // Fetch all districts with counts from database
  const districts = await db.getDistricts();

  return (
    <div className="min-h-screen bg-off-white py-8 md:py-12">
      <div className="container-content">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-display text-dark-gray">District Management</h1>
          <Link
            href="/admin/districts/new"
            className="btn-primary"
          >
            Add District
          </Link>
        </div>

        <div className="grid-responsive">
          {districts.map((district) => (
            <div key={district.id} className="card-hover">
              <div className="h-32 bg-gradient-to-br from-bright-red to-orange flex items-center justify-center mb-4 rounded-lg">
                <div className="text-white text-4xl font-bold">
                  {district.name.charAt(0)}
                </div>
              </div>
              
              <h3 className="text-heading mb-3">
                {district.name}
              </h3>
              
              {district.about && (
                <p className="text-small text-medium-gray mb-4 line-clamp-2">
                  {district.about}
                </p>
              )}
              
              <div className="mobile-grid-2 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-bright-red">
                    {district._count.officials}
                  </div>
                  <div className="text-xs text-medium-gray">Officials</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-orange">
                    {district._count.results}
                  </div>
                  <div className="text-xs text-medium-gray">Results</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-dark-gray">
                    {district._count.users}
                  </div>
                  <div className="text-xs text-medium-gray">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-medium-gray">
                    {district._count.teams}
                  </div>
                  <div className="text-xs text-medium-gray">Teams</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <Link
                  href={`/admin/districts/${district.id}/edit`}
                  className="text-bright-red hover:text-red-700 font-medium text-sm hover:underline"
                >
                  Edit District
                </Link>
                <span className="text-xs text-medium-gray">
                  {district.slug}
                </span>
              </div>
            </div>
          ))}
        </div>

        {districts.length === 0 && (
          <div className="card text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-dark-gray mb-2">No Districts Found</h3>
            <p className="text-medium-gray">Get started by adding your first district</p>
          </div>
        )}
      </div>
    </div>
  );
}
