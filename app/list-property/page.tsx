"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { homeownerQuickSaleValuation, HomeownerQuickSaleValuationOutput } from "@/ai/flows/homeowner-quick-sale-valuation";
import { Loader2, TrendingUp, Info, DollarSign, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useUser } from "@/firebase";
import { collection, serverTimestamp } from "firebase/firestore";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ListPropertyPage() {
  const { toast } = useToast();
  const router = useRouter();
  const db = useFirestore();
  const { user, isUserLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [valuation, setValuation] = useState<HomeownerQuickSaleValuationOutput | null>(null);

  const [formData, setFormData] = useState({
    address: "",
    propertyType: "house",
    squareFootage: 1500,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    condition: "good",
    yearBuilt: 2000,
    foreclosureStatus: "pre-foreclosure",
    urgency: "somewhat urgent",
    specialFeatures: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: ["squareFootage", "numberOfBedrooms", "numberOfBathrooms", "yearBuilt"].includes(name) 
        ? Number(value) 
        : value 
    }));
  };

  const handleValuation = async () => {
    if (!formData.address) {
      toast({
        title: "Missing Information",
        description: "Please enter the property address first.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const result = await homeownerQuickSaleValuation(formData);
      setValuation(result);
      toast({
        title: "Valuation Complete",
        description: "AI has estimated your property's quick-sale value.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate valuation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!user) {
      toast({ title: "Sign In Required", description: "Please sign in to publish.", variant: "destructive" });
      router.push("/auth");
      return;
    }

    if (!valuation) return;

    setPublishing(true);
    try {
      const listingData = {
        homeownerId: user.uid,
        title: `${formData.numberOfBedrooms} Bed ${formData.propertyType} in ${formData.address.split(',')[1]?.trim() || 'Your Area'}`,
        description: `Motivated sale. AI Estimated value is based on condition and status. ${formData.specialFeatures}`,
        addressStreet: formData.address.split(',')[0]?.trim() || formData.address,
        addressCity: formData.address.split(',')[1]?.trim() || "Unknown City",
        addressState: formData.address.split(',')[2]?.trim()?.split(' ')[0] || "ST",
        addressZip: formData.address.split(',')[2]?.trim()?.split(' ')[1] || "00000",
        propertyType: formData.propertyType,
        bedrooms: formData.numberOfBedrooms,
        bathrooms: formData.numberOfBathrooms,
        squareFootage: formData.squareFootage,
        lotSize: 0,
        yearBuilt: formData.yearBuilt,
        askingPrice: valuation.estimatedValue,
        foreclosureStatus: formData.foreclosureStatus,
        status: "active",
        aiQuickSaleValuation: valuation.estimatedValue,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      addDocumentNonBlocking(collection(db, "public_property_listings"), listingData);
      
      toast({ title: "Listing Published!", description: "Your property is now live." });
      router.push("/properties");
    } catch (error) {
      toast({ title: "Error", description: "Could not publish listing.", variant: "destructive" });
    } finally {
      setPublishing(false);
    }
  };

  if (isUserLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="container mx-auto px-4 pt-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-3xl font-bold font-headline mb-3 text-primary">List Your Property</h1>
            <p className="text-muted-foreground">Get an AI valuation and connect with investors instantly.</p>
          </header>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
              <TabsTrigger value="details" className="text-base">1. Property Details</TabsTrigger>
              <TabsTrigger value="ai-valuation" className="text-base">2. AI Valuation Tool</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="address">Full Property Address</Label>
                    <Input id="address" name="address" placeholder="123 Main St, Anytown, ST 12345" value={formData.address} onChange={handleInputChange} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Property Type</Label>
                      <Select value={formData.propertyType} onValueChange={(val) => setFormData(prev => ({...prev, propertyType: val}))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">Single Family House</SelectItem>
                          <SelectItem value="condo">Condo / Apartment</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Year Built</Label>
                      <Input name="yearBuilt" type="number" value={formData.yearBuilt} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Sq. Footage</Label>
                      <Input name="squareFootage" type="number" value={formData.squareFootage} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label>Bedrooms</Label>
                      <Input name="numberOfBedrooms" type="number" value={formData.numberOfBedrooms} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label>Bathrooms</Label>
                      <Input name="numberOfBathrooms" type="number" value={formData.numberOfBathrooms} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Condition</Label>
                      <Select value={formData.condition} onValueChange={(val) => setFormData(prev => ({...prev, condition: val}))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Foreclosure Status</Label>
                      <Select value={formData.foreclosureStatus} onValueChange={(val) => setFormData(prev => ({...prev, foreclosureStatus: val}))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pre-foreclosure">Pre-foreclosure</SelectItem>
                          <SelectItem value="notice-of-default">Notice of Default</SelectItem>
                          <SelectItem value="auction-scheduled">Auction Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-6">
                   <Button size="lg" className="rounded-full px-8" onClick={handleValuation} disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <TrendingUp className="mr-2 h-4 w-4" />}
                    Get AI Valuation
                   </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="ai-valuation">
              {!valuation ? (
                <Card className="p-12 text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary/40" />
                  <h3 className="text-xl font-bold mb-2">No Valuation Generated</h3>
                  <Button variant="outline" asChild><Link href="#details">Fill Details First</Link></Button>
                </Card>
              ) : (
                <div className="space-y-6">
                  <Card className="border-accent/40 bg-accent/5 p-10 text-center">
                    <h3 className="text-muted-foreground font-medium mb-2 uppercase tracking-wider text-sm">Estimated Quick-Sale Value</h3>
                    <div className="text-6xl font-bold text-primary flex items-center justify-center">
                      <DollarSign className="h-12 w-12" />
                      {valuation.estimatedValue.toLocaleString()}
                    </div>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>Valuation Analysis</CardTitle></CardHeader>
                    <CardContent><p className="text-sm leading-relaxed text-muted-foreground">{valuation.valuationExplanation}</p></CardContent>
                    <CardFooter>
                      <Button className="w-full h-12 rounded-full" onClick={handlePublish} disabled={publishing}>
                        {publishing ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Publish to Investor Network"}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}