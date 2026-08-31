import NextAuth from "next-auth";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";
import { routing } from "@/i18n/routing";

const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Routes admin : on garde la logique d'authentification, pas de traduction
  if (pathname.startsWith("/admin")) {
    const isLoggedIn = !!req.auth;
    const isOnDashboard = pathname.startsWith("/admin/dashboard");
    const isOnUsersPage = pathname.startsWith("/admin/dashboard/users");
    const role = req.auth?.user?.role;

    if (isOnDashboard && !isLoggedIn) {
      const loginUrl = new URL("/admin/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isOnUsersPage && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl.origin));
    }

    return NextResponse.next();
  }

  // Toutes les autres routes : gestion de la langue (fr/ar)
  return intlMiddleware(req);
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
