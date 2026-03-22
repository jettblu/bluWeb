import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const cookies = req.cookies;
  const accessToken = cookies.get("accessToken")?.value;
  const refreshToken = cookies.get("refreshToken")?.value;
  if (!accessToken || !refreshToken || !process.env.JWT_ACCESS_SECRET) {
    req.nextUrl.searchParams.set("from", req.nextUrl.pathname);
    req.nextUrl.pathname = "/login";
    return NextResponse.redirect(req.nextUrl);
  }
  const secret = process.env.JWT_ACCESS_SECRET;
  const adaptedSecret: Uint8Array = new TextEncoder().encode(secret);
  try {
    const { payload } = await jwtVerify(accessToken, adaptedSecret);
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("user-id", `${payload.userId}`);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch {
    req.nextUrl.searchParams.set("from", req.nextUrl.pathname);
    req.nextUrl.pathname = "/login";
    return NextResponse.redirect(req.nextUrl);
  }
}

export const config = {
  matcher: ["/profile/:path*"],
};
