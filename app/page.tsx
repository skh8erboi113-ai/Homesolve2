
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Clock, DollarSign, TrendingUp, Sparkles, MapPin, CheckCircle2 } from "lucide-react";
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
            <div className="inline-flex items-center rounded-full border bg-accent/10 px-4 py-1.5 text-sm font-semibold text-primary mb-8 animate-in fade-in slide-in-from-bottom-3 duration-1000">
              <Sparkles className="mr-2 h-4 w-4" />
              Now serving homeowners and investors nationwide
            </div>
            <h1 className="text-4xl md:text-7xl font-bold font-headline tracking-tight mb-8 max-w-5xl mx-auto leading-tight">
              A Smarter Way Out of <span className="text-primary italic">Foreclosure</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect with verified cash buyers and get an instant AI valuation. We help homeowners nationwide protect their equity and close in as little as 14 days.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" asChild className="h-16 px-12 rounded-full text-xl shadow-xl bg-primary hover:bg-primary/90 transition-all hover:scale-105">
                <Link href="/list-property">
                  Get Free AI Valuation <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-16 px-12 rounded-full text-xl hover:bg-accent/5">
                <Link href="/properties">Browse Investment Leads</Link>
              </Button>
            </div>
          </div>
          
          <div className="container mx-auto px-4 mt-20 max-w-5xl">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[21/9]">
              <Image 
                src={heroImage?.imageUrl || "https://picsum.photos/seed/home1/1200/600"} 
                alt="Modern Family Home" 
                fill 
                className="object-cover"
                data-ai-hint="luxury house"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                <span className="font-semibold text-lg">Nationwide Coverage</span>
              </div>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-12 border-y bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Vetted Investors", val: "10,000+" },
                { label: "Closing Days", val: "14-21" },
                { label: "Availability", val: "All 50 States" },
                { label: "AI Accuracy", val: "98.5%" }
              ].map((m, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-3xl font-bold text-primary">{m.val}</div>
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold font-headline mb-4 text-primary">Stop the Foreclosure Stress</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-20 text-lg">Traditional real estate isn't built for your timeline. We are.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {painPoints.map((point, index) => (
                <div key={index} className="bg-white p-10 rounded-3xl border border-primary/5 shadow-sm text-left hover:shadow-md transition-shadow">
                  <div className="h-14 w-14 bg-destructive/10 text-destructive rounded-2xl flex items-center justify-center mb-8">
                    <point.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{point.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
            <h2 className="text-4xl font-bold font-headline mb-8">Ready to secure your home's value?</h2>
            <p className="text-xl mb-12 opacity-90 leading-relaxed">
              Don't let the clock run out. Join the marketplace that puts speed and fairness first.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" asChild variant="secondary" className="h-16 px-12 rounded-full text-xl font-bold hover:scale-105 transition-transform">
                <Link href="/list-property">Start Free Valuation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} HomeSolve. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
