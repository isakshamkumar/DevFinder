import { authOption } from "@/lib/auth"
import NextAuth from "next-auth"

// import { AuthOptions,SessionStrategy } from "next-auth";

const handler = NextAuth(authOption) 

export { handler as GET, handler as POST }