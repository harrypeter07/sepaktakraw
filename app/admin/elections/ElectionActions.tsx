"use client";

import Link from "next/link";

type ElectionActionsProps = {
  electionId: number;
};

export function ElectionActions({ electionId }: ElectionActionsProps) {
  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this election?")) return;
    fetch(`/api/elections/${electionId}`, { method: "DELETE" })
      .then(() => location.reload())
      .catch(() => alert("Failed to delete election"));
  };

  return (
    <div className="flex space-x-2">
      <Link
        href={`/elections/${electionId}`}
        className="text-green-600 hover:text-green-900"
      >
        View
      </Link>
      <Link
        href={`/admin/elections/${electionId}/edit`}
        className="text-blue-600 hover:text-blue-900"
      >
        Edit
      </Link>
      <Link
        href={`/admin/elections/${electionId}/candidates`}
        className="text-purple-600 hover:text-purple-900"
      >
        Candidates
      </Link>
      <button className="text-red-600 hover:text-red-900" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
