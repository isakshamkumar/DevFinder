import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/";
  console.log(request.cookies, "cookies");

  const token = request.cookies.get("next-auth.session-token");
  console.log(token);

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/browse-rooms", request.nextUrl));
  }
  console.log(process.env.NEXT_PUBLIC_CALL_BACK_URL, "urlsasadsad");
  const url = process.env.NEXT_PUBLIC_CALL_BACK_URL;
  if (!isPublicPath && !token) {
    return NextResponse.redirect(
      new URL(`/api/auth/signin`, request.nextUrl)
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/browse-rooms",
    "/create-room",
    "/view-room/:roomId",
    "/view-rooms",
    "/your-rooms",
  ],
};
