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

        {/* Core Value Props */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="flex-1 space-y-8">
                <h2 className="text-4xl font-bold font-headline leading-tight">Built for Speed. <br/>Backed by <span className="text-accent underline decoration-primary underline-offset-4">AI Intelligence</span>.</h2>
                <div className="space-y-6">
                  {[
                    { title: "Equity Preservation", text: "Avoid the total loss of a bank auction. Sell quickly and walk away with your remaining equity.", icon: CheckCircle2 },
                    { title: "Verified Cash Buyers", text: "Every investor on HomeSolve is vetted for proof of funds and closing history.", icon: ShieldCheck },
                    { title: "Anonymous Messaging", text: "Communicate securely with potential buyers without disclosing private contact details until you're ready.", icon: Sparkles }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1 shrink-0">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{item.title}</h4>
                        <p className="text-muted-foreground">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full max-w-lg aspect-square bg-primary/5 rounded-[4rem] flex items-center justify-center border p-8 relative">
                 <div className="absolute -top-4 -right-4 bg-white p-6 rounded-3xl shadow-xl border animate-bounce duration-[3000ms]">
                    <TrendingUp className="h-10 w-10 text-accent mb-2" />
                    <div className="font-bold text-xl">$12.4k</div>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold">Equity Saved This Week</div>
                 </div>
                 <div className="bg-white w-full h-full rounded-[3rem] shadow-inner p-10 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold mb-6 text-primary">Your Quick-Sale Partner</h3>
                    <p className="text-muted-foreground text-lg mb-8 italic">"HomeSolve helped us settle our debt and walk away with $24,000 in equity just 12 days before the scheduled auction. They literally saved our credit."</p>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-slate-200"></div>
                      <div>
                        <div className="font-bold">The Miller Family</div>
                        <div className="text-xs text-muted-foreground">Verified Homeowner</div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 p-20 opacity-10">
            <Sparkles className="h-96 w-96 rotate-12" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
            <h2 className="text-4xl font-bold font-headline mb-8">Ready to secure your home's value?</h2>
            <p className="text-xl mb-12 opacity-90 leading-relaxed">
              Don't let the clock run out. Join the marketplace that puts speed and fairness first, no matter where you are located.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" asChild variant="secondary" className="h-16 px-12 rounded-full text-xl font-bold hover:scale-105 transition-transform">
                <Link href="/list-property">Start Free Valuation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-16 px-12 rounded-full text-xl bg-transparent border-white text-white hover:bg-white hover:text-primary">
                <Link href="/contact">Speak with a Specialist</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
            <div className="max-w-sm space-y-6">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
                  H
                </div>
                <span className="text-2xl font-bold tracking-tight text-primary">HomeSolve</span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Empowering homeowners with AI technology and a verified investor network. We bridge the gap between financial distress and a fresh start nationwide.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/list-property" className="hover:text-primary">Free Valuation</Link></li>
                  <li><Link href="/properties" className="hover:text-primary">Browse Deals</Link></li>
                  <li><Link href="/investor-join" className="hover:text-primary">Investor Network</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/about" className="hover:text-primary">How it Works</Link></li>
                  <li><Link href="/contact" className="hover:text-primary">Support</Link></li>
                  <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Coverage</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Nationwide</li>
                  <li>All 50 States</li>
                  <li>Major Metros</li>
                  <li>Rural Areas</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} HomeSolve. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:underline">Terms of Service</Link>
              <Link href="/privacy" className="hover:underline">Equal Housing Opportunity</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
