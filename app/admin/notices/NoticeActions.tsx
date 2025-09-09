"use client";

import Link from "next/link";

type NoticeActionsProps = {
  noticeId: number | string;
};

export function NoticeActions({ noticeId }: NoticeActionsProps) {
  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this notice?")) return;
    fetch(`/api/notices/${noticeId}`, { method: "DELETE" })
      .then(() => location.reload())
      .catch(() => alert("Failed to delete notice"));
  };

  return (
    <div className="flex space-x-1 sm:space-x-2">
      <Link
        href={`/notices/${noticeId}`}
        className="text-green-600 hover:text-green-900"
      >
        View
      </Link>
      <Link
        href={`/admin/notices/${noticeId}/edit`}
        className="text-blue-600 hover:text-blue-900"
      >
        Edit
      </Link>
      <button className="text-red-600 hover:text-red-900" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}


