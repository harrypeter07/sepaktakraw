import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CompliancePage() {
  const documents = await prisma.staticDoc.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Filter documents by compliance-related sections
  const complianceDocs = documents.filter(doc => 
    doc.section === "POLICIES" || 
    doc.section === "FORMS" || 
    doc.section === "GUIDELINES"
  );

  // Group by section
  const docsBySection = complianceDocs.reduce((acc, doc) => {
    if (!acc[doc.section]) {
      acc[doc.section] = [];
    }
    acc[doc.section].push(doc);
    return acc;
  }, {} as Record<string, typeof complianceDocs>);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Compliance & Policies</h1>
      
      <div className="mb-8">
        <p className="text-lg text-gray-600 max-w-3xl">
          The Maharashtra Sepaktakraw Association is committed to maintaining high standards of compliance, 
          transparency, and ethical practices. Access our policies, forms, and guidelines here.
        </p>
      </div>

      {/* Compliance Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <div className="text-blue-600 mb-3">
            <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Policies</h3>
          <p className="text-blue-700 text-sm">
            Official association policies and procedures
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-6 text-center">
          <div className="text-green-600 mb-3">
            <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-green-900 mb-2">Forms</h3>
          <p className="text-green-700 text-sm">
            Official forms and applications
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 text-center">
          <div className="text-purple-600 mb-3">
            <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-purple-900 mb-2">Guidelines</h3>
          <p className="text-purple-700 text-sm">
            Best practices and guidelines
          </p>
        </div>
      </div>

      {/* Documents by Section */}
      {Object.keys(docsBySection).length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Compliance Documents</h3>
          <p className="text-gray-500">Compliance documents will be available here soon.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(docsBySection).map(([section, docs]) => (
            <div key={section} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 capitalize">
                {section.replace("_", " ")}
              </h2>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {docs.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="mb-3">
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {doc.title}
                      </h3>
                      <div className="text-xs text-gray-500">
                        Last updated: {new Date(doc.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 capitalize">
                        {section.replace("_", " ")}
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
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Compliance Information */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Standards</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Regular policy updates and reviews
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Transparent documentation practices
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Regular compliance audits
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Training and awareness programs
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Compliance</h2>
          <p className="text-sm text-gray-600 mb-4">
            For questions about compliance, policies, or to report concerns:
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">📧</span>
              <span>compliance@mskt.org</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">📞</span>
              <span>+91-XXX-XXXX-XXXX</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">📍</span>
              <span>Association Office</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">Additional Resources</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/rules"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            View Rules
          </Link>
          <Link
            href="/districts"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            District Information
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
