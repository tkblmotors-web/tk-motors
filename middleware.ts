import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/admin/dashboard");
  const isOnUsersPage = req.nextUrl.pathname.startsWith("/admin/dashboard/users");
  const role = req.auth?.user?.role;

  if (isOnDashboard && !isLoggedIn) {
    const loginUrl = new URL("/admin/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isOnUsersPage && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};

