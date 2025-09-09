"use client";

import Link from "next/link";

type OfficialActionsProps = {
  officialId: number | string;
};

export function OfficialActions({ officialId }: OfficialActionsProps) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this official?")) {
      // TODO: Implement delete logic via API when backend is ready
    }
  };

  return (
    <div className="flex space-x-2">
      <Link
        href={`/admin/officials/${officialId}/edit`}
        className="text-blue-600 hover:text-blue-900"
      >
        Edit
      </Link>
      <button className="text-red-600 hover:text-red-900" onClick={() => {
        handleDelete();
        fetch(`/api/officials/${officialId}`, { method: 'DELETE' })
          .then(() => location.reload())
          .catch(() => alert('Failed to delete official'));
      }}>
        Delete
      </button>
    </div>
  );
}


