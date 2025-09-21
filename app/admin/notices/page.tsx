import { db } from "@/lib/data";
import Link from "next/link";
import { NoticeActions } from "./NoticeActions";

export const dynamic = "force-dynamic";

export default async function AdminNotices() {
  // Fetch all notices from database
  const notices = await db.getNotices();

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
                <th className="mobile-table-header text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notice
                </th>
                <th className="mobile-table-header text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="mobile-table-header text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="mobile-table-header text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attachments
                </th>
                <th className="mobile-table-header text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="mobile-table-header text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notices.map((notice) => (
                <tr key={notice.id} className="hover:bg-gray-50">
                  <td className="mobile-table-cell">
                    <div>
                      <div className="mobile-text-sm font-medium text-gray-900 mb-1">
                        {notice.title}
                      </div>
                      <div className="mobile-text-xs text-gray-500 line-clamp-2">
                        {notice.body}
                      </div>
                      {notice.priority === 'HIGH' && (
                        <span className="mobile-badge-sm bg-red-100 text-red-800 mt-1">
                          High Priority
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="mobile-table-cell whitespace-nowrap">
                    <span className="mobile-badge-sm bg-blue-100 text-blue-800 font-semibold">
                      {notice.category}
                    </span>
                  </td>
                  <td className="mobile-table-cell whitespace-nowrap">
                    <span className={`mobile-badge-sm font-semibold ${
                      notice.published 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {notice.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="mobile-table-cell whitespace-nowrap">
                    {notice.attachments && notice.attachments.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {notice.attachments.slice(0, 2).map((attachment, index) => (
                          <span
                            key={index}
                            className="mobile-badge-sm bg-gray-100 text-gray-700"
                          >
                            📎 {attachment.split('.').pop()}
                          </span>
                        ))}
                        {notice.attachments.length > 2 && (
                          <span className="mobile-text-xs text-gray-500">
                            +{notice.attachments.length - 2} more
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="mobile-text-xs text-gray-400">None</span>
                    )}
                  </td>
                  <td className="mobile-table-cell whitespace-nowrap mobile-text-xs text-gray-900">
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </td>
                  <td className="mobile-table-cell whitespace-nowrap mobile-text-xs font-medium">
                    <NoticeActions noticeId={notice.id} />
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
