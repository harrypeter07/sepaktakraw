// import { prisma } from "@/lib/prisma"; // Commented out for future database implementation
import { getFormsWithSubmissionCounts } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminForms() {
  // Fetch all form definitions with submission counts
  // TODO: Replace with Prisma query when database is ready
  // const forms = await prisma.formDef.findMany({
  //   include: {
  //     _count: {
  //       select: {
  //         submissions: true
  //       }
  //     }
  //   },
  //   orderBy: {
  //     createdAt: "desc"
  //   }
  // });

  // Using mock data instead
  const forms = getFormsWithSubmissionCounts()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Form Management</h1>
        <Link
          href="/admin/forms/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Form
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((form) => (
          <div key={form.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {form.title}
                </h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  form.active 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {form.active ? "Active" : "Inactive"}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-3">
                <div className="mb-1">
                  <span className="font-medium">Key:</span> {form.key}
                </div>
                <div className="mb-1">
                  <span className="font-medium">Fields:</span> {form.schema ? Object.keys(form.schema).length : 0}
                </div>
                <div className="mb-1">
                  <span className="font-medium">Submissions:</span> {form._count.submissions}
                </div>
              </div>
              
              {form.desc && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {form.desc}
                </p>
              )}
              
              <div className="space-y-2 mb-4">
                {form.schema && (
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Schema Fields:</span>
                    <div className="mt-1 grid grid-cols-2 gap-1">
                      {Object.keys(form.schema).slice(0, 4).map((field) => (
                        <span key={field} className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {field}
                        </span>
                      ))}
                      {Object.keys(form.schema).length > 4 && (
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                          +{Object.keys(form.schema).length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Link
                    href={`/admin/forms/${form.id}/edit`}
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm hover:underline"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/admin/forms/${form.id}/submissions`}
                    className="text-green-600 hover:text-green-800 font-semibold text-sm hover:underline"
                  >
                    View Submissions
                  </Link>
                </div>
                
                <div className="text-xs text-gray-500">
                  {new Date(form.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {forms.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No forms found</div>
          <p className="text-gray-400 mt-2">Get started by creating your first form</p>
        </div>
      )}
    </section>
  );
}
