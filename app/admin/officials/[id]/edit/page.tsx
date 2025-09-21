"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditOfficialPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState<any>({});
  const [districts, setDistricts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`/api/officials/${id}`).then(r => r.json()),
      fetch('/api/districts').then(r => r.json()),
    ]).then(([o, d]) => {
      if (!o) throw new Error('Not found');
      setForm({ name: o.name || '', position: o.position || '', email: o.email || '', phone: o.phone || '', districtId: o.districtId ?? '' });
      setDistricts(d);
    }).catch(() => setError('Failed to load')).finally(() => setLoading(false));
  }, [id]);

  function change<K extends keyof typeof form>(k: K, v: any) { setForm((f: any) => ({ ...f, [k]: v })); }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const body = { ...form, districtId: form.districtId === '' ? null : Number(form.districtId) };
    const res = await fetch(`/api/officials/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) return setError('Failed to save');
    router.push('/admin/officials');
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <section className="py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Official</h1>
      <form onSubmit={save} className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input className="w-full border rounded px-3 py-2" value={form.name} onChange={e => change('name', e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Position</label>
            <input className="w-full border rounded px-3 py-2" value={form.position} onChange={e => change('position', e.target.value)} required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input className="w-full border rounded px-3 py-2" value={form.email} onChange={e => change('email', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input className="w-full border rounded px-3 py-2" value={form.phone} onChange={e => change('phone', e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">District</label>
          <select className="w-full border rounded px-3 py-2" value={form.districtId} onChange={e => change('districtId', e.target.value === '' ? '' : Number(e.target.value))}>
            <option value="">None</option>
            {districts.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          <button type="button" className="border px-4 py-2 rounded" onClick={() => router.push('/admin/officials')}>Cancel</button>
        </div>
      </form>
    </section>
  );
}


