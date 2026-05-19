import PropertyDetailsClient from "./PropertyDetailsClient";

export default function PropertyDetailsPage({ params }: { params: any }) {
  return <PropertyDetailsClient id={params.id} />;
}
