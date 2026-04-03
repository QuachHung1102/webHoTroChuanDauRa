/**
 * Edge-safe NextAuth config — KHÔNG import bcryptjs, pg, hay bất kỳ module Node.js native nào.
 * Dùng riêng cho middleware (Edge Runtime).
 * Providers để trống vì chỉ cần JWT callbacks để đọc token trong middleware.
 */
import type { NextAuthConfig } from "next-auth";
import type { Role } from "@/lib/types";

export const edgeAuthConfig: NextAuthConfig = {
  session: { strategy: "jwt" },

  pages: {
    signIn: "/login",
  },

  // Providers không chạy trong Edge — để trống, login vẫn qua /api/auth
  providers: [],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role: Role }).role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as Role;
      return session;
    },
  },
};
