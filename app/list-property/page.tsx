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
    setFormData(prev => ({ ...prev, [name]: name === "squareFootage" || name === "numberOfBedrooms" || name === "numberOfBathrooms" || name === "yearBuilt" ? Number(value) : value }));
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
      toast({
        title: "Sign In Required",
        description: "Please sign in to publish your listing.",
        variant: "destructive"
      });
      router.push("/auth");
      return;
    }

    if (!valuation) return;

    setPublishing(true);
    try {
      const publicListingsRef = collection(db, "public_property_listings");
      const listingData = {
        homeownerId: user.uid,
        title: `${formData.numberOfBedrooms} Bed ${formData.propertyType} in ${formData.address.split(',')[1]?.trim() || 'Your Area'}`,
        description: `Motivated sale. AI Estimated value is based on current condition and foreclosure status. ${formData.specialFeatures}`,
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

      addDocumentNonBlocking(publicListingsRef, listingData);
      
      toast({
        title: "Listing Published!",
        description: "Your property is now visible to our investor network.",
      });
      router.push("/properties");
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not publish listing. Please try again.",
        variant: "destructive"
      });
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
            <p className="text-muted-foreground">Provide details about your home to get an AI valuation and connect with investors.</p>
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
                  <CardDescription>All fields are required for an accurate AI estimate.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="address">Full Property Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      placeholder="123 Main St, Anytown, ST 12345" 
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="propertyType">Property Type</Label>
                      <Select 
                        value={formData.propertyType} 
                        onValueChange={(val) => setFormData(prev => ({...prev, propertyType: val}))}
                      >
                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">Single Family House</SelectItem>
                          <SelectItem value="condo">Condo / Apartment</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="multi-family">Multi-family Home</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yearBuilt">Year Built</Label>
                      <Input 
                        id="yearBuilt" 
                        name="yearBuilt" 
                        type="number" 
                        value={formData.yearBuilt}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="squareFootage">Sq. Footage</Label>
                      <Input 
                        id="squareFootage" 
                        name="squareFootage" 
                        type="number" 
                        value={formData.squareFootage}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numberOfBedrooms">Bedrooms</Label>
                      <Input 
                        id="numberOfBedrooms" 
                        name="numberOfBedrooms" 
                        type="number" 
                        value={formData.numberOfBedrooms}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numberOfBathrooms">Bathrooms</Label>
                      <Input 
                        id="numberOfBathrooms" 
                        name="numberOfBathrooms" 
                        type="number" 
                        value={formData.numberOfBathrooms}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="condition">Property Condition</Label>
                      <Select 
                        value={formData.condition} 
                        onValueChange={(val) => setFormData(prev => ({...prev, condition: val}))}
                      >
                        <SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent - Recently renovated</SelectItem>
                          <SelectItem value="good">Good - Well maintained</SelectItem>
                          <SelectItem value="fair">Fair - Needs minor repairs</SelectItem>
                          <SelectItem value="poor">Poor - Needs major work</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="foreclosureStatus">Foreclosure Status</Label>
                      <Select 
                        value={formData.foreclosureStatus} 
                        onValueChange={(val) => setFormData(prev => ({...prev, foreclosureStatus: val}))}
                      >
                        <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pre-foreclosure">Pre-foreclosure</SelectItem>
                          <SelectItem value="notice-of-default">Notice of Default</SelectItem>
                          <SelectItem value="auction-scheduled">Auction Scheduled</SelectItem>
                          <SelectItem value="late-payments">Behind on Payments</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency level</Label>
                    <Select 
                      value={formData.urgency} 
                      onValueChange={(val) => setFormData(prev => ({...prev, urgency: val}))}
                    >
                      <SelectTrigger><SelectValue placeholder="Select urgency" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="very urgent">Very Urgent - Needed sale yesterday</SelectItem>
                        <SelectItem value="somewhat urgent">Somewhat Urgent - Within 30 days</SelectItem>
                        <SelectItem value="flexible">Flexible - Just exploring options</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialFeatures">Special Features / Additional Notes</Label>
                    <Textarea 
                      id="specialFeatures" 
                      name="specialFeatures" 
                      placeholder="e.g., New roof 2023, finished basement, large backyard pool..."
                      className="min-h-[100px]"
                      value={formData.specialFeatures}
                      onChange={handleInputChange}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t pt-6">
                   <p className="text-xs text-muted-foreground max-w-sm flex items-start gap-2">
                    <Info className="h-4 w-4 shrink-0 mt-0.5" />
                    All property listings on HomeSolve are shared with our verified buyer network only.
                   </p>
                   <Button size="lg" className="rounded-full px-8" onClick={handleValuation} disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <TrendingUp className="mr-2 h-4 w-4" />}
                    Get AI Valuation
                   </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="ai-valuation">
              {!valuation ? (
                <Card className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No Valuation Generated</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm">Please fill out your property details and click "Get AI Valuation" to see your estimate.</p>
                  <Button variant="outline" asChild><Link href="#details">Return to Details</Link></Button>
                </Card>
              ) : (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                  <Card className="border-accent/40 bg-accent/5 overflow-hidden">
                    <div className="p-6 md:p-10 text-center relative">
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-white border-accent">AI Estimate</Badge>
                      </div>
                      <h3 className="text-muted-foreground font-medium mb-2 uppercase tracking-wider text-sm">Estimated Quick-Sale Value</h3>
                      <div className="text-5xl md:text-7xl font-bold text-primary flex items-center justify-center">
                        <DollarSign className="h-10 w-10 md:h-16 md:w-16 -mr-2" />
                        {valuation.estimatedValue.toLocaleString()}
                      </div>
                      <p className="text-muted-foreground mt-4 max-w-md mx-auto italic text-sm">
                        Calculated based on current market trends for {formData.propertyType}s in similar condition.
                      </p>
                    </div>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-accent" />
                          Valuation Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                          {valuation.valuationExplanation}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-primary/5 border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-sm font-semibold uppercase tracking-wider">Next Steps</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex gap-3">
                          <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs shrink-0">1</div>
                          <p className="text-sm">Finalize listing details</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs shrink-0">2</div>
                          <p className="text-sm">Publish to investor network</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs shrink-0">3</div>
                          <p className="text-sm">Receive cash offers</p>
                        </div>
                        <Button 
                          className="w-full mt-6 bg-primary rounded-full" 
                          onClick={handlePublish} 
                          disabled={publishing}
                        >
                          {publishing ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : "Publish Listing"}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-destructive/20 bg-destructive/5">
                    <CardContent className="pt-6 flex items-start gap-4">
                      <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-destructive">Valuation Disclaimer</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {valuation.disclaimer}
                        </p>
                      </div>
                    </CardContent>
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
