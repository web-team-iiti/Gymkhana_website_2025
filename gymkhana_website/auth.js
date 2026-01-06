import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { query } from "@/config/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    // 1. Verify Identity (Users Table)
                    const { email, password } = credentials;
                    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
                    const user = result.rows[0];

                    if (!user) return null;

                    // Note: In production, use bcrypt.compare(password, user.password)
                    if (user.password !== password) return null;

                    // 2. Fetch Scope (Clubs Table) - ONLY for Club Heads
                    let clubData = null;
                    if (user.role === 'club_head') {
                        // We check if this user ID exists in the clubs table as a head
                        const clubSql = "SELECT club_id, club_name FROM clubs WHERE club_head_id = $1"; // using your column name 'clubheadid'
                        const clubRes = await query(clubSql, [user.id]);

                        if (clubRes.rows.length > 0) {
                            clubData = clubRes.rows[0];
                        }
                    }

                    // 3. Return User Object with Extra Data
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        // Attach club info if it exists
                        club_id: clubData?.club_id || null,
                        club_name: clubData?.club_name || null,
                    };
                } catch (error) {
                    console.error("Auth Error:", error);
                    return null;
                }
            },
        }),
    ],
});