import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const protectedPaths = [
    "/browse-rooms",
    "/create-room",
    "/view-room/:roomId",
    "/view-rooms",
    "/your-rooms",
  ];

  const token = request.cookies.get("next-auth.session-token") || request.cookies.get("__Secure-next-auth.session-token");


  if (protectedPaths.some(protectedPath => path.startsWith(protectedPath.replace(':roomId', '')))) {
    if (!token) {
      return NextResponse.redirect(new URL(`/api/auth/signin`, request.nextUrl));
    }
  }

  if (path === "/" && token) {
    return NextResponse.redirect(new URL("/browse-rooms", request.nextUrl));
  }

}

export const config = {
  matcher: [
    "/browse-rooms",
    "/create-room",
    "/view-room/:roomId",
    "/view-rooms",
    "/your-rooms",
  ],
};