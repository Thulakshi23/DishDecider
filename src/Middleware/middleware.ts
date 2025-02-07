import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Example: Checking for auth token

  // Example: Protecting Admin Page
  if (req.nextUrl.pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Allow request to proceed
}

// Apply Middleware to Specific Routes
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"], // Add paths that need protection
};
