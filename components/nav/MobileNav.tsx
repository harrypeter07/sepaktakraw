"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const primaryItems = [
  { href: "/", label: "Home" },
  { href: "/results", label: "Results" },
  { href: "/districts", label: "Districts" },
  { href: "/events", label: "Events" },
];

const secondaryItems = [
  { href: "/notices", label: "Notices" },
  { href: "/elections", label: "Elections" },
  { href: "/history", label: "History" },
  { href: "/rules", label: "Rules" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-dark-gray">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 touch-target focus:ring-2 focus:ring-bright-red focus:ring-offset-2"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto h-[calc(100vh-80px)]">
          {/* Primary Navigation */}
          <div>
            <h3 className="text-sm sm:text-base font-medium text-gray-600 uppercase tracking-wider mb-3 sm:mb-4">
              Main Pages
            </h3>
            <nav className="space-y-1">
              {primaryItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "block px-3 sm:px-4 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition-colors duration-200 touch-target",
                      isActive 
                        ? 'bg-bright-red text-white shadow-sm' 
                        : 'text-dark-gray hover:bg-gray-100 hover:text-bright-red'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Secondary Navigation */}
          <div>
            <h3 className="text-sm sm:text-base font-medium text-gray-600 uppercase tracking-wider mb-3 sm:mb-4">
              More Options
            </h3>
            <nav className="space-y-1">
              {secondaryItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "block px-3 sm:px-4 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition-colors duration-200 touch-target",
                      isActive 
                        ? 'bg-bright-red text-white shadow-sm' 
                        : 'text-dark-gray hover:bg-gray-100 hover:text-bright-red'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 sm:pt-6 border-t border-gray-200">
            <h3 className="text-sm sm:text-base font-medium text-gray-600 uppercase tracking-wider mb-3 sm:mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href="/contact"
                onClick={onClose}
                className="block w-full px-4 sm:px-6 py-3 sm:py-4 bg-bright-red text-white text-center rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 touch-target text-base sm:text-lg"
              >
                Contact Us
              </Link>
              <Link
                href="/elections"
                onClick={onClose}
                className="block w-full px-4 sm:px-6 py-3 sm:py-4 bg-orange text-white text-center rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200 touch-target text-base sm:text-lg"
              >
                View Elections
              </Link>
            </div>
          </div>

          {/* Additional Info */}
          <div className="pt-4 sm:pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-500 mb-2">
                Maharashtra Sepaktakraw Association
              </p>
              <p className="text-xs text-gray-400">
                Promoting traditional sports across Maharashtra
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
