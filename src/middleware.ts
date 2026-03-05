import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Always allow API routes, static files, and public pages
    if (
        pathname.startsWith("/api/") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".") ||
        pathname === "/" ||
        pathname.startsWith("/book") ||
        pathname.startsWith("/about") ||
        pathname.startsWith("/services") ||
        pathname.startsWith("/pricing") ||
        pathname.startsWith("/how-it-works") ||
        pathname.startsWith("/contact") ||
        pathname.startsWith("/privacy") ||
        pathname.startsWith("/terms") ||
        pathname.startsWith("/careers")
    ) {
        return NextResponse.next();
    }

    // Check for any NextAuth session cookie
    const hasSessionCookie = request.cookies.getAll().some(cookie => 
        cookie.name.includes("next-auth") || 
        cookie.name.includes("session")
    );

    // Allow auth pages - they handle their own redirects
    if (pathname.startsWith("/auth/")) {
        return NextResponse.next();
    }

    // Protected routes - redirect to login if no session
    if (!hasSessionCookie) {
        return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
