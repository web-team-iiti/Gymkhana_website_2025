import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { authConfig } from "@/auth.config";
import { query } from "@/config/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        ...authConfig.callbacks,

        // 1. SIGN-IN GATE — Runs BEFORE a session is created
        async signIn({ user, account, profile }) {
            try {
                const email = user.email;

                // Rule 1: Only allow @iiti.ac.in emails
                if (!email?.endsWith("@iiti.ac.in")) {
                    return false; // Denied — redirects to /login?error=AccessDenied
                }

                // Rule 2: Only allow pre-registered users (Option A)
                const result = await query("SELECT * FROM users WHERE email = $1", [email]);
                const dbUser = result.rows[0];

                if (!dbUser) {
                    return false; // Denied — user not in database
                }

                // Attach DB data to the user object so jwt callback can access it
                user.id = dbUser.id;
                user.role = dbUser.role;

                // 2. Fetch Scope (Clubs Table) - ONLY for Club Heads
                let clubData = null;
                if (user.role === 'club_head') {
                    const clubSql = "SELECT club_id, club_name, category FROM clubs WHERE club_head_id = $1";
                    const clubRes = await query(clubSql, [user.id]);

                    if (clubRes.rows.length > 0) {
                        clubData = clubRes.rows[0];
                    }
                }

                // 2.5 Fetch Contingent - ONLY for Contingent Leaders
                let contingentData = null;
                if (user.role === 'contingent_leader') {
                    const contingentSql = `
                        SELECT c.id, c.name 
                        FROM ibcc_contingents c
                        JOIN ibcc_contingent_leaders cl ON c.id = cl.contingent_id
                        WHERE cl.user_id = $1
                    `;
                    const contingentRes = await query(contingentSql, [user.id]);

                    if (contingentRes.rows.length > 0) {
                        contingentData = contingentRes.rows[0];
                    }
                }

                // Attach properties to the user object that gets returned
                user.club_id = clubData?.club_id || null;
                user.club_name = clubData?.club_name || null;
                user.club_category = clubData?.category || null;
                user.contingent_id = contingentData?.id || null;
                user.contingent_name = contingentData?.name || null;

                return true; // Allowed
            } catch (error) {
                console.error("SignIn Callback Error:", error);
                return false;
            }
        },
    },
});
