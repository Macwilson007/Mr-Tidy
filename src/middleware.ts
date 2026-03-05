import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isApiAuthRoute = pathname.startsWith("/api/auth");
    const isApiUserRoute = pathname.startsWith("/api/user");
    const isApiAdminRoute = pathname.startsWith("/api/admin");

    const isPublicRoute = 
        pathname === "/" || 
        pathname.startsWith("/api/receptionist") ||
        pathname.startsWith("/book") ||
        pathname.startsWith("/about") ||
        pathname.startsWith("/services") ||
        pathname.startsWith("/pricing") ||
        pathname.startsWith("/how-it-works") ||
        pathname.startsWith("/contact") ||
        pathname.startsWith("/privacy") ||
        pathname.startsWith("/terms") ||
        pathname.startsWith("/careers") ||
        pathname.startsWith("/api/settings") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".");

    const isAuthRoute = pathname.startsWith("/auth") && !pathname.includes("/api/auth");
    const isAdminRoute = pathname.startsWith("/admin");
    const isDashboardRoute = pathname.startsWith("/dashboard");

    // Let auth API routes through
    if (pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    if (isApiUserRoute || isApiAdminRoute) {
        const token = request.cookies.get("next-auth.session-token") || request.cookies.get("__Secure-next-auth.session-token");
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return;
    }

    if (isAuthRoute) {
        const token = request.cookies.get("next-auth.session-token") || request.cookies.get("__Secure-next-auth.session-token");
        if (token) {
            return NextResponse.redirect(new URL("/", request.nextUrl));
        }
        return;
    }

    if (isAdminRoute || isDashboardRoute) {
        const token = request.cookies.get("next-auth.session-token") || request.cookies.get("__Secure-next-auth.session-token");
        if (!token) {
            return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
        }
        return;
    }

    if (!isPublicRoute) {
        const token = request.cookies.get("next-auth.session-token") || request.cookies.get("__Secure-next-auth.session-token");
        if (!token) {
            return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
        }
    }

    return;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
