import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url);
  
  // Skip middleware for public routes and API routes
  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.startsWith("/favicon")) {
    return NextResponse.next();
  }

  // Check if user is trying to access admin routes
  if (pathname.startsWith("/admin")) {
    // For now, allow access to admin routes without authentication
    // This can be implemented later when Supabase is properly configured
    // TODO: Implement proper authentication when Supabase is set up
    
    // Check for a simple session cookie (mock authentication)
    const sessionCookie = req.cookies.get("user-session");
    
    if (!sessionCookie) {
      // No session cookie, redirect to sign in
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    
    // Continue to the requested page
    return NextResponse.next();
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


