import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maharashtra Sepaktakraw Association",
  description: "Official portal for results, notices, districts and compliance. Promoting the traditional sport of Sepaktakraw across Maharashtra.",
  keywords: "sepaktakraw, maharashtra, sports, association, results, districts, events",
  authors: [{ name: "Maharashtra Sepaktakraw Association" }],
  robots: "index, follow",
  openGraph: {
    title: "Maharashtra Sepaktakraw Association",
    description: "Official portal for results, notices, districts and compliance.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Loading component for Suspense fallback
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-bright-red mb-4"></div>
        <p className="text-dark-gray text-lg">Loading...</p>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <Suspense fallback={<LoadingSpinner />}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
