import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminFormsPage() {
  const forms = await prisma.formDef.findMany({
    include: {
      _count: {
        select: {
          submissions: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Form Management</h1>
        <Link
          href="/admin/forms/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Form
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {forms.map((form) => (
          <div key={form.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {form.title}
              </h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                form.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              }`}>
                {form.active ? "Active" : "Inactive"}
              </span>
            </div>
            
            {form.desc && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {form.desc}
              </p>
            )}

            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-1">Form Key:</div>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                {form.key}
              </code>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {form._count.submissions}
                </div>
                <div className="text-gray-500">Submissions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Object.keys(form.schema as object).length}
                </div>
                <div className="text-gray-500">Fields</div>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/admin/forms/${form.id}/edit`}
                className="flex-1 bg-blue-600 text-white text-center px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                Edit
              </Link>
              <Link
                href={`/admin/forms/${form.id}/submissions`}
                className="flex-1 bg-green-600 text-white text-center px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors"
              >
                View Submissions
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Created: {new Date(form.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {forms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No forms found.</p>
        </div>
      )}
    </section>
  );
}
