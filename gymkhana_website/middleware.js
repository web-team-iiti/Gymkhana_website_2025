import { authConfig } from "./auth.config";

export default async function middleware(req) {
  const { default: NextAuth } = await import("next-auth");
  return NextAuth(authConfig).auth(req);
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};