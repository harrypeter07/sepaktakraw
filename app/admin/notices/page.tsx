// import { prisma } from "@/lib/prisma"; // Commented out for future database implementation
import { data } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminNotices() {
  // Fetch all notices
  // TODO: Replace with Prisma query when database is ready
  // const notices = await prisma.notice.findMany({
  //   orderBy: {
  //     createdAt: "desc"
  //   }
  // });

  // Using mock data instead
  const notices = data.notices
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Notice Management</h1>
        <Link
          href="/admin/notices/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Notice
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attachments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notices.map((notice) => (
                <tr key={notice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {notice.title}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-2">
                        {notice.body}
                      </div>
                      {notice.priority === 'HIGH' && (
                        <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-2">
                          High Priority
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {notice.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      notice.published 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {notice.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {notice.attachments && notice.attachments.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {notice.attachments.slice(0, 2).map((attachment, index) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            📎 {attachment.split('.').pop()}
                          </span>
                        ))}
                        {notice.attachments.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{notice.attachments.length - 2} more
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/notices/${notice.id}`}
                        className="text-green-600 hover:text-green-900"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/notices/${notice.id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => {
                          // TODO: Implement delete functionality
                          if (confirm("Are you sure you want to delete this notice?")) {
                            // Delete logic here
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {notices.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No notices found</div>
          <p className="text-gray-400 mt-2">Get started by creating your first notice</p>
        </div>
      )}
    </section>
  );
}
