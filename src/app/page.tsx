import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, BarChart3, Users, MapPin } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-house");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-40">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center rounded-full border bg-accent/10 px-3 py-1 text-sm font-medium text-primary mb-6 animate-in fade-in slide-in-from-bottom-3 duration-1000">
              <span className="mr-2">✨</span>
              Solving foreclosure challenges with AI-powered solutions
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              Sell Your Home Faster When <span className="text-primary underline decoration-accent underline-offset-8">Timing Matters Most</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              HomeSolve connects homeowners facing foreclosure with qualified investors for quick, fair transactions across Texas. Skip the uncertainty of the traditional market.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="h-12 px-8 rounded-full text-lg shadow-lg">
                <Link href="/list-property">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-8 rounded-full text-lg">
                <Link href="/properties">Browse Listings</Link>
              </Button>
            </div>
          </div>
          
          <div className="container mx-auto px-4 mt-16 max-w-5xl">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border aspect-[21/9]">
              <Image 
                src={heroImage?.imageUrl || "https://picsum.photos/seed/home1/1200/600"} 
                alt="Modern House" 
                fill 
                className="object-cover"
                data-ai-hint="modern house"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Focus Section */}
        <section className="py-12 bg-accent/5 border-y">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <p className="font-bold">Primary Focus</p>
                <p className="text-sm text-muted-foreground">Texas: Austin, Dallas, Houston, San Antonio</p>
              </div>
            </div>
            <div className="h-8 w-px bg-border hidden md:block"></div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <div>
                <p className="font-bold">Verified Network</p>
                <p className="text-sm text-muted-foreground">2,500+ Professional Cash Buyers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold font-headline mb-4">Why HomeSolve?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                We've built the ultimate toolkit to help you navigate property transitions under pressure.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl border bg-background hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Quick-Sale Valuation</h3>
                <p className="text-muted-foreground">
                  Our advanced AI analyzes your property and market trends to give you a realistic cash-offer expectation in seconds.
                </p>
              </div>
              
              <div className="p-8 rounded-2xl border bg-background hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent-foreground mb-6">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Verified Buyer Network</h3>
                <p className="text-muted-foreground">
                  Instantly access a pool of pre-vetted investors looking to close quickly, often without traditional financing hurdles.
                </p>
              </div>
              
              <div className="p-8 rounded-2xl border bg-background hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure Negotiations</h3>
                <p className="text-muted-foreground">
                  Communicate and manage offers through our secure in-app messaging system. Privacy and professional handling guaranteed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats / Proof Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">$50M+</div>
                <div className="text-primary-foreground/70">Property Value Sold</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">14-21 Days</div>
                <div className="text-primary-foreground/70">Avg. Time to Close</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">2,500+</div>
                <div className="text-primary-foreground/70">Registered Investors</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-primary-foreground/70">Successful Closures</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="rounded-3xl bg-accent/20 p-12 text-center border-2 border-accent/20">
              <h2 className="text-3xl font-bold font-headline mb-6">Ready to find your solution?</h2>
              <p className="text-lg mb-8 text-foreground/80 max-w-2xl mx-auto">
                Join thousands of homeowners and investors in Texas today. Our platform provides the transparency and speed you need.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild className="rounded-full px-10 h-14 bg-primary text-lg">
                  <Link href="/list-property">List My Property</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full px-10 h-14 text-lg">
                  <Link href="/properties">Search Properties</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground font-bold text-xs">
              H
            </div>
            <span className="text-lg font-bold tracking-tight text-primary">HomeSolve</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
            HomeSolve is an AI-powered marketplace that bridges the gap between homeowners facing foreclosure and professional real estate investors. We provide instant AI-driven property valuations, verified lead flow, and secure messaging to facilitate fast, fair property transitions.
          </p>
          <div className="flex justify-center space-x-6 text-sm font-medium text-muted-foreground mb-8">
            <Link href="/properties" className="hover:text-primary transition-colors">Properties</Link>
            <Link href="/about" className="hover:text-primary transition-colors">How it Works</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} HomeSolve. All rights reserved. Real Estate License #123456789. Primary focus: Texas.
          </p>
        </div>
      </footer>
    </div>
  );
}