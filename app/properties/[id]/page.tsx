import type { Metadata, ResolvingMetadata } from "next";
import PropertyDetailsClient from "./PropertyDetailsClient";

export async function generateMetadata(
  { params: _params }: { params: Promise<{ id: string }> },
  _parent: ResolvingMetadata
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
