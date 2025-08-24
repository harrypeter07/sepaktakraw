"use client";
import Link from "next/link";
import Image from "next/image";
import { MainNav } from "@/components/nav/MainNav";

export function GovHeader() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <Image 
              src="/mskt-text-logo.svg" 
              alt="MSKT Logo" 
              width={80} 
              height={32}
              className="w-20 h-8"
            />
          </div>
          <div className="hidden sm:block">
            <Link href="/" className="font-semibold text-gray-900 text-lg">Maharashtra Sepaktakraw Association</Link>
            <div className="text-xs text-gray-600">Registered Sports Federation</div>
          </div>
        </div>
        <MainNav />
      </div>
    </header>
  );
}


