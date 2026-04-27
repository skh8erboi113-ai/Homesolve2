"use client";

import { Navbar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using HomeSolve, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services."
    },
    {
      title: "2. Description of Service",
      content: "HomeSolve provides an AI-powered marketplace connecting homeowners facing foreclosure with real estate investors. We provide valuation tools, messaging, and transaction tracking."
    },
    {
      title: "3. User Responsibilities",
      content: "Users are responsible for the accuracy of the information they provide. Homeowners must disclose the accurate status of their foreclosure. Investors must have the funds available for cash transactions as represented."
    },
    {
      title: "4. Platform Fees",
      content: "HomeSolve charges a 1.5% performance fee on the final sale price of properties closed through the platform. This fee is due upon the successful closing of the transaction."
    },
    {
      title: "5. Limitation of Liability",
      content: "HomeSolve is a marketplace and toolkit. We do not guarantee the sale of any property or the performance of any transaction. Users are encouraged to seek independent legal and financial advice."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
            <FileText className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold font-headline text-primary mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last Updated: June 15, 2024</p>
        </div>

        <div className="bg-white rounded-2xl border p-8 md:p-12 shadow-sm space-y-12">
          <section className="prose prose-slate max-w-none">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Please read these terms carefully before using the HomeSolve platform. These terms govern your access to and use of our website and mobile applications.
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
            <h2 className="text-xl font-bold text-primary mb-3">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please contact us at legal@homesolve.com.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
