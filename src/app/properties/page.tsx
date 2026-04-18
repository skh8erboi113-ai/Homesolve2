"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Search, MapPin, BedDouble, Bath, Square, Filter, TrendingDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MOCK_PROPERTIES = [
  {
    id: "1",
    address: "452 Oak Avenue, Springfield",
    type: "Single Family",
    price: 345000,
    estimate: 320000,
    beds: 3,
    baths: 2,
    sqft: 1850,
    status: "Pre-foreclosure",
    image: PlaceHolderImages.find(img => img.id === "house-listing-1")?.imageUrl,
    urgency: "High"
  },
  {
    id: "2",
    address: "88 Skyline Terrace, West End",
    type: "Condo",
    price: 215000,
    estimate: 195000,
    beds: 2,
    baths: 1,
    sqft: 1100,
    status: "Notice of Default",
    image: PlaceHolderImages.find(img => img.id === "house-listing-2")?.imageUrl,
    urgency: "Moderate"
  },
  {
    id: "3",
    address: "12 Heritage Lane, Brookside",
    type: "Townhouse",
    price: 289000,
    estimate: 265000,
    beds: 3,
    baths: 2.5,
    sqft: 1600,
    status: "Auction Scheduled",
    image: PlaceHolderImages.find(img => img.id === "house-listing-3")?.imageUrl,
    urgency: "Critical"
  },
  {
    id: "4",
    address: "701 Pine Street, Pineville",
    type: "Single Family",
    price: 420000,
    estimate: 395000,
    beds: 4,
    baths: 3,
    sqft: 2400,
    status: "Pre-foreclosure",
    image: PlaceHolderImages.find(img => img.id === "hero-house")?.imageUrl,
    urgency: "Moderate"
  }
];

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-headline text-primary">Opportunity Search</h1>
            <p className="text-muted-foreground">Find properties nearing foreclosure for quick-sale investment opportunities.</p>
          </div>
          <div className="flex w-full md:w-auto items-center gap-2">
             <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search location or status..." 
                  className="pl-10 h-11 rounded-full bg-white shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <Button variant="outline" className="h-11 px-5 rounded-full bg-white shadow-sm">
                <Filter className="mr-2 h-4 w-4" /> Filters
             </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PROPERTIES.map((property) => (
            <Link href={`/properties/${property.id}`} key={property.id}>
              <Card className="overflow-hidden h-full group transition-all hover:shadow-xl border-2 hover:border-primary/20">
                <div className="relative h-60 w-full">
                  <Image 
                    src={property.image || "https://picsum.photos/seed/home/600/400"} 
                    alt={property.address} 
                    fill 
                    className="object-cover transition-transform group-hover:scale-105 duration-500"
                    data-ai-hint="property house"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-primary shadow-lg border-none">{property.status}</Badge>
                    {property.urgency === "Critical" && (
                      <Badge variant="destructive" className="shadow-lg border-none animate-pulse">Critical Urgency</Badge>
                    )}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl truncate pr-4">{property.address}</h3>
                    <div className="text-right">
                      <div className="text-primary font-bold text-lg">${property.price.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground line-through decoration-destructive">${(property.price * 1.15).toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground text-sm mb-6">
                    <MapPin className="h-4 w-4 mr-1 text-accent" /> Springfield, IL
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-dashed border-border/60 mb-6">
                    <div className="flex items-center flex-col text-center">
                      <BedDouble className="h-4 w-4 mb-1 text-primary/60" />
                      <span className="text-sm font-semibold">{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center flex-col text-center border-x">
                      <Bath className="h-4 w-4 mb-1 text-primary/60" />
                      <span className="text-sm font-semibold">{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center flex-col text-center">
                      <Square className="h-4 w-4 mb-1 text-primary/60" />
                      <span className="text-sm font-semibold">{property.sqft} sqft</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-1.5 text-accent font-medium text-sm">
                        <TrendingDown className="h-4 w-4" />
                        AI Estimated Value: ${property.estimate.toLocaleString()}
                     </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  <Button className="w-full rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                    View Opportunity Details
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}