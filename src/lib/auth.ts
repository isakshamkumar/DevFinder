import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/db/Client"
import { DefaultSession ,AuthOptions} from "next-auth";
import { Adapter } from "next-auth/adapters";
declare module "next-auth" {
    interface Session extends DefaultSession {
      user: {
        id: string;
      } & DefaultSession["user"];
    }
  }
export const authOption={
    adapter:PrismaAdapter(prisma) as Adapter,
    session: {
        strategy: "jwt",
      },
    secret: process.env.NEXTAUTH_SECRET ?? 'secret',
    providers: [
        GoogleProvider({
            clientId:
             process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            clientSecret:
            process.env.GOOGLE_CLIENT_SECRET!
          })
    ],
    callbacks: {
      async jwt({ token, user }) {
        
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
   
            id: token.id as string,
            name: token.name,
            email: token.email,
            image: token.picture,
          };
        }
  
        return session
      },
      async redirect({ url, baseUrl }) {
  
        if (url === '/') {
          return `${baseUrl}/browse-rooms`
        }
        if (url.startsWith('/')) return `${baseUrl}${url}`
    
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
      },
    },
  } satisfies AuthOptions