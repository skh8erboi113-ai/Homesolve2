"use client";

import { Navbar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us when you create an account, list a property, or communicate with other users. This includes property addresses, financial status related to foreclosures, and personal contact details."
    },
    {
      title: "2. How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, including to generate AI-driven valuations, connect homeowners with investors, and facilitate secure communications."
    },
    {
      title: "3. Sharing of Information",
      content: "Property details and foreclosure status are shared with verified investors on our platform. We do not sell your personal information to third parties for marketing purposes. Your contact information is only shared when you explicitly agree to a negotiation or offer."
    },
    {
      title: "4. Data Security",
      content: "We implement robust security measures to protect your data. All financial information is encrypted using industry-standard SSL technology. Access to sensitive property data is restricted to verified users only."
    },
    {
      title: "5. Your Rights",
      content: "You have the right to access, correct, or delete your personal data at any time through your dashboard settings. You may also request a complete export of your data or withdrawal of consent for certain processing activities."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold font-headline text-primary mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last Updated: June 15, 2024</p>
        </div>

        <div className="bg-white rounded-2xl border p-8 md:p-12 shadow-sm space-y-12">
          <section className="prose prose-slate max-w-none">
            <p className="text-lg leading-relaxed text-muted-foreground">
              At HomeSolve, your privacy is our priority. This policy explains how we collect, use, and protect your data when you use our platform to navigate real estate transitions.
            </p>
          </section>

          <Separator />

          {sections.map((section, i) => (
            <section key={i} className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}

          <Separator />

          <section className="bg-primary/5 p-6 rounded-xl border border-primary/10">
            <h2 className="text-xl font-bold text-primary mb-3">Questions?</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy or our data practices, please contact our privacy team at privacy@homesolve.com.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
