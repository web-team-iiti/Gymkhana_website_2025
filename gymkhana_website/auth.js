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
                role: { label: "Role", type: "text" },
            },
            authorize: async (credentials) => {
                try {
                    const { email, password, role } = credentials;
                    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
                    const user = result.rows[0];
                    if (!user) return null;
                    if (user.password !== password) return null;
                    if (user.role !== role) return null;
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    };
                } catch (error) {
                    console.error("Auth Error:", error);
                    return null;
                }
            },
        }),
    ],
});