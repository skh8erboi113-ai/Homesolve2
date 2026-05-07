import PropertyDetailsClient from "./PropertyDetailsClient";

export function generateStaticParams() {
  // For a dynamic marketplace with 'output: export',
  // we can pre-render a fallback/loading state or a known set of IDs.
  // In a real app, you might fetch active listing IDs here.
  return [{ id: 'loading' }];
}

export default function PropertyDetailsPage({ params }: { params: any }) {
  return <PropertyDetailsClient params={params} />;
}
