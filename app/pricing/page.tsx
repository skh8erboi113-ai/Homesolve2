
"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Building2, UserCircle2 } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const tiers = [
    {
      name: "Homeowners",
      price: "$0",
      description: "Get out of foreclosure fast.",
      features: [
        "AI Quick-Sale Valuation",
        "Direct Investor Matching",
        "Secure Messaging",
        "1.5% Closing Commission*",
        "No Upfront Fees"
      ],
      cta: "List for Free",
      href: "/list-property",
      icon: UserCircle2,
      highlight: false
    },
    {
      name: "Pro Investor",
      price: "$199",
      period: "/month",
      description: "For serious real estate pros.",
      features: [
        "Early Lead Access (24h)",
        "Advanced AI Risk Reports",
        "Bulk Offer Management",
        "Verified Seller Direct-Dial",
        "Priority Support"
      ],
      cta: "Start Pro Trial",
      href: "/dashboard",
      icon: Zap,
      highlight: true
    },
    {
      name: "Institutional",
      price: "Custom",
      description: "For large hedge funds & REITs.",
      features: [
        "API Data Access",
        "White-label Reports",
        "Dedicated Portfolio Manager",
        "Custom Underwriting Rules",
        "Volume Fee Discounts"
      ],
      cta: "Contact Sales",
      href: "/contact",
      icon: Building2,
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6">Simple, Performance-Based Pricing</h1>
          <p className="text-xl text-muted-foreground">
            We only profit when you succeed. HomeSolve is free for homeowners to start, with premium tools for high-volume investors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <Card key={tier.name} className={`relative flex flex-col h-full border-2 ${tier.highlight ? 'border-primary shadow-xl scale-105' : 'border-border shadow-sm'}`}>
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <CardHeader className="text-center pt-8">
                <div className="mx-auto h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <tier.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div className="text-center">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.period && <span className="text-muted-foreground ml-1">{tier.period}</span>}
                </div>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pb-8">
                <Button 
                  asChild 
                  variant={tier.highlight ? "default" : "outline"} 
                  className="w-full rounded-full h-11"
                >
                  <Link href={tier.href}>{tier.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-20 p-8 rounded-3xl bg-accent/5 border border-accent/20 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">The Performance Fee Model</h2>
          <p className="text-muted-foreground">
            *HomeSolve collects a 1.5% success fee from the final sales price of any property closed through our platform. 
            This ensures our AI and support teams are always incentivized to help sellers close the best possible deal in the shortest time.
          </p>
        </div>
      </main>
    </div>
  );
}
