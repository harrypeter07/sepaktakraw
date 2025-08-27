import type { Metadata } from "next";

export const metadata: Metadata = { 
  metadataBase: new URL('http://localhost:3000'),
  title: "Auth | MSKT" 
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="antialiased min-h-screen grid place-items-center">
      {children}
    </div>
  );
}


