import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The property or page you are looking for might have been moved or is no longer available.
        </p>
        <Button asChild className="rounded-full px-8">
          <Link href="/">Return Home</Link>
        </Button>
      </main>
    </div>
  );
}