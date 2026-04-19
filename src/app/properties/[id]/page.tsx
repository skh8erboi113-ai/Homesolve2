
"use client";

import { use, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDoc, useFirestore, useMemoFirebase, useUser } from "@/firebase";
import { doc, collection, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { Loader2, MapPin, BedDouble, Bath, Square, TrendingDown, DollarSign, Calendar, ShieldCheck, User, MessageCircle, Share2, Sparkles, Copy } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { generateOutreach, OutreachOutput } from "@/ai/flows/generate-outreach-flow";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const db = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const [isStartingChat, setIsStartingChat] = useState(false);
  const [isGeneratingOutreach, setIsGeneratingOutreach] = useState(false);
  const [outreachResult, setOutreachResult] = useState<OutreachOutput | null>(null);
  const [targetPlatform, setTargetPlatform] = useState<any>("LinkedIn");

  const propertyRef = useMemoFirebase(() => {
    return doc(db, "public_property_listings", id);
  }, [db, id]);

  const { data: property, isLoading } = useDoc(propertyRef);

  const handleStartConversation = async () => {
    if (!user) {
      toast({ title: "Login Required", description: "Please sign in to message the homeowner.", variant: "destructive" });
      router.push("/auth");
      return;
    }

    if (user.uid === property?.homeownerId) {
      toast({ title: "Action Denied", description: "You cannot message yourself about your own listing.", variant: "destructive" });
      return;
    }

    setIsStartingChat(true);
    try {
      const convsRef = collection(db, "conversations");
      const q = query(
        convsRef, 
        where("participantIds", "array-contains", user.uid),
        where("propertyListingId", "==", id)
      );
      
      const existing = await getDocs(q);
      let conversationId = "";

      if (!existing.empty) {
        conversationId = existing.docs[0].id;
      } else {
        const newConvData = {
          propertyListingId: id,
          participantIds: [user.uid, property?.homeownerId],
          startedAt: serverTimestamp(),
          lastMessageAt: serverTimestamp(),
          subject: `Inquiry for ${property?.addressStreet}`,
        };
        const docRef = await addDocumentNonBlocking(convsRef, newConvData);
        conversationId = docRef?.id || "";
      }

      if (conversationId) {
        router.push(`/messages?id=${conversationId}`);
      }
    } catch (error) {
      toast({ title: "Error", description: "Could not start conversation.", variant: "destructive" });
    } finally {
      setIsStartingChat(false);
    }
  };

  const handleGenerateOutreach = async () => {
    if (!property) return;
    setIsGeneratingOutreach(true);
    try {
      const result = await generateOutreach({
        propertyAddress: property.addressStreet,
        askingPrice: property.askingPrice,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        foreclosureStatus: property.foreclosureStatus,
        targetPlatform: targetPlatform,
      });
      setOutreachResult(result);
    } catch (err) {
      toast({ title: "AI Error", description: "Failed to generate marketing content.", variant: "destructive" });
    } finally {
      setIsGeneratingOutreach(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Content copied to clipboard." });
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-12 w-12 text-primary" /></div>;
  if (!property) return <div className="min-h-screen flex items-center justify-center">Property not found.</div>;

  const isOwner = user?.uid === property.homeownerId;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video rounded-3xl overflow-hidden border shadow-lg">
              <Image 
                src={PlaceHolderImages.find(img => img.id.includes("house-listing"))?.imageUrl || "https://picsum.photos/seed/details/1200/800"} 
                alt={property.title} 
                fill 
                className="object-cover"
              />
              <div className="absolute top-6 left-6 flex gap-3">
                <Badge className="bg-primary text-white text-md px-4 py-1">{property.foreclosureStatus}</Badge>
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-md px-4 py-1">Active Listing</Badge>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold font-headline">{property.addressStreet}</h1>
                <div className="flex items-center text-muted-foreground gap-4">
                  <div className="flex items-center gap-1"><MapPin className="h-4 w-4 text-accent" /> {property.addressCity}, {property.addressState} {property.addressZip}</div>
                  <div className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Built in {property.yearBuilt}</div>
                </div>
              </div>

              {isOwner && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/5 h-12 px-6">
                      <Sparkles className="mr-2 h-4 w-4" /> AI Marketing Kit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>AI Outreach Generator</DialogTitle>
                      <DialogDescription>
                        Generate high-converting social media posts and messages for this property.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div className="flex items-center gap-4">
                        <Select value={targetPlatform} onValueChange={setTargetPlatform}>
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select Platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="LinkedIn">LinkedIn (Professional)</SelectItem>
                            <SelectItem value="Facebook">Facebook (Community)</SelectItem>
                            <SelectItem value="Twitter">Twitter (Short/Viral)</SelectItem>
                            <SelectItem value="Direct Message">Direct Message (Private)</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button onClick={handleGenerateOutreach} disabled={isGeneratingOutreach} className="flex-1 rounded-full">
                          {isGeneratingOutreach ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Sparkles className="mr-2 h-4 w-4" />}
                          Generate Post
                        </Button>
                      </div>

                      {outreachResult && (
                        <Card className="bg-muted/30 border-dashed">
                          <CardContent className="pt-6 space-y-4">
                            <div>
                              <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">Headline</h4>
                              <p className="font-bold text-lg">{outreachResult.headline}</p>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">Body Text</h4>
                              <p className="text-sm whitespace-pre-wrap leading-relaxed">{outreachResult.body}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {outreachResult.hashtags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                              ))}
                            </div>
                            <Button className="w-full mt-4" variant="outline" onClick={() => copyToClipboard(`${outreachResult.headline}\n\n${outreachResult.body}\n\n${outreachResult.hashtags.join(' ')}`)}>
                              <Copy className="mr-2 h-4 w-4" /> Copy Content
                            </Button>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="grid grid-cols-3 gap-6 p-6 bg-white rounded-2xl border shadow-sm">
               <div className="text-center">
                 <BedDouble className="h-6 w-6 mx-auto mb-2 text-primary" />
                 <div className="font-bold text-xl">{property.bedrooms}</div>
                 <div className="text-sm text-muted-foreground">Bedrooms</div>
               </div>
               <div className="text-center border-x">
                 <Bath className="h-6 w-6 mx-auto mb-2 text-primary" />
                 <div className="font-bold text-xl">{property.bathrooms}</div>
                 <div className="text-sm text-muted-foreground">Bathrooms</div>
               </div>
               <div className="text-center">
                 <Square className="h-6 w-6 mx-auto mb-2 text-primary" />
                 <div className="font-bold text-xl">{property.squareFootage}</div>
                 <div className="text-sm text-muted-foreground">Sq. Feet</div>
               </div>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-headline">Property Description</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {property.description}
              </p>
            </section>

            <Card className="border-accent/30 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <ShieldCheck className="h-6 w-6" /> AI-Driven Opportunity Analysis
                </CardTitle>
                <CardDescription>Generated by HomeSolve AI based on market data and condition reports.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex justify-between items-center p-4 bg-white rounded-xl border">
                    <span className="font-medium">AI Estimated Value</span>
                    <span className="text-2xl font-bold text-primary">${property.aiQuickSaleValuation?.toLocaleString()}</span>
                 </div>
                 <p className="text-sm text-muted-foreground italic">
                   This valuation accounts for the current {property.foreclosureStatus} status and target quick-sale timelines common in this zip code.
                 </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-xl border-2 border-primary/20 sticky top-24">
              <CardHeader>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">Asking Price</div>
                <div className="text-4xl font-bold text-primary flex items-center">
                  <DollarSign className="h-8 w-8 -ml-1" />
                  {property.askingPrice?.toLocaleString()}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Listing Type</span>
                    <span className="font-medium">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="outline" className="text-accent border-accent">{property.status}</Badge>
                  </div>
                </div>

                <div className="pt-6 border-t space-y-3">
                  <Button className="w-full h-12 rounded-full text-lg" onClick={() => toast({ title: "Feature coming soon", description: "Offer submittal is being finalized." })}>
                    Submit Cash Offer
                  </Button>
                  <Button variant="outline" className="w-full h-12 rounded-full" onClick={handleStartConversation} disabled={isStartingChat}>
                    {isStartingChat ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <MessageCircle className="mr-2 h-4 w-4" />}
                    Message Homeowner
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 p-4">
                 <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                     <User className="h-6 w-6" />
                   </div>
                   <div className="text-sm">
                     <p className="font-bold">Listing Verified</p>
                     <p className="text-xs text-muted-foreground">Homeowner ID: {property.homeownerId.substring(0, 8)}...</p>
                   </div>
                 </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
