"use client";
import Link from "next/link";
import { MainNav } from "@/components/nav/MainNav";

export function GovHeader() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200" aria-hidden />
          <div>
            <Link href="/" className="font-semibold text-gray-900">Maharashtra Sepaktakraw Association</Link>
            <div className="text-xs text-gray-600">Registered Sports Federation</div>
          </div>
        </div>
        <MainNav />
      </div>
    </header>
  );
}


