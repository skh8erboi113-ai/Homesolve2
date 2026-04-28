
"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ShieldCheck, TrendingUp, DollarSign, Building, Search, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/firebase";

export default function InvestorJoinPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { user: _user } = useUser();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to save investor profile
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Application Received!",
        description: "Our team will verify your credentials within 24 hours.",
      });
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold font-headline mb-3 text-primary">Join the Investor Network</h1>
            <p className="text-muted-foreground text-lg">Gain exclusive access to pre-foreclosure leads and AI analysis tools.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <Card className="border-t-4 border-t-accent shadow-lg">
                <CardHeader>
                  <CardTitle>Professional Profile</CardTitle>
                  <CardDescription>Tell us about your investment strategy to get personalized lead alerts.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input id="company" placeholder="e.g., Summit Real Estate Group" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="license">Real Estate License # (Optional)</Label>
                        <Input id="license" placeholder="RE-12345678" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="buybox">Your "Buy Box" Preferences</Label>
                      <Textarea 
                        id="buybox" 
                        placeholder="e.g., Single-family homes in Georgia, $100k-$400k range, 15%+ equity margin..." 
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="volume">Expected Monthly Volume</Label>
                        <Input id="volume" type="number" placeholder="1-5 deals" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="capital">Available Capital</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input id="capital" className="pl-10" placeholder="e.g., 500,000" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-3">
                      <ShieldCheck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div className="text-xs text-muted-foreground leading-relaxed">
                        By submitting this application, you agree to undergo our standard verification process. Verified investors get 24-hour priority access to new listings.
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-6">
                    <Button type="submit" className="w-full h-12 text-lg rounded-full" disabled={loading}>
                      {loading ? "Processing..." : "Submit Application"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-bold text-xl">Member Benefits</h3>
                {[
                  { icon: TrendingUp, title: "Early Access", text: "View properties 24 hours before the general public." },
                  { icon: Building, title: "Risk Reports", text: "AI-generated foreclosure risk and equity analysis." },
                  { icon: Search, title: "Custom Search", text: "Automated alerts for homes matching your buy box." },
                  { icon: CheckCircle2, title: "Verified Leads", text: "Every listing is verified by our AI for accuracy." }
                ].map((benefit, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      <benefit.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{benefit.title}</h4>
                      <p className="text-xs text-muted-foreground">{benefit.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-lg">Need Assistance?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm opacity-90">Our investor relations team is here to help you set up your portfolio at scale.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20 text-white">Contact Support</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
