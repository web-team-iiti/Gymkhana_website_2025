export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login", // Redirect auth errors (AccessDenied) to login page
  },

  callbacks: {
    // MIDDLEWARE PROTECTION LOGIC (runs on Edge)
    authorized({ auth, request }) {
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;

      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      // Define specific areas
      const isOnGS = nextUrl.pathname.startsWith("/dashboard/general_secretary");
      const isOnOffice = nextUrl.pathname.startsWith("/dashboard/office");
      const isOnADOSA = nextUrl.pathname.startsWith("/dashboard/adosa");
      const isOnClubHead = nextUrl.pathname.startsWith("/dashboard/club_head");
      const isOnContingentLeader = nextUrl.pathname.startsWith("/dashboard/contingent_leader");
      const isOnGsCult = nextUrl.pathname.startsWith("/dashboard/gs_cult");

      // Rule 1: Always force login for any dashboard page
      if (isOnDashboard) {
        if (!isLoggedIn) return false;
      }

      // Rule 2: Protect GS Routes (DB uses 'gs_snt')
      if (isOnGS && role !== "gs_snt") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (isOnOffice && role !== "office") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // Rule 4: Protect ADOSA Routes
      if (isOnADOSA && role !== "adosa") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // Rule 5: Protect Club Head Routes
      if (isOnClubHead && role !== "club_head") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // Rule 6: Protect Contingent Leader Routes
      if (isOnContingentLeader && role !== "contingent_leader") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // Rule 7 has been removed (handled by Rule 2)

      // Rule 8: Protect GS Cult Routes
      if (isOnGsCult && role !== "gs_cult") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // Rule 9: Edge Protection for API Routes
      const isOnApi = nextUrl.pathname.startsWith("/api");
      const isAuthApi = nextUrl.pathname.startsWith("/api/auth");
      
      if (isOnApi && !isAuthApi) {
        // Allow public GET requests to specific API routes (like events)
        // If it's a mutation (POST, PUT, DELETE, PATCH) and not logged in, block at edge
        const isMutation = ["POST", "PUT", "PATCH", "DELETE"].includes(request.method);
        if (isMutation && !isLoggedIn) {
          return Response.json({ message: "Unauthorized" }, { status: 401 });
        }
      }

      return true;
    },

    // 2. JWT — Persist DB data into the token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        // Save the club info we fetched in auth.js
        token.club_id = user.club_id;
        token.club_name = user.club_name;
        token.club_category = user.club_category;

        // Save contingent info if available
        token.contingent_id = user.contingent_id;
        token.contingent_name = user.contingent_name;
      }
      return token;
    },

    // 3. SESSION — Expose data to the client
    async session({ session, token }) {
      // Runs whenever useSession() or auth() is called
      if (token && session.user) {
        session.user.role = token.role;
        session.user.id = token.id;

        // Expose club info to the client/pages
        session.user.club_id = token.club_id;
        session.user.club_name = token.club_name;
        session.user.club_category = token.club_category;
        
        // Expose contingent info
        session.user.contingent_id = token.contingent_id;
        session.user.contingent_name = token.contingent_name;
      }
      return session;
    },
  },

  providers: [],
};
