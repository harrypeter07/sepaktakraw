import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminAuditPage() {
  const auditLogs = await prisma.auditLog.findMany({
    include: {
      user: true,
    },
    orderBy: { createdAt: "desc" },
    take: 100, // Limit to last 100 entries
  });

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Audit Log</h1>
        <div className="text-sm text-gray-500">
          Last 100 activities
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {log.user?.email || "Unknown User"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {log.userId || "No ID"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    log.action.includes("CREATE") ? "bg-green-100 text-green-800" :
                    log.action.includes("UPDATE") ? "bg-blue-100 text-blue-800" :
                    log.action.includes("DELETE") ? "bg-red-100 text-red-800" :
                    log.action.includes("LOGIN") ? "bg-purple-100 text-purple-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>{log.entity}</div>
                  {log.entityId && (
                    <div className="text-xs text-gray-500">ID: {log.entityId}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {log.ip || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {auditLogs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Audit Logs</h3>
          <p className="text-gray-500">
            Audit logs will appear here as users perform actions in the system.
          </p>
        </div>
      )}

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Audit Summary</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {auditLogs.filter(log => log.action.includes("CREATE")).length}
            </div>
            <div className="text-sm text-gray-600">Create Actions</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {auditLogs.filter(log => log.action.includes("UPDATE")).length}
            </div>
            <div className="text-sm text-gray-600">Update Actions</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-red-600 mb-1">
              {auditLogs.filter(log => log.action.includes("DELETE")).length}
            </div>
            <div className="text-sm text-gray-600">Delete Actions</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {auditLogs.filter(log => log.action.includes("LOGIN")).length}
            </div>
            <div className="text-sm text-gray-600">Login Actions</div>
          </div>
        </div>
      </div>
    </section>
  );
}
