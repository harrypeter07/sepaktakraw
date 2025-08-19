"use client";
import Link from "next/link";

const items = [
  { href: "/notices", label: "Notices" },
  { href: "/results", label: "Results" },
  { href: "/news", label: "News" },
  { href: "/rules", label: "Rules" },
  { href: "/events", label: "Events" },
  { href: "/districts", label: "Districts" },
  { href: "/contact", label: "Contact" },
];

export function MainNav() {
  return (
    <nav aria-label="Primary">
      <ul className="flex gap-4 text-sm">
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


