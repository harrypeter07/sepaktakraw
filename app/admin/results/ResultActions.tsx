"use client";

import Link from "next/link";

type ResultActionsProps = {
  resultId: number | string;
};

export function ResultActions({ resultId }: ResultActionsProps) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this result?")) {
      // TODO: Implement delete logic via API when backend is ready
    }
  };

  return (
    <div className="flex space-x-2">
      <Link
        href={`/admin/results/${resultId}/edit`}
        className="text-blue-600 hover:text-blue-900"
      >
        Edit
      </Link>
      <button className="text-red-600 hover:text-red-900" onClick={() => {
        handleDelete();
        fetch(`/api/results/${resultId}`, { method: 'DELETE' })
          .then(() => location.reload())
          .catch(() => alert('Failed to delete result'));
      }}>
        Delete
      </button>
    </div>
  );
}


