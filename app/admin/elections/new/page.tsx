"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewElectionPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("GENERAL");
  const [published, setPublished] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      const res = await fetch("/api/elections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          type,
          published,
          status: "UPCOMING"
        }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Failed to create election");
      }

      router.push("/admin/elections");
    } catch (err: any) {
      setError(err.message || "Failed to save");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Election</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input 
            className="w-full border rounded px-3 py-2" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
            placeholder="e.g., Elections of Office Bearers & Executive Members 2024-2028"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            className="w-full border rounded px-3 py-2 h-32" 
            value={description} 
            onChange={e => setDescription(e.target.value)}
            placeholder="Detailed description of the election..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input 
              type="datetime-local" 
              className="w-full border rounded px-3 py-2" 
              value={startDate} 
              onChange={e => setStartDate(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input 
              type="datetime-local" 
              className="w-full border rounded px-3 py-2" 
              value={endDate} 
              onChange={e => setEndDate(e.target.value)} 
              required 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select 
            className="w-full border rounded px-3 py-2" 
            value={type} 
            onChange={e => setType(e.target.value)}
          >
            <option value="GENERAL">General Election</option>
            <option value="BY_ELECTION">By-Election</option>
            <option value="SPECIAL">Special Election</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input 
            id="published" 
            type="checkbox" 
            checked={published} 
            onChange={e => setPublished(e.target.checked)} 
          />
          <label htmlFor="published" className="text-sm text-gray-700">Published</label>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <div className="flex gap-2">
          <button 
            type="submit" 
            disabled={isSaving} 
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isSaving ? "Creating..." : "Create Election"}
          </button>
          <button 
            type="button" 
            className="border px-4 py-2 rounded" 
            onClick={() => router.push("/admin/elections")}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
