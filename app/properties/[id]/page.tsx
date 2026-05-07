import PropertyDetailsClient from "./PropertyDetailsClient";

export function generateStaticParams() {
  // For a dynamic marketplace with 'output: export',
  // we can pre-render a fallback/loading state or a known set of IDs.
  // In a real app, you might fetch active listing IDs here.
  return [{ id: 'loading' }];
}

export default function PropertyDetailsPage({ params }: { params: any }) {
import type { Metadata, ResolvingMetadata } from "next";
import PropertyDetailsClient from "./PropertyDetailsClient";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "Foreclosure Opportunity | HomeSolve",
  };
}

export function generateStaticParams() {
  return [];
}

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  return <PropertyDetailsClient params={params} />;
}
