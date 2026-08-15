export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/api/billing/:path*", "/api/user/:path*", "/api/team/:path*"],
};
