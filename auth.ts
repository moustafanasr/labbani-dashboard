import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const credentialsSchema = z.object({ email: z.email(), password: z.string().min(6) });
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [Credentials({
    credentials: { email: { type: "email" }, password: { type: "password" } },
    async authorize(credentials) {
      const parsed = credentialsSchema.safeParse(credentials); if (!parsed.success) return null;
      // Replace with the real authentication endpoint when API details are supplied.
      return { id: "demo-admin", name: "Ahmed Mohamed", email: parsed.data.email, accessToken: "demo-access-token", refreshToken: "demo-refresh-token", accessTokenExpires: Date.now() + 60 * 60 * 1000 };
    }
  })],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { const u = user as typeof user & { accessToken: string; refreshToken: string; accessTokenExpires: number }; token.accessToken = u.accessToken; token.refreshToken = u.refreshToken; token.accessTokenExpires = u.accessTokenExpires; }
      // Production integration: call the refresh endpoint here when accessTokenExpires is reached.
      return token;
    },
    async session({ session, token }) { (session as typeof session & { accessToken?: unknown }).accessToken = token.accessToken; return session; }
  }
});
