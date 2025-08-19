import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = { title: "Auth | MSKT" };

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen grid place-items-center">{children}</body>
    </html>
  );
}


