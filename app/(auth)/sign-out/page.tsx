"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    // TODO: Implement actual sign out with Supabase
    // For now, just redirect after a short delay
    const timer = setTimeout(() => {
      router.push("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Signing out...
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            You have been successfully signed out.
          </p>
        </div>
        
        <div className="mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to home page...</p>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Click here if you're not redirected automatically
          </Link>
        </div>
      </div>
    </div>
  );
}
