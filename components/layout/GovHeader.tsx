"use client";
import Link from "next/link";
import Image from "next/image";
import { MainNav } from "@/components/nav/MainNav";

export function GovHeader() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="container-content py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <Image 
              src="/mskt-text-logo.svg" 
              alt="MSKT Logo" 
              width={70} 
              height={28}
              className="w-18 h-7"
            />
          </div>
          <div className="hidden sm:block">
            <Link href="/" className="font-bold text-dark-gray text-base md:text-lg hover:text-bright-red transition-colors duration-200">
              Maharashtra Sepaktakraw Association
            </Link>
            <div className="text-caption">Registered Sports Federation</div>
          </div>
        </div>
        <MainNav />
      </div>
    </header>
  );
}


