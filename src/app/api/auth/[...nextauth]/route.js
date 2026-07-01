import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Temporary test user — we'll replace with real DB in Week 3
        const testUser = {
          id: "1",
          name: "Test User",
          email: "test@sarkarisuccess.com",
          password: await bcrypt.hash("password123", 10),
        };

        if (credentials.email !== testUser.email) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          testUser.password
        );

        if (!passwordMatch) return null;

        return { id: testUser.id, name: testUser.name, email: testUser.email };
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