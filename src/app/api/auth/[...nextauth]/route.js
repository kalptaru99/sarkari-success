import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from '@/lib/db.js';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [credentials.email]
          );

          if (result.rows.length === 0) return null;

          const user = result.rows[0];
          const passwordMatch = await bcrypt.compare(credentials.password, user.password);

          if (!passwordMatch) return null;

          return { id: user.id, name: user.name, email: user.email };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };