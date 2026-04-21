"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, LayoutDashboard, LogOut, User, MessageSquare, Info, TrendingUp } from "lucide-react";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";

export function Navbar() {
  const { user } = useUser();
  const auth = useAuth();

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
            H
          </div>
          <span className="text-xl font-bold tracking-tight font-headline text-primary">HomeSolve</span>
        </Link>
        
        <div className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          <Link href="/about" className="hover:text-primary transition-colors flex items-center gap-1">
            <Info className="h-4 w-4" /> How it Works
          </Link>
          <Link href="/properties" className="hover:text-primary transition-colors flex items-center gap-1">
            <Search className="h-4 w-4" /> Browse
          </Link>
          <Link href="/list-property" className="hover:text-primary transition-colors flex items-center gap-1">
            <PlusCircle className="h-4 w-4" /> Sell Your Home
          </Link>
          <Link href="/investor-join" className="hover:text-primary transition-colors flex items-center gap-1">
            <TrendingUp className="h-4 w-4" /> Investor Network
          </Link>
          <Link href="/messages" className="hover:text-primary transition-colors flex items-center gap-1">
            <MessageSquare className="h-4 w-4" /> Messages
          </Link>
          <Link href="/dashboard" className="hover:text-primary transition-colors flex items-center gap-1">
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 bg-accent/10 text-accent hidden md:flex" asChild>
                <Link href="/dashboard"><User className="h-5 w-5" /></Link>
              </Button>
              <Button variant="outline" size="sm" className="rounded-full" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Sign Out</span>
              </Button>
            </div>
          ) : (
            <Button variant="default" asChild className="rounded-full">
              <Link href="/auth">Login / Join</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
