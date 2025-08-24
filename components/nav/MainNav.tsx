"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home" },
  { href: "/results", label: "Results" },
  { href: "/notices", label: "Notices" },
  { href: "/districts", label: "Districts" },
  { href: "/events", label: "Events" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ul className="flex gap-3 md:gap-4 text-sm">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-bright-red text-white shadow-sm' 
                    : 'text-dark-gray hover:text-bright-red hover:bg-gray-50'
                }`}
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


