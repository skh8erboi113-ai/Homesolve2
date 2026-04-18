"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, PlusCircle, MessageSquare, LayoutDashboard } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
            H
          </div>
          <span className="text-xl font-bold tracking-tight font-headline text-primary">HomeSolve</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/properties" className="hover:text-primary transition-colors flex items-center gap-1">
            <Search className="h-4 w-4" /> Browse
          </Link>
          <Link href="/list-property" className="hover:text-primary transition-colors flex items-center gap-1">
            <PlusCircle className="h-4 w-4" /> Sell Your Home
          </Link>
          <Link href="/dashboard" className="hover:text-primary transition-colors flex items-center gap-1">
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/messages" className="hidden sm:flex text-muted-foreground hover:text-primary transition-colors">
            <MessageSquare className="h-5 w-5" />
          </Link>
          <Button variant="default" asChild className="rounded-full">
            <Link href="/dashboard">Login / Join</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}