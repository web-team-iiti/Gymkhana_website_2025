// export const authConfig = {
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     // 1. MIDDLEWARE PROTECTION LOGIC
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const role = auth?.user?.role;

//       const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

//       // Define specific areas
//       const isOnGS = nextUrl.pathname.startsWith("/dashboard/general_secretary");
//       const isOnOffice = nextUrl.pathname.startsWith("/dashboard/office");
//       const isOnADOSA = nextUrl.pathname.startsWith("/dashboard/adosa");
//       const isOnClubHead = nextUrl.pathname.startsWith("/dashboard/club_head"); // 👈 New Rule
//       const isOnDOSA = nextUrl.pathname.startsWith("/dashboard/dosa");
//       const isOnStudent = nextUrl.pathname.startsWith("/dashboard/student");

//       // Rule 1: Always force login for any dashboard page
//       if (isOnDashboard) {
//         if (!isLoggedIn) return false;
//       // Rule 1: Always force login for any dashboard page or student page
//       if (isOnDashboard || isOnStudent) {
//         if (!isLoggedIn) return false; // Redirects to /login
//       }

//       // Rule 2: Protect GS Routes
//       // Note: 'general_secretary' matches your DB role, update if your DB uses 'gs'
//       if (isOnGS && role !== "gs") {
//         return Response.redirect(new URL("/dashboard", nextUrl));
//       }

//       // Rule 3: Protect Office Routes
//       if (isOnOffice && role !== "office") {
//         return Response.redirect(new URL("/dashboard", nextUrl));
//       }

//       // Rule 4: Protect ADOSA Routes
//       if (isOnADOSA && role !== "adosa") {
//         return Response.redirect(new URL("/dashboard", nextUrl));
//       }

//       // Rule 5: Protect Club Head Routes
//       if (isOnClubHead && role !== "club_head") {
//         return Response.redirect(new URL("/dashboard", nextUrl));
//       }

//       // Rule 5: Protect DOSA Routes
//       if (isOnDOSA && role !== "dosa") {
//         return Response.redirect(new URL("/dashboard", nextUrl));
//       }
//       // Rule 6: Protect Student Routes
//       if (isOnStudent && role !== "student") {
//         return Response.redirect(new URL("/dashboard", nextUrl));
//       }
//       return true;
//     },

//     // 2. PASS DATA TO FRONTEND (Session Persistence)
//     async jwt({ token, user }) {
//       // Runs on login and token rotation
//       if (user) {
//         token.role = user.role;
//         token.id = user.id;

//         // Save the club info we fetched in auth.js
//         token.club_id = user.club_id;
//         token.club_name = user.club_name;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       // Runs whenever useSession() or auth() is called
//       if (token && session.user) {
//         session.user.role = token.role;
//         session.user.id = token.id;

//         // Expose club info to the client/pages
//         session.user.club_id = token.club_id;
//         session.user.club_name = token.club_name;
//       }
//       return session;
//     },
//   },
//   providers: [],
// };


export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    // 1. MIDDLEWARE PROTECTION LOGIC
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;
      const pathname = nextUrl.pathname;

      const isOnDashboard = pathname.startsWith("/dashboard");

      const isOnGS = pathname.startsWith("/dashboard/general_secretary");
      const isOnOffice = pathname.startsWith("/dashboard/office");
      const isOnADOSA = pathname.startsWith("/dashboard/adosa");
      const isOnDOSA = pathname.startsWith("/dashboard/dosa");
      const isOnStudent = pathname.startsWith("/dashboard/student");
      const isOnClubHead = pathname.startsWith("/dashboard/club_head");

      // Rule 1: Force login for dashboard & student pages
      if (isOnDashboard || isOnStudent) {
        if (!isLoggedIn) return false;
      }

      // Role protections
      if (isOnGS && role !== "gs") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (isOnOffice && role !== "office") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (isOnADOSA && role !== "adosa") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (isOnDOSA && role !== "dosa") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (isOnStudent && role !== "student") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (isOnClubHead && role !== "club_head") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    }, // ✅ comma is REQUIRED here

    // 2. JWT CALLBACK
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.club_id = user.club_id;
        token.club_name = user.club_name;
      }
      return token;
    },

    // 3. SESSION CALLBACK
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.club_id = token.club_id;
        session.user.club_name = token.club_name;
      }
      return session;
    },
  },

  providers: [],
};
