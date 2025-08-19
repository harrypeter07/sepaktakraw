import { NextRequest, NextResponse } from "next/server";
import { hasAtLeast } from "@/lib/rbac";

export function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url);
  if (pathname.startsWith("/admin")) {
    // Very simple gate; replace with real session lookup
    const role = (req.headers.get("x-role") || "VIEWER") as any;
    if (!hasAtLeast(role, "EDITOR" as any)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};


