"use client";

import Link from "next/link";

type UserActionsProps = {
  userId: string;
};

export function UserActions({ userId }: UserActionsProps) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this user?")) {
      // TODO: Implement delete logic via API when backend is ready
    }
  };

  return (
    <div className="flex space-x-2">
      <Link
        href={`/admin/users/${userId}/edit`}
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


