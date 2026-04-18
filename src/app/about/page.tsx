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
  DollarSign
} from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
  const homeownerSteps = [
    {
      icon: FileText,
      title: "1. Provide Property Details",
      description: "Enter your home's address and basic information. Our platform is designed to handle sensitive situations with complete privacy."
    },
    {
      icon: TrendingUp,
      title: "2. Get AI Valuation",
      description: "Our proprietary AI analyzes real-time market data and foreclosure trends to provide a realistic 'quick-sale' value instantly."
    },
    {
      icon: Users,
      title: "3. Connect with Buyers",
      description: "Your listing is shared with our pre-vetted network of professional investors who specialize in fast-closing transactions."
    },
    {
      icon: Handshake,
      title: "4. Receive & Close",
      description: "Review cash offers with no obligation. Once you accept, we help facilitate a fast closing, often in as little as 14 days."
    }
  ];

  const investorSteps = [
    {
      icon: Search,
      title: "1. Browse Opportunities",
      description: "Access a curated feed of properties nearing foreclosure. Filter by location, urgency, and estimated equity."
    },
    {
      icon: ShieldCheck,
      title: "2. Verified Analytics",
      description: "View detailed AI-driven property reports, including condition assessments and historical market performance."
    },
    {
      icon: DollarSign,
      title: "3. Make Cash Offers",
      description: "Submit offers directly through the platform. Our standardized process ensures clear communication and transparency."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <header className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6">How HomeSolve Works</h1>
          <p className="text-xl text-muted-foreground">
            We bridge the gap between motivated sellers and professional buyers, creating a transparent marketplace for time-sensitive real estate.
          </p>
        </header>

        {/* Homeowner Section */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
              <HomeIcon className="h-5 w-5" />
            </div>
            <h2 className="text-3xl font-bold font-headline">For Homeowners</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {homeownerSteps.map((step, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-8 text-center md:text-left">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 mx-auto md:mx-0">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Investor Section */}
        <section className="mb-24 bg-accent/5 rounded-3xl p-8 md:p-12 border border-accent/20">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h2 className="text-3xl font-bold font-headline">For Investors</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {investorSteps.map((step, i) => (
              <div key={i} className="space-y-4">
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-accent shadow-sm">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust & Stats */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-headline text-primary leading-tight">Built on Transparency and Speed</h2>
            <p className="text-muted-foreground text-lg">
              Facing foreclosure is stressful. We remove the uncertainty of the traditional retail market by providing immediate liquidity through verified channels.
            </p>
            <ul className="space-y-4">
              {[
                { icon: Clock, text: "Closing as fast as 14 business days" },
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

function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
