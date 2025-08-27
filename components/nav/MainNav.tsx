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

// Primary items shown on medium screens
const primaryItems = [
  { href: "/", label: "Home" },
  { href: "/results", label: "Results" },
  { href: "/districts", label: "Districts" },
  { href: "/events", label: "Events" },
];

// All items shown on large screens
const allItems = [
  { href: "/", label: "Home" },
  { href: "/results", label: "Results" },
  { href: "/notices", label: "Notices" },
  { href: "/districts", label: "Districts" },
  { href: "/events", label: "Events" },
  { href: "/elections", label: "Elections" },
  { href: "/history", label: "History" },
  { href: "/rules", label: "Rules" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Medium screens: Show primary items only */}
        <div className="hidden md:flex lg:hidden space-x-1">
          {primaryItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "block select-none space-y-1 rounded-2xl px-3 py-2 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-bright-red focus:bg-gray-100 focus:text-bright-red",
                      isActive 
                        ? 'bg-bright-red text-white shadow-sm' 
                        : 'text-dark-gray'
                    )}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </div>

        {/* Large screens: Show all items */}
        <div className="hidden lg:flex space-x-1">
          {allItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "block select-none space-y-1 rounded-2xl px-3 py-2 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-bright-red focus:bg-gray-100 focus:text-bright-red",
                      isActive 
                        ? 'bg-bright-red text-white shadow-sm' 
                        : 'text-dark-gray'
                    )}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}


