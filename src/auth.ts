import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import getPrisma from "@/lib/prisma";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
        } & DefaultSession["user"]
    }
    interface User {
        role: string;
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(getPrisma()!) as any,
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const p = getPrisma();
                if (!credentials?.email || !credentials?.password || !p) return null;

                const user = await p.user.findUnique({
                    where: { email: credentials.email as string }
                });

                if (!user || !user.password) return null;

                const isPasswordValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isPasswordValid) return null;

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: user.role,
                };
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google" && user.email) {
                const p = getPrisma();
                if (p) {
                    const existingUser = await p.user.findUnique({
                        where: { email: user.email }
                    });
                    if (existingUser && !existingUser.role) {
                        await p.user.update({
                            where: { id: existingUser.id },
                            data: { role: "USER" }
                        });
                    }
                    if (!existingUser) {
                        await p.user.create({
                            data: {
                                email: user.email,
                                name: user.name,
                                image: user.image,
                                role: "USER"
                            }
                        });
                    }
                }
            }
            return true;
        },
        async session({ session, token }) {
            const p = getPrisma();
            if (token.sub && session.user) {
                session.user.id = token.sub;
                if (p && token.sub) {
                    const dbUser = await p.user.findUnique({
                        where: { id: token.sub },
                        select: { role: true }
                    });
                    session.user.role = dbUser?.role || "USER";
                } else {
                    session.user.role = (token.role as string) || "USER";
                }
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role || "USER";
            }
            return token;
        }
    },
    session: {
        strategy: "jwt",
    }
});
