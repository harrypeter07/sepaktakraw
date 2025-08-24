"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ul className="flex gap-4 text-sm">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link 
                href={item.href} 
                className={isActive ? 'nav-link-active' : 'nav-link'}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}


