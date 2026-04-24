import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from "@/firebase";

export const metadata: Metadata = {
  title: 'HomeSolve - AI-Powered Foreclosure Solutions',
  description: 'Connect with homeowners facing foreclosure and qualified real estate investors for quick, fair transactions nationwide.',
  metadataBase: new URL('https://studio-4450623487-72853.web.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'HomeSolve - Nationwide Foreclosure Solutions',
    description: 'Protect your equity with AI valuations and verified cash buyers.',
    url: 'https://studio-4450623487-72853.web.app',
    siteName: 'HomeSolve',
    images: [
      {
        url: 'https://picsum.photos/seed/home1/1200/630',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-accent/30">
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}