export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // This logic runs on every request in Middleware
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;

      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");

      // 1. Redirect unauthenticated users
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirects to /login
      }

      // 2. Protect Admin Routes (Example)
      if (isOnAdmin && role !== "gs") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    // We keep these here so they run on both Edge and Node
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.role = token.role;
      return session;
    },
  },
  providers: [], // Keep empty here! Providers with DB logic go in auth.js
};