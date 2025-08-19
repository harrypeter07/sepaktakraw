import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [districts, results, users] = await Promise.all([
    prisma.district.count(),
    prisma.result.count(),
    prisma.user.count(),
  ]);
  return (
    <section className="py-8">
      <h1 className="text-xl font-semibold mb-6">Admin Dashboard</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="border rounded p-4"><div className="text-sm text-gray-600">Districts</div><div className="text-2xl font-semibold">{districts}</div></div>
        <div className="border rounded p-4"><div className="text-sm text-gray-600">Results</div><div className="text-2xl font-semibold">{results}</div></div>
        <div className="border rounded p-4"><div className="text-sm text-gray-600">Users</div><div className="text-2xl font-semibold">{users}</div></div>
      </div>
    </section>
  );
}


