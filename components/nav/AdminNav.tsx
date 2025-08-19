"use client";
import Link from "next/link";

const items = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/results", label: "Results" },
  { href: "/admin/districts", label: "Districts" },
  { href: "/admin/officials", label: "Officials" },
  { href: "/admin/forms", label: "Forms" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/notices", label: "Notices" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/elections", label: "Elections" },
  { href: "/admin/compliance", label: "Compliance" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/audit", label: "Audit" },
];

export function AdminNav() {
  return (
    <nav aria-label="Admin">
      <ul className="flex gap-3 text-sm">
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="hover:underline">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}


