"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  ShieldCheck, 
  Clock, 
  Users, 
  ArrowRight as _ArrowRight,
  DollarSign,
  Zap,
  Sparkles,
  BarChart3,
  MapPin,
  Target
} from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
  const painPoints = [
    {
      title: "The Timing Trap",
      description: "Traditional sales take 60-90 days. Banks move in 30. We solve the urgency crisis by closing in 14-21 days.",
      icon: Clock
    },
    {
      title: "The Valuation Void",
      description: "Knowing a 'quick-sale' price vs. a retail price is hard. Our AI provides instant, realistic market estimates.",
      icon: DollarSign
    },
    {
      title: "The Trust Gap",
      description: "Avoid predatory low-ballers. Our platform uses a vetted investor network and secure messaging to protect you.",
      icon: ShieldCheck
    }
  ];

  const coreBenefits = [
    {
      title: "Equity Preservation",
      description: "Sellers can salvage their home's value before a foreclosure auction wipes it out completely.",
      icon: Target
    },
    {
      title: "Speed & Certainty",
      description: "Transactions close in 14-21 days with verified cash buyers, removing traditional financing stress.",
      icon: Clock
    },
    {
      title: "AI-Driven Transparency",
      description: "Both parties negotiate with confidence using data-backed valuations and risk analytics.",
      icon: Sparkles
    }
  ];

  const homeownerServices = [
    {
      icon: Zap,
      title: "AI Quick-Sale Valuation",
      description: "Get an instant market estimate tailored for fast-track sales, accounting for foreclosure urgency and local market trends."
    },
    {
      icon: Users,
      title: "Vetted Buyer Network",
      description: "Skip the open market. We connect you directly with professional investors ready to make cash offers immediately."
    },
    {
      icon: Clock,
      title: "Fast-Track Closing",
      description: "Our streamlined process aims to close transactions in 14-21 days, helping you meet bank deadlines and preserve equity."
    }
  ];

  const investorServices = [
    {
      icon: Search,
      title: "Premium Deal Flow",
      description: "Access high-intent leads nearing foreclosure. Pro members get 24-hour early access to the freshest opportunities."
    },
    {
      icon: BarChart3,
      title: "AI Risk Analytics",
      description: "Every listing includes an AI-generated analysis of foreclosure status, market risk, and potential equity upside."
    },
    {
      icon: Sparkles,
      title: "Marketing Kit",
      description: "Use our AI tools to generate high-converting outreach content for your acquisitions and flips."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <header className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6">Our Products & Services</h1>
          <p className="text-xl text-muted-foreground">
            HomeSolve is more than a marketplace; it's an AI-powered toolkit designed to solve the complexity of distressed real estate nationwide.
          </p>
        </header>

        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose HomeSolve?</h2>
            <p className="text-muted-foreground">We focus on speed, value, and data-driven results for everyone.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreBenefits.map((benefit, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-2xl bg-white border-2 border-primary/5 shadow-sm hover:border-primary/20 transition-all">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <benefit.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Problems We Solve</h2>
            <p className="text-muted-foreground">Navigating foreclosure is stressful. We remove the biggest hurdles.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {painPoints.map((point, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border shadow-sm">
                <div className="h-12 w-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-4">
                  <point.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{point.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24 p-8 bg-primary/5 rounded-2xl border border-primary/20 flex flex-col md:flex-row items-center gap-8">
           <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
             <MapPin className="h-8 w-8" />
           </div>
           <div>
             <h2 className="text-2xl font-bold mb-2">Our Nationwide Focus</h2>
             <p className="text-muted-foreground leading-relaxed">
               HomeSolve is currently operating across the **entire United States**. We focus on all markets where timing is critical for homeowners and opportunities are abundant for investors. No matter where you are, we've got you covered.
             </p>
           </div>
        </section>

        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">1</div>
            <h2 className="text-3xl font-bold font-headline">Services for Homeowners</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeownerServices.map((service, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-8">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button size="lg" className="rounded-full px-10 h-12" asChild>
              <Link href="/list-property">Start Your Free Valuation Now</Link>
            </Button>
          </div>
        </section>

        <section className="mb-24 bg-accent/5 rounded-3xl p-8 md:p-12 border border-accent/20">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">2</div>
            <h2 className="text-3xl font-bold font-headline">Products for Investors</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {investorServices.map((service, i) => (
              <div key={i} className="space-y-4">
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-accent shadow-sm">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Button variant="outline" size="lg" className="rounded-full border-accent text-accent hover:bg-accent hover:text-white h-12" asChild>
              <Link href="/investor-join">Apply for Investor Access</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
