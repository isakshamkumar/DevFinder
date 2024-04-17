"use client";

import { ModeToggle } from "../Theme-Switch";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Search,Home} from 'lucide-react'
import { DeleteIcon, LogInIcon, LogOutIcon, WorkflowIcon } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
// import { deleteAccountAction } from "./actions";

function AccountDropdown() {
  const session = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              account and any data your have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
            //   onClick={async () => {
            //     await deleteAccountAction();
            //     signOut({ callbackUrl: "/" });
            //   }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"link"}>
            <Avatar className="mr-2">
              <AvatarImage src={session.data?.user?.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {session.data?.user?.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            <LogOutIcon className="mr-2" /> Sign Out
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <DeleteIcon className="mr-2" /> Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <header className="bg-gray-100 fixed top-0 left-0 w-full py-2 dark:bg-transparent z-[10000] border-b" style={{ backdropFilter: 'blur(8px)' }}>
      <div className="container mx-auto flex justify-between bg-transparent items-center">
        <Link
          href="/"
          className="flex gap-2 items-center text-xl hover:underline"
        >
          <Image
            src="/logo.png"
            width="60"
            height="60"
            alt="the application icon of a magnifying glass"
          />
          DevFinder
        </Link>

        <nav >
          {isLoggedIn && (
            <div className="flex gap-20">
              <Link className="hover:underline flex items-center" href="/browse-rooms">
              <Search className="mr-2"/>  Browse
              </Link>

              <Link className="hover:underline  flex items-center" href="/your-rooms">
               <Home className="mr-2" /> Your Rooms
              </Link>

              <Link className="hover:underline  flex items-center" href="/create-room">
               <WorkflowIcon className="mr-2" /> Create Room
              </Link>
            </div>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn && <AccountDropdown />}
          {!isLoggedIn && (
            <Button onClick={() => signIn()} variant="link">
              <LogInIcon className="mr-2" /> Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}