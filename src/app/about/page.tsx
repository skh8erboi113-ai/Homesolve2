"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  TrendingUp, 
  Handshake, 
  ShieldCheck, 
  Clock, 
  Users, 
  ArrowRight,
  FileText,
  DollarSign,
  Zap,
  Sparkles,
  BarChart3,
  MapPin
} from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
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
            HomeSolve is more than a marketplace; it's an AI-powered toolkit designed to solve the complexity of distressed real estate.
          </p>
        </header>

        {/* Geographical Focus */}
        <section className="mb-24 p-8 bg-primary/5 rounded-2xl border border-primary/20 flex flex-col md:flex-row items-center gap-8">
           <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
             <MapPin className="h-8 w-8" />
           </div>
           <div>
             <h2 className="text-2xl font-bold mb-2">Our Geographical Focus</h2>
             <p className="text-muted-foreground leading-relaxed">
               HomeSolve is currently operating primarily in the **Texas triangle** (Austin, Dallas, Houston, San Antonio). We focus on these high-growth markets where timing is critical for homeowners and opportunities are abundant for investors.
             </p>
           </div>
        </section>

        {/* Homeowner Section */}
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
            <Button size="lg" className="rounded-full px-10" asChild>
              <Link href="/list-property">Get Started for Free</Link>
            </Button>
          </div>
        </section>

        {/* Investor Section */}
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
            <Button variant="outline" size="lg" className="rounded-full border-accent text-accent hover:bg-accent hover:text-white" asChild>
              <Link href="/investor-join">Join the Network</Link>
            </Button>
          </div>
        </section>

        {/* Trust & Comparison */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-headline text-primary leading-tight">Built on Transparency and Speed</h2>
            <p className="text-muted-foreground text-lg">
              Facing foreclosure is stressful. We remove the uncertainty of the traditional retail market by providing immediate liquidity through verified channels.
            </p>
            <ul className="space-y-4">
              {[
                { icon: Clock, text: "Closing as fast as 14-21 business days" },
                { icon: ShieldCheck, text: "Vetted and verified buyer network" },
                { icon: Users, text: "Direct communication with stakeholders" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-medium">
                  <item.icon className="h-5 w-5 text-accent" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-8 rounded-2xl border shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4">
               <ShieldCheck className="h-20 w-20 text-accent/10 -mr-4 -mt-4 rotate-12" />
             </div>
             <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-end border-b pb-4">
                  <span className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">Typical Sale</span>
                  <span className="text-xl font-bold">60-90 Days</span>
                </div>
                <div className="flex justify-between items-end border-b pb-4">
                  <span className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">HomeSolve Sale</span>
                  <span className="text-xl font-bold text-accent">14-21 Days</span>
                </div>
                <div className="pt-4">
                  <Button className="w-full rounded-full h-12 text-lg" asChild>
                    <Link href="/list-property">
                      Start Your Valuation <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}