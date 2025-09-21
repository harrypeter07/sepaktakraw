"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewResultPage() {
  const router = useRouter();
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [scoreA, setScoreA] = useState<number | "">("");
  const [scoreB, setScoreB] = useState<number | "">("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [level, setLevel] = useState("STATE");
  const [stage, setStage] = useState("");
  const [districtId, setDistrictId] = useState<number | "">("");
  const [published, setPublished] = useState(true);
  const [districts, setDistricts] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/districts").then(r => r.json()).then(setDistricts).catch(() => setDistricts([]));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      const res = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamA, teamB,
          scoreA: scoreA === "" ? null : Number(scoreA),
          scoreB: scoreB === "" ? null : Number(scoreB),
          date: new Date(date).toISOString(),
          venue: venue || null,
          level,
          stage: stage || null,
          districtId: districtId === "" ? null : Number(districtId),
          published,
          tags: [],
        }),
      });
      if (!res.ok) throw new Error("Failed to create result");
      router.push("/admin/results");
    } catch (e: any) {
      setError(e.message || "Failed to save");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="py-8">
      <h1 className="text-2xl font-bold mb-6">Add Match Result</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Team A</label>
            <input className="w-full border rounded px-3 py-2" value={teamA} onChange={e => setTeamA(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Team B</label>
            <input className="w-full border rounded px-3 py-2" value={teamB} onChange={e => setTeamB(e.target.value)} required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Score A</label>
            <input type="number" className="w-full border rounded px-3 py-2" value={scoreA} onChange={e => setScoreA(e.target.value === "" ? "" : Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Score B</label>
            <input type="number" className="w-full border rounded px-3 py-2" value={scoreB} onChange={e => setScoreB(e.target.value === "" ? "" : Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input type="date" className="w-full border rounded px-3 py-2" value={date} onChange={e => setDate(e.target.value)} required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Venue</label>
            <input className="w-full border rounded px-3 py-2" value={venue} onChange={e => setVenue(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Level</label>
            <select className="w-full border rounded px-3 py-2" value={level} onChange={e => setLevel(e.target.value)}>
              <option>STATE</option>
              <option>DISTRICT</option>
              <option>NATIONAL</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stage</label>
            <input className="w-full border rounded px-3 py-2" value={stage} onChange={e => setStage(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">District</label>
            <select className="w-full border rounded px-3 py-2" value={districtId} onChange={e => setDistrictId(e.target.value === "" ? "" : Number(e.target.value))}>
              <option value="">None</option>
              {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input id="published" type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} />
            <label htmlFor="published" className="text-sm">Published</label>
          </div>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="flex gap-2">
          <button type="submit" disabled={isSaving} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">{isSaving ? "Saving..." : "Save"}</button>
          <button type="button" className="border px-4 py-2 rounded" onClick={() => router.push("/admin/results")}>Cancel</button>
        </div>
      </form>
    </section>
  );
}


