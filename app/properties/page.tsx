"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Search, MapPin, Filter, TrendingDown, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const db = useFirestore();

  const propertiesQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(
      collection(db, "public_property_listings"),
      where("status", "==", "active"),
      orderBy("createdAt", "desc")
    );
  }, [db]);

  const { data: properties, isLoading } = useCollection(propertiesQuery);

  const filteredProperties = properties?.filter(p => 
    p.addressStreet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.addressCity?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold font-headline text-primary">Opportunity Search</h1>
            <p className="text-muted-foreground">Find quick-sale properties nationwide.</p>
          </div>
          <div className="flex w-full md:w-auto items-center gap-2">
             <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search location..." className="pl-10 h-11 rounded-full bg-white shadow-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
             </div>
             <Button variant="outline" className="h-11 px-5 rounded-full"><Filter className="h-4 w-4" /></Button>
          </div>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Fetching opportunities...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
            <h3 className="text-xl font-bold mb-2">No active opportunities found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <Link href={`/properties/${property.id}`} key={property.id}>
                <Card className="overflow-hidden h-full group hover:shadow-xl border-2 transition-all">
                  <div className="relative h-60 w-full">
                    <Image 
                      src={PlaceHolderImages.find(img => img.id.includes("house-listing"))?.imageUrl || "https://picsum.photos/seed/home/600/400"} 
                      alt={property.addressStreet} fill className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary shadow-lg uppercase">{property.foreclosureStatus}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-xl truncate">{property.addressStreet}</h3>
                      <div className="text-primary font-bold text-lg">${property.askingPrice?.toLocaleString()}</div>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm mb-4"><MapPin className="h-4 w-4 mr-1 text-accent" /> {property.addressCity}, {property.addressState}</div>
                    <div className="flex items-center gap-2 text-accent font-medium text-sm">
                      <TrendingDown className="h-4 w-4" /> AI Valued: ${property.aiQuickSaleValuation?.toLocaleString()}
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0">
                    <Button className="w-full rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white">Analyze Opportunity</Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}