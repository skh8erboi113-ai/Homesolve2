"use client";

import Link from "next/link";

export function Footer() {
  return (
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
                <li><Link href="/list-property" className="hover:text-primary transition-colors">Free Valuation</Link></li>
                <li><Link href="/properties" className="hover:text-primary transition-colors">Browse Deals</Link></li>
                <li><Link href="/investor-join" className="hover:text-primary transition-colors">Investor Network</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">How it Works</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Support</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Coverage</h4>
              <ul className="space-y-2 text-sm text-muted-foreground text-xs">
                <li>Nationwide</li>
                <li>All 50 States</li>
                <li>Major Metros</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} HomeSolve. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/privacy" className="hover:underline">Equal Housing Opportunity</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
