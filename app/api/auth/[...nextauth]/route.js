import User from "@/models/User";
import { connect } from "@/utils/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
const authOptions = {
  providers: [
    CredentialsProvider({
      // id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },

       authorize: async(credentials)=>{
        const { username, password } = credentials;
        try {
          await connect();
          const user = await User.findOne({ username });
          // console.log(user.username)
          if (!user) {
            return null;
          }
          
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days

  },
  callbacks: {
    async jwt({ token, user }) {
      // If this is the first time the JWT callback is run, user will be defined
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      // Copy data from token to session object
      session.user = token.user;
      return session;
    }
  },
 
  pages: {
    signIn: "/dashboard",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
