import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/middleware";

export async function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url);
  
  // Skip middleware for public routes and API routes
  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.startsWith("/favicon")) {
    return NextResponse.next();
  }

  // Check if user is trying to access admin routes
  if (pathname.startsWith("/admin")) {
    try {
      const supabase = createClient(req);
      
      // Get the session from the request
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        // No valid session, redirect to sign in
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }

      // Check if user has required role (you can implement role-based checks here)
      // For now, we'll just check if they have a valid session
      
      // Continue to the requested page
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware error:", error);
      // On error, redirect to sign in
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  // For all other routes, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};


