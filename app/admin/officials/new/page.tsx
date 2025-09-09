"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewOfficialPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [districtId, setDistrictId] = useState<number | "">("");
  const [districts, setDistricts] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { fetch('/api/districts').then(r => r.json()).then(setDistricts).catch(() => setDistricts([])); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      const res = await fetch('/api/officials', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, position, email: email || null, phone: phone || null, districtId: districtId === '' ? null : Number(districtId) })
      });
      if (!res.ok) throw new Error('Failed to create official');
      router.push('/admin/officials');
    } catch (e: any) { setError(e.message || 'Failed to save'); }
    finally { setIsSaving(false); }
  }

  return (
    <section className="py-8">
      <h1 className="text-2xl font-bold mb-6">Add Official</h1>
      <form onSubmit={submit} className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input className="w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Position</label>
            <input className="w-full border rounded px-3 py-2" value={position} onChange={e => setPosition(e.target.value)} required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input className="w-full border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input className="w-full border rounded px-3 py-2" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">District</label>
          <select className="w-full border rounded px-3 py-2" value={districtId} onChange={e => setDistrictId(e.target.value === '' ? '' : Number(e.target.value))}>
            <option value="">None</option>
            {districts.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="flex gap-2">
          <button type="submit" disabled={isSaving} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">{isSaving ? 'Saving...' : 'Save'}</button>
          <button type="button" className="border px-4 py-2 rounded" onClick={() => router.push('/admin/officials')}>Cancel</button>
        </div>
      </form>
    </section>
  );
}


