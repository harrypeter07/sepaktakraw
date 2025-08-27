"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/NavigationMenu";
import { cn } from "@/lib/utils";

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
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <NavigationMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "block select-none space-y-1 rounded-2xl px-3 py-2 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-bright-red focus:bg-gray-100 focus:text-bright-red",
                    isActive 
                      ? 'bg-bright-red text-white shadow-sm' 
                      : 'text-dark-gray'
                  )}
                >
                  {item.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}


