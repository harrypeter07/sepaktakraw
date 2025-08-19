import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { GovHeader } from "@/components/layout/GovHeader";
import { GovFooter } from "@/components/layout/GovFooter";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maharashtra Sepaktakraw Association",
  description: "Official website of the Maharashtra Sepaktakraw Association",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white px-3 py-2 rounded shadow">Skip to content</a>
        <GovHeader />
        <main id="main" className="flex-1">{children}</main>
        <GovFooter />
      </body>
    </html>
  );
}


