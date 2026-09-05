export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login", // Redirect auth errors (AccessDenied) to login page
  },

  callbacks: {

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
