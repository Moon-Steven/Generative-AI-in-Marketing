import { type NextRequest, NextResponse } from "next/server";

// MVP: Auth middleware is permissive — logs but doesn't block
// Set ENFORCE_AUTH=true in .env to enable blocking
const ENFORCE_AUTH = process.env.ENFORCE_AUTH === "true";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip auth for non-API routes and auth routes
  if (!pathname.startsWith("/api") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token =
    request.headers.get("authorization")?.replace("Bearer ", "") ||
    request.cookies.get("token")?.value;

  if (!token && ENFORCE_AUTH) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
