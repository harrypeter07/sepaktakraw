"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, lazy, Suspense } from "react";
import { MainNav } from "@/components/nav/MainNav";

// Lazy load the mobile navigation component
const MobileNav = lazy(() => import("@/components/nav/MobileNav").then(mod => ({ default: mod.MobileNav })));

// Loading component for mobile nav
function MobileNavLoading() {
  return (
    <div className="lg:hidden">
      <div className="w-6 h-6 animate-pulse bg-gray-300 rounded"></div>
    </div>
  );
}

export function GovHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-30">
      <div className="container-content py-3 sm:py-4 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex-shrink-0">
            <Link href="/" className="block touch-target">
              <Image
                src="/mskt-text-logo.svg"
                alt="MSKT Logo"
                width={70}
                height={28}
                className="w-14 h-5 sm:w-16 sm:h-6"
                priority
              />
            </Link>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm sm:text-base lg:text-lg font-bold text-dark-gray leading-tight">
              Maharashtra Sepaktakraw Association
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 hidden lg:block">
              Official Portal
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <MainNav />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 touch-target focus:ring-2 focus:ring-bright-red focus:ring-offset-2"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 flex flex-col justify-center items-center">
            <span 
              className={`block w-4 sm:w-5 h-0.5 bg-dark-gray transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''
              }`}
            ></span>
            <span 
              className={`block w-4 sm:w-5 h-0.5 bg-dark-gray transition-all duration-300 mt-1 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span 
              className={`block w-4 sm:w-5 h-0.5 bg-dark-gray transition-all duration-300 mt-1 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation - Lazy Loaded */}
      <Suspense fallback={<MobileNavLoading />}>
        {isMobileMenuOpen && (
          <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </Suspense>
    </header>
  );
}


