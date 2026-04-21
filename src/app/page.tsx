import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, Users, MapPin, Clock, DollarSign, TrendingUp, Sparkles, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-house");

  const painPoints = [
    {
      title: "The Timing Trap",
      description: "Banks move in 30 days. Traditional sales take 90. We close the gap with a 14-21 day cycle.",
      icon: Clock
    },
    {
      title: "The Valuation Void",
      description: "Guesswork leads to low-ball offers. Our AI provides instant, realistic market estimates.",
      icon: DollarSign
    },
    {
      title: "The Trust Gap",
      description: "Avoid predatory 'we buy houses' schemes. Use our vetted network and secure platform.",
      icon: ShieldCheck
    }
  ];

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
              <Button size="lg" asChild className="h-14 px-10 rounded-full text-lg shadow-lg bg-primary hover:bg-primary/90">
                <Link href="/list-property">
                  Start Your Free Valuation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-14 px-10 rounded-full text-lg">
                <Link href="/properties">Browse Investment Leads</Link>
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

        {/* Pain Points Section */}
        <section className="py-24 bg-accent/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-headline mb-4 text-primary">Stop the Foreclosure Stress</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-16">Traditional real estate isn't built for urgency. We are.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {painPoints.map((point, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl border shadow-sm text-left">
                  <div className="h-12 w-12 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-6">
                    <point.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{point.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-white border-y">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold font-headline mb-4 text-primary">Why Choose HomeSolve?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform is designed to provide maximum value for both homeowners and professional investors.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="h-16 w-16 bg-white text-primary rounded-full flex items-center justify-center shadow-sm">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Equity Preservation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Avoid the total loss of a bank foreclosure. Sell quickly and walk away with your remaining equity to start your next chapter.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl bg-accent/5 border border-accent/10">
                <div className="h-16 w-16 bg-white text-accent rounded-full flex items-center justify-center shadow-sm">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Speed & Certainty</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Close in 14-21 days. We skip traditional financing delays, providing you with verified cash offers and a guaranteed timeline.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="h-16 w-16 bg-white text-primary rounded-full flex items-center justify-center shadow-sm">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">AI-Driven Transparency</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Gain confidence with instant, data-backed AI valuations. Know your home's true worth today without waiting for an appraisal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Focus Section */}
        <section className="py-12 bg-accent/5 border-b">
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

        {/* Call to Action */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="rounded-3xl bg-primary p-12 text-center text-white border-2 border-primary/20 shadow-2xl">
              <h2 className="text-3xl font-bold font-headline mb-6">Ready to find your solution?</h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of homeowners and investors in Texas today. Our platform provides the transparency and speed you need to move forward.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild variant="secondary" className="rounded-full px-10 h-14 text-lg">
                  <Link href="/list-property">Get My Free Valuation</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full px-10 h-14 text-lg bg-transparent border-white text-white hover:bg-white hover:text-primary">
                  <Link href="/investor-join">Join the Investor Network</Link>
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