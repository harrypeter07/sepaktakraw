import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminCompliancePage() {
  const staticDocs = await prisma.staticDoc.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Compliance Management</h1>
        <Link
          href="/admin/compliance/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Upload Document
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {staticDocs.map((doc) => (
          <div key={doc.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {doc.title}
              </h3>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                {doc.section}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-2">Section:</div>
              <div className="text-sm font-medium text-gray-900">{doc.section}</div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-2">File:</div>
              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Document
              </a>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/admin/compliance/${doc.id}/edit`}
                className="flex-1 bg-blue-600 text-white text-center px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                Edit
              </Link>
              <button className="flex-1 bg-red-600 text-white text-center px-3 py-2 rounded text-sm hover:bg-red-700 transition-colors">
                Delete
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Uploaded: {new Date(doc.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {staticDocs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Compliance Documents</h3>
          <p className="text-gray-500 mb-6">
            Upload compliance documents, rules, and regulations for the association.
          </p>
          <Link
            href="/admin/compliance/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Upload First Document
          </Link>
        </div>
      )}

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Overview</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">{staticDocs.length}</div>
            <div className="text-sm text-gray-600">Total Documents</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {staticDocs.filter(doc => doc.section === "RULES").length}
            </div>
            <div className="text-sm text-gray-600">Rules</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {staticDocs.filter(doc => doc.section === "POLICIES").length}
            </div>
            <div className="text-sm text-gray-600">Policies</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {staticDocs.filter(doc => doc.section === "FORMS").length}
            </div>
            <div className="text-sm text-gray-600">Forms</div>
          </div>
        </div>
      </div>
    </section>
  );
}
