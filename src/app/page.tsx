"use client";
import { ModeToggle } from "@/components/Theme-Switch";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import prisma from "@/db/Client";
import { signIn, signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import { cn } from "@/lib/utils";
export default function Home() {
  // const email= await prisma.user.findMany({})
  const handleClick = async () => {};
  const session = useSession();
  // const newSession= getServerSession(authOption)
  return (
    <>

    {session.data ? (
        <>
          {" "}
          <h2>Welcome {session.data.user?.name}</h2>{" "}
          <Link className={cn("mr-5", buttonVariants())} href={"browse-rooms"}>
            Browse Rooms
          </Link>
          <Button onClick={() => signOut()}> Signout</Button>
          {JSON.stringify(session.data)}
        </>
      ) : (
        <>
          {" "}
          <Button onClick={() => signIn()}>Sign In</Button>
        </>
      )}
        </>
  );
}
