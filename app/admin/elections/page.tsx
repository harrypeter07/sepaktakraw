import Link from "next/link";
import { db } from "@/lib/data";
import { ElectionActions } from "./ElectionActions";

export const dynamic = "force-dynamic";

export default async function AdminElectionsPage() {
  // Fetch all elections from database
  const elections = await db.getElections();
  
  // Calculate statistics
  const activeElections = elections.filter(e => e.status === "ACTIVE").length;
  const completedElections = elections.filter(e => e.status === "COMPLETED").length;
  const totalCandidates = elections.reduce((sum, e) => sum + e._count.candidates, 0);

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Election Management</h1>
        <Link
          href="/admin/elections/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Election
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="text-center p-4 border rounded-lg">
          <div className="text-2xl font-bold text-blue-600 mb-1">{activeElections}</div>
          <div className="text-sm text-gray-600">Active Elections</div>
        </div>
        <div className="text-center p-4 border rounded-lg">
          <div className="text-2xl font-bold text-green-600 mb-1">{completedElections}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="text-center p-4 border rounded-lg">
          <div className="text-2xl font-bold text-purple-600 mb-1">{totalCandidates}</div>
          <div className="text-sm text-gray-600">Total Candidates</div>
        </div>
      </div>

      {/* Elections List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Elections</h3>
        </div>
        
        {elections.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Election
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Votes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {elections.map((election) => (
                  <tr key={election.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {election.title}
                        </div>
                        {election.description && (
                          <div className="text-sm text-gray-500 line-clamp-2">
                            {election.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {election.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        election.status === "ACTIVE" 
                          ? "bg-green-100 text-green-800"
                          : election.status === "COMPLETED"
                          ? "bg-gray-100 text-gray-800"
                          : election.status === "UPCOMING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {election.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div>Start: {new Date(election.startDate).toLocaleDateString()}</div>
                        <div>End: {new Date(election.endDate).toLocaleDateString()}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {election._count.candidates}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {election._count.votes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <ElectionActions electionId={election.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Elections Found</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first election.</p>
            <Link
              href="/admin/elections/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Election
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
