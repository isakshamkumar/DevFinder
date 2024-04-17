import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/db/Client"
import { AuthOptions } from "next-auth";
export const authOption:AuthOptions={
  // Configure one or more authentication providers
  adapter:PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: "this_is_secret",
  providers: [
      GoogleProvider({
          clientId:
           process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
          clientSecret:
          process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
        }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log(token,'token');
      console.log(user,'user');
      
      
    const dbUser= await prisma.user.findFirst({
      where:{
        email:token.email
      }
    })
      if (!dbUser) {
        throw new Error("no user with email found");
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ token, session }) {
      if (token) {
        session.user = {
          //@ts-ignore
          id: token.id as string,
          name: token.name,
          email: token.email,
          image: token.picture,
        };
      }

      return session
    },
  },
}
const handler = NextAuth(authOption) 

export { handler as GET, handler as POST }