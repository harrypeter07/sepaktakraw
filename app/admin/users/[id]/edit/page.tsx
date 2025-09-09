"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState<any>({});
  const [districts, setDistricts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`/api/users/${id}`).then(r => r.json()),
      fetch('/api/districts').then(r => r.json()),
    ]).then(([u, d]) => {
      setForm({ email: u.email || '', name: u.name || '', role: u.role || 'VIEWER', districtId: u.districtId ?? '' });
      setDistricts(d);
    }).catch(() => setError('Failed to load')).finally(() => setLoading(false));
  }, [id]);

  function change<K extends keyof typeof form>(k: K, v: any) { setForm((f: any) => ({ ...f, [k]: v })); }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const body = { ...form, districtId: form.districtId === '' ? null : Number(form.districtId) };
    const res = await fetch(`/api/users/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) return setError('Failed to save');
    router.push('/admin/users');
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <section className="py-8">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>
      <form onSubmit={save} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input className="w-full border rounded px-3 py-2" value={form.email} onChange={e => change('email', e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input className="w-full border rounded px-3 py-2" value={form.name} onChange={e => change('name', e.target.value)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select className="w-full border rounded px-3 py-2" value={form.role} onChange={e => change('role', e.target.value)}>
              <option>SUPER_ADMIN</option>
              <option>STATE_ADMIN</option>
              <option>DISTRICT_ADMIN</option>
              <option>EDITOR</option>
              <option>VIEWER</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">District</label>
            <select className="w-full border rounded px-3 py-2" value={form.districtId} onChange={e => change('districtId', e.target.value === '' ? '' : Number(e.target.value))}>
              <option value="">None</option>
              {districts.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          <button type="button" className="border px-4 py-2 rounded" onClick={() => router.push('/admin/users')}>Cancel</button>
        </div>
      </form>
    </section>
  );
}


