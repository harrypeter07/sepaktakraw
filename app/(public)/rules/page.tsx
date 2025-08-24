import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function RulesPage() {
  const documents = await prisma.staticDoc.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Group documents by section
  const documentsBySection = documents.reduce((acc, doc) => {
    if (!acc[doc.section]) {
      acc[doc.section] = [];
    }
    acc[doc.section].push(doc);
    return acc;
  }, {} as Record<string, typeof documents>);

  const sections = Object.keys(documentsBySection);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Rules & Compliance</h1>
      
      <div className="mb-8">
        <p className="text-lg text-gray-600 max-w-3xl">
          Access official rules, policies, and compliance documents for the Maharashtra Sepaktakraw Association. 
          These documents ensure fair play and maintain the integrity of the sport.
        </p>
      </div>

      {sections.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Documents Available</h3>
          <p className="text-gray-500">Check back later for rules and compliance documents.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 capitalize">
                {section.replace("_", " ")}
              </h2>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documentsBySection[section].map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                          {doc.title}
                        </h3>
                        <div className="text-xs text-gray-500">
                          Uploaded: {new Date(doc.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="ml-2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 capitalize">
                        {doc.section.replace("_", " ")}
                      </span>
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        View
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Additional Information */}
      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">Need Help?</h2>
        <p className="text-blue-800 mb-4">
          If you have questions about the rules or need clarification on any compliance matters, 
          please contact your district officials or the association administration.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/districts"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            Find District Officials
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            Contact Association
          </Link>
        </div>
      </div>
    </section>
  );
}


