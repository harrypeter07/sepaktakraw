import { db } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Fetch dashboard statistics from database
  const [
    stats,
    activity
  ] = await Promise.all([
    db.getDashboardStats(),
    db.getRecentActivity()
  ]);

  const {
    totalUsers,
    totalDistricts,
    totalResults,
    totalNotices,
    totalForms,
    totalSubmissions,
    totalOfficials
  } = stats;

  const {
    recentResults,
    recentNotices,
    recentSubmissions
  } = activity;

  // Get form definitions for display
  const formDefs = await db.getFormDefs(true);
  const formKeyToTitle: Record<string, string> = Object.fromEntries(
    formDefs.map((f) => [f.key, f.title])
  );

  return (
    <div className="min-h-screen bg-off-white py-8 md:py-12">
      <div className="container-content">
        <h1 className="text-display text-dark-gray mb-8">Admin Dashboard</h1>
      
        {/* Statistics Cards */}
        <div className="grid-responsive mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-small font-medium text-medium-gray">Total Users</p>
                <p className="text-2xl font-semibold text-dark-gray">{totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-small font-medium text-medium-gray">Districts</p>
                <p className="text-2xl font-semibold text-dark-gray">{totalDistricts}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-small font-medium text-medium-gray">Match Results</p>
                <p className="text-2xl font-semibold text-dark-gray">{totalResults}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-small font-medium text-medium-gray">Notices</p>
                <p className="text-2xl font-semibold text-dark-gray">{totalNotices}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-teal-100 rounded-lg">
                <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M4 11h16M5 19h14a2 2 0 002-2v-6H3v6a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-small font-medium text-medium-gray">Form Submissions</p>
                <p className="text-2xl font-semibold text-dark-gray">{totalSubmissions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <h2 className="text-heading mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/admin/results/new"
                className="flex items-center p-3 text-sm font-medium text-dark-gray rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Match Result
              </Link>
              <Link
                href="/admin/notices/new"
                className="flex items-center p-3 text-sm font-medium text-dark-gray rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Notice
              </Link>
              <Link
                href="/admin/users/new"
                className="flex items-center p-3 text-sm font-medium text-dark-gray rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add User
              </Link>
              <Link
                href="/admin/districts/new"
                className="flex items-center p-3 text-sm font-medium text-dark-gray rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add District
              </Link>
            </div>
          </div>

          <div className="card">
            <h2 className="text-heading mb-4">System Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-small text-medium-gray">Forms Available</span>
                <span className="text-small font-medium text-dark-gray">{totalForms}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-small text-medium-gray">Officials</span>
                <span className="text-small font-medium text-dark-gray">{totalOfficials}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-small text-medium-gray">Total Submissions</span>
                <span className="text-small font-medium text-dark-gray">{totalSubmissions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-small text-medium-gray">Published Results</span>
                <span className="text-small font-medium text-dark-gray">
                  {recentResults.filter(r => r.published).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-small text-medium-gray">Published Notices</span>
                <span className="text-small font-medium text-dark-gray">
                  {recentNotices.filter(n => n.published).length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-heading">Recent Results</h2>
              <Link href="/admin/results" className="text-sm text-bright-red hover:text-red-700">
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {recentResults.map((result) => (
                <div key={result.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-dark-gray">
                      {result.teamA} vs {result.teamB}
                    </div>
                    <div className="text-xs text-medium-gray">
                      {new Date(result.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-dark-gray">
                    {result.scoreA !== null && result.scoreB !== null 
                      ? `${result.scoreA} - ${result.scoreB}` 
                      : "TBD"
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-heading">Recent Notices</h2>
              <Link href="/admin/notices" className="text-sm text-bright-red hover:text-red-700">
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {recentNotices.map((notice) => (
                <div key={notice.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-dark-gray line-clamp-2">
                    {notice.title}
                  </div>
                  <div className="text-xs text-medium-gray mt-1">
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-heading">Recent Form Submissions</h2>
              <Link href="/api/export/submissions" className="text-sm text-bright-red hover:text-red-700">
                Export CSV →
              </Link>
            </div>
            <div className="space-y-3">
              {recentSubmissions.map((s) => {
                const payload = s.data as Record<string, unknown>;
                const primary = (payload.name || payload.teamName || "Submission");
                const secondary = (payload.district || payload.category || "");
                return (
                  <div key={s.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-dark-gray">
                        {String(primary)}
                      </div>
                      <div className="text-xs text-medium-gray">
                        {formKeyToTitle[s.formKey]}{secondary ? ` • ${String(secondary)}` : ""}
                      </div>
                    </div>
                    <div className="text-xs text-medium-gray">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


