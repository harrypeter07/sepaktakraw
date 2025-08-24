import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maharashtra Sepaktakraw Association",
  description: "Official portal for results, notices, districts and compliance of the Maharashtra Sepaktakraw Association.",
  keywords: ["sepaktakraw", "maharashtra", "association", "sports", "results", "districts"],
  authors: [{ name: "Maharashtra Sepaktakraw Association" }],
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Maharashtra Sepaktakraw Association",
    description: "Official portal for results, notices, districts and compliance",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/mskt-logo.svg",
        width: 100,
        height: 100,
        alt: "MSKT Logo",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
