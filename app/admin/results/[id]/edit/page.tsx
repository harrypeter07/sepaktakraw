"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditResultPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState<any>({});
  const [districts, setDistricts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`/api/results/${id}`).then(r => r.json()),
      fetch(`/api/districts`).then(r => r.json()),
    ]).then(([res, dists]) => {
      setForm({
        teamA: res.teamA || "",
        teamB: res.teamB || "",
        scoreA: res.scoreA ?? "",
        scoreB: res.scoreB ?? "",
        date: res.date ? String(res.date).slice(0, 10) : "",
        venue: res.venue || "",
        level: res.level || "STATE",
        stage: res.stage || "",
        districtId: res.districtId ?? "",
        published: Boolean(res.published),
      });
      setDistricts(dists);
    }).catch(() => setError("Failed to load")).finally(() => setLoading(false));
  }, [id]);

  function change<K extends keyof typeof form>(key: K, value: string | number | boolean) {
    setForm((f: typeof form) => ({ ...f, [key]: value }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const body = {
      ...form,
      scoreA: form.scoreA === "" ? null : Number(form.scoreA),
      scoreB: form.scoreB === "" ? null : Number(form.scoreB),
      date: form.date ? new Date(form.date).toISOString() : new Date().toISOString(),
      venue: form.venue || null,
      stage: form.stage || null,
      districtId: form.districtId === "" ? null : Number(form.districtId),
    };
    const res = await fetch(`/api/results/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) return setError('Failed to save');
    router.push('/admin/results');
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <section className="py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Result</h1>
      <form onSubmit={save} className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Team A</label>
            <input className="w-full border rounded px-3 py-2" value={form.teamA} onChange={e => change('teamA', e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Team B</label>
            <input className="w-full border rounded px-3 py-2" value={form.teamB} onChange={e => change('teamB', e.target.value)} required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Score A</label>
            <input type="number" className="w-full border rounded px-3 py-2" value={form.scoreA} onChange={e => change('scoreA', e.target.value === '' ? '' : Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Score B</label>
            <input type="number" className="w-full border rounded px-3 py-2" value={form.scoreB} onChange={e => change('scoreB', e.target.value === '' ? '' : Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input type="date" className="w-full border rounded px-3 py-2" value={form.date} onChange={e => change('date', e.target.value)} required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Venue</label>
            <input className="w-full border rounded px-3 py-2" value={form.venue} onChange={e => change('venue', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Level</label>
            <select className="w-full border rounded px-3 py-2" value={form.level} onChange={e => change('level', e.target.value)}>
              <option>STATE</option>
              <option>DISTRICT</option>
              <option>NATIONAL</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stage</label>
            <input className="w-full border rounded px-3 py-2" value={form.stage} onChange={e => change('stage', e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">District</label>
            <select className="w-full border rounded px-3 py-2" value={form.districtId} onChange={e => change('districtId', e.target.value === '' ? '' : Number(e.target.value))}>
              <option value="">None</option>
              {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input id="published" type="checkbox" checked={form.published} onChange={e => change('published', e.target.checked)} />
            <label htmlFor="published" className="text-sm">Published</label>
          </div>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          <button type="button" className="border px-4 py-2 rounded" onClick={() => router.push('/admin/results')}>Cancel</button>
        </div>
      </form>
    </section>
  );
}


