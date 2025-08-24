import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminNoticesPage() {
  const notices = await prisma.notice.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Notice Management</h1>
        <Link
          href="/admin/notices/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Notice
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
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
                    <div className="text-sm font-medium text-gray-900">
                      {notice.title}
                    </div>
                    <div className="text-sm text-gray-500 line-clamp-2">
                      {notice.body}
                    </div>
                    {notice.fileUrl && (
                      <div className="text-xs text-blue-600 mt-1">
                        📎 Has attachment
                      </div>
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
                    notice.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {notice.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(notice.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/admin/notices/${notice.id}/edit`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/notices/${notice.slug}`}
                    className="text-green-600 hover:text-green-900 mr-4"
                  >
                    View
                  </Link>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {notices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No notices found.</p>
        </div>
      )}
    </section>
  );
}
