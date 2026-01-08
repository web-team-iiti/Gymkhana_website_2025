export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // 1. MIDDLEWARE PROTECTION LOGIC
    // This runs on every request to check if user is allowed
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;

      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnGS = nextUrl.pathname.startsWith("/dashboard/general_secretary");
      const isOnOffice = nextUrl.pathname.startsWith("/dashboard/office");
      const isOnADOSA = nextUrl.pathname.startsWith("/dashboard/adosa");
      const isOnDOSA = nextUrl.pathname.startsWith("/dashboard/dosa");
      const isOnStudent = nextUrl.pathname.startsWith("/dashboard/student");

      // Rule 1: Always force login for any dashboard page or student page
      if (isOnDashboard || isOnStudent) {
        if (!isLoggedIn) return false; // Redirects to /login
      }

      // Rule 2: Protect GS Routes
      if (isOnGS && role !== "gs") {
        // If a non-GS tries to enter, send them to the main dashboard
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // Rule 3: Protect Office Routes
      if (isOnOffice && role !== "office") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      // Rule 4: Protect ADOSA Routes
      if (isOnADOSA && role !== "adosa") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      // Rule 5: Protect DOSA Routes
      if (isOnDOSA && role !== "dosa") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      // Rule 6: Protect Student Routes
      if (isOnStudent && role !== "student") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },

    // 2. PASS DATA TO FRONTEND & BACKEND
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id; // <--- ADD THIS (Crucial for database inserts)
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.id = token.id; // <--- ADD THIS
      }
      return session;
    },
  },
  providers: [],
};