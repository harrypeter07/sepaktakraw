"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditNoticePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("NEWS");
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/notices/${params.id}`);
        if (!res.ok) throw new Error("Failed to load notice");
        const n = await res.json();
        setTitle(n.title || "");
        setBody(n.body || "");
        setCategory(n.category || "NEWS");
        setPublished(Boolean(n.published));
      } catch (e: any) {
        setError(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`/api/notices/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, category, published }),
      });
      if (!res.ok) throw new Error("Failed to update notice");
      router.push("/admin/notices");
    } catch (e: any) {
      setError(e.message || "Failed to save");
    }
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <section className="py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Notice</h1>
      <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input className="w-full border rounded px-3 py-2" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select className="w-full border rounded px-3 py-2" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="NEWS">NEWS</option>
            <option value="TOURNAMENT">TOURNAMENT</option>
            <option value="TRAINING">TRAINING</option>
            <option value="ANNOUNCEMENT">ANNOUNCEMENT</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
          <textarea className="w-full border rounded px-3 py-2 h-40" value={body} onChange={e => setBody(e.target.value)} required />
        </div>
        <div className="flex items-center gap-2">
          <input id="published" type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} />
          <label htmlFor="published" className="text-sm text-gray-700">Published</label>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          <button type="button" className="border px-4 py-2 rounded" onClick={() => router.push("/admin/notices")}>Cancel</button>
        </div>
      </form>
    </section>
  );
}


