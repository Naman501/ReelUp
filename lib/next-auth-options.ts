import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import User from "@/models/User";
import { connectDB } from "./db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "naman@gmail.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },

      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Missing email or password");
        }

        try {
          await connectDB();

          const user = await User.findOne({ email: credentials.email });
          console.log("User from DB details", user);

          if (!user) {
            throw new Error("User Not Found.");
          }
          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          if (!isMatch) {
            throw new Error("Invalid Password");
          }
          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.error(error);
          throw new Error("Error in Next-Auth Credentials.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        console.log("Session user", session);
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24*60*30*60
  },
  pages:{
    signIn:"/login",
    error:"/login"
  },
secret:process.env.NEXTAUTH_SECRET
};
