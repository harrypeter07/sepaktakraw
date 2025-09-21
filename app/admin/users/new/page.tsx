"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewUserPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("VIEWER");
  const [districtId, setDistrictId] = useState<number | "">("");
  const [districts, setDistricts] = useState<{ id: number; name: string }[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/districts").then(r => r.json()).then(setDistricts).catch(() => setDistricts([]));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      const res = await fetch('/api/users', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, role, districtId: districtId === '' ? null : Number(districtId) })
      });
      if (!res.ok) throw new Error('Failed to create user');
      router.push('/admin/users');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to save');
    } finally { setIsSaving(false); }
  }

  return (
    <section className="py-8">
      <h1 className="text-2xl font-bold mb-6">Add User</h1>
      <form onSubmit={submit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input className="w-full border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input className="w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select className="w-full border rounded px-3 py-2" value={role} onChange={e => setRole(e.target.value)}>
              <option>SUPER_ADMIN</option>
              <option>STATE_ADMIN</option>
              <option>DISTRICT_ADMIN</option>
              <option>EDITOR</option>
              <option>VIEWER</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">District</label>
            <select className="w-full border rounded px-3 py-2" value={districtId} onChange={e => setDistrictId(e.target.value === '' ? '' : Number(e.target.value))}>
              <option value="">None</option>
              {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="flex gap-2">
          <button type="submit" disabled={isSaving} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">{isSaving ? 'Saving...' : 'Save'}</button>
          <button type="button" className="border px-4 py-2 rounded" onClick={() => router.push('/admin/users')}>Cancel</button>
        </div>
      </form>
    </section>
  );
}


