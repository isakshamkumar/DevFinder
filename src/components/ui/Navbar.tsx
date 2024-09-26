"use client"
import React, { useState } from "react";
import { ModeToggle } from "../Theme-Switch";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Home, Menu, X } from 'lucide-react';
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
} from "@/components/ui/alert-dialog";

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
              account and any data you have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="hidden sm:flex">
            <Avatar className="mr-2 h-8 w-8">
              <AvatarImage src={session.data?.user?.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline">{session.data?.user?.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOutIcon className="mr-2 h-4 w-4" /> Sign Out
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <DeleteIcon className="mr-2 h-4 w-4" /> Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavItems = ({ mobile = false }) => (
    <>
     <Link onClick={()=>setMobileMenuOpen(false)} className={`hover:underline flex items-center ${mobile ? 'py-2' : ''}`} href="/browse-rooms">
        <Search className="mr-2 h-4 w-4" /> Browse
      </Link>
      <Link onClick={()=>setMobileMenuOpen(false)} className={`hover:underline flex items-center ${mobile ? 'py-2' : ''}`} href="/your-rooms">
        <Home className="mr-2 h-4 w-4" /> Your Rooms
      </Link>
      <Link onClick={()=>setMobileMenuOpen(false)} className={`hover:underline flex items-center ${mobile ? 'py-2' : ''}`} href="/create-room">
        <WorkflowIcon className="mr-2 h-4 w-4" /> Create Room
      </Link>
    </>
  );

  return (
    <header className="bg-white/70 dark:bg-gray-900/70 fixed top-0 left-0 w-full py-2 z-[10000] border-b border-gray-200 dark:border-gray-700 ">
    <div className="container mx-auto flex justify-between items-center px-4">
      <Link href="/" className="flex gap-2 items-center text-xl hover:underline">
        <Image src="/logo.png" width={40} height={40} alt="the application icon of a magnifying glass" />
        <span className="hidden sm:inline">DevFinder</span>
      </Link>

      <nav className="hidden md:flex gap-6">
        {isLoggedIn && <NavItems />}
      </nav>

      <div className="flex items-center gap-2 sm:gap-4">
        {isLoggedIn ? (
          <>
            <AccountDropdown />
            <Button variant="ghost" className="md:hidden p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </>
        ) : (
          <Button onClick={() => signIn()} variant="ghost" className="hidden sm:flex">
            <LogInIcon className="mr-2 h-4 w-4" /> Sign In
          </Button>
        )}
        <ModeToggle />
      </div>
    </div>

    {/* Mobile menu drawer with enhanced glassmorphism */}
    <div 
      className={`fixed inset-y-0 right-0 z-50 w-64 bg-gradient-to-br from-white/10 to-white/30 dark:from-gray-900/10 dark:to-gray-900/30 backdrop-blur-lg shadow-lg transform ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out md:hidden border-l border-gray-200 dark:border-gray-700`}
      style={{
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        WebkitBackdropFilter: 'blur(10px)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex justify-end p-4">
        <Button variant="ghost" onClick={() => setMobileMenuOpen(false)}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      <nav className="flex flex-col px-4">
        {isLoggedIn && (
          <>
            <NavItems mobile />
            <Button onClick={() => signOut({ callbackUrl: "/" })} variant="ghost" className="justify-start py-2 -ml-3">
              <LogOutIcon className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </>
        )}
      </nav>
    </div>

    {/* Overlay */}
    {mobileMenuOpen && (
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden" 
        onClick={() => setMobileMenuOpen(false)}
      ></div>
    )}
  </header>
  );
}