import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from "@/firebase";
import AppUrlListener from "./AppUrlListener";

export const metadata: Metadata = {
  title: 'HomeSolve - AI-Powered Foreclosure Solutions',
  description: 'Connect with homeowners facing foreclosure and qualified real estate investors for quick, fair transactions nationwide.',
  metadataBase: new URL('https://studio-4450623487-72853.web.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'HomeSolve - AI-Powered Foreclosure Solutions',
    description: 'The smarter way out of foreclosure. Protect your equity with AI valuations and verified cash buyers nationwide.',
    url: 'https://studio-4450623487-72853.web.app',
    siteName: 'HomeSolve',
    images: [
      {
        url: 'https://picsum.photos/seed/home1/1200/630',
        width: 1200,
        height: 630,
        alt: 'HomeSolve - Smarter Foreclosure Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HomeSolve | Nationwide Foreclosure Solutions',
    description: 'Protect your equity with AI valuations and verified cash buyers. Fast, fair, and secure.',
    images: ['https://picsum.photos/seed/home1/1200/630'],
    creator: '@HomeSolve',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'HomeSolve',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: '#1F9BA6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PNGMBJC6');`,
          }}
        />
        {/* End Google Tag Manager */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-accent/30">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PNGMBJC6"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <FirebaseClientProvider>
          <AppUrlListener />
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
