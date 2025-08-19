import type { Metadata } from "next";
import "../globals.css";
import { AdminNav } from "@/components/nav/AdminNav";

export const metadata: Metadata = { title: "Admin | MSKT" };

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="font-semibold">Admin</div>
          <AdminNav />
        </div>
        <main className="mx-auto max-w-6xl px-4 pb-10">{children}</main>
      </body>
    </html>
  );
}


