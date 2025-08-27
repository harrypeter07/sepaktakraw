"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MainNav } from "@/components/nav/MainNav";
import { MobileNav } from "@/components/nav/MobileNav";

export function GovHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="container-content py-3 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <Image 
              src="/mskt-text-logo.svg" 
              alt="MSKT Logo" 
              width={70} 
              height={28}
              className="w-16 h-6"
            />
          </div>
          <div className="hidden sm:block">
            <Link href="/" className="font-bold text-dark-gray text-base md:text-lg hover:text-bright-red transition-colors duration-200">
              Maharashtra Sepaktakraw Association
            </Link>
            <div className="text-caption">Registered Sports Federation</div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <MainNav />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`block w-5 h-0.5 bg-dark-gray transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-dark-gray transition-all duration-300 mt-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-dark-gray transition-all duration-300 mt-1 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}


