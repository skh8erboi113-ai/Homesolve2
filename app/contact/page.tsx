"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate contact form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message Sent",
        description: "We'll get back to you within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold font-headline text-primary mb-4">Contact HomeSolve</h1>
          <p className="text-xl text-muted-foreground">
            Have questions about a listing or our investor network? We're here to help.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Our team is available Monday-Friday, 9am - 6pm EST.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium opacity-70">Email Us</p>
                    <p className="font-bold">support@homesolve.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium opacity-70">Call Us</p>
                    <p className="font-bold">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium opacity-70">Visit Us</p>
                    <p className="font-bold">123 Tech Plaza, Austin, TX</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Follow Our Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Join 5,000+ real estate professionals receiving our weekly foreclosure market analysis.
                </p>
                <Button variant="outline" className="w-full rounded-full">Subscribe to Newsletter</Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2 shadow-lg border-t-4 border-t-accent">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>We usually respond within one business day.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Jane Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="jane@example.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Type your message here..." className="min-h-[150px]" required />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full h-12 rounded-full text-lg" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                  Send Message
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
