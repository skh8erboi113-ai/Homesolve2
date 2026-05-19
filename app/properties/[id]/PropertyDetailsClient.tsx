"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Bed,
  Bath,
  Square,
  Calendar,
  MapPin,
  Share2,
  MessageCircle,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Loader2,
  CheckCircle2,
  Info,
  Gavel,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Zap
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useUser, useFirestore, db } from "@/firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useDoc } from "@/firebase/firestore/use-doc";
import { useCollection } from "@/firebase/firestore/use-collection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share } from "@capacitor/share";

// Removed direct server action import to avoid client-side bundling issues in static export
// import { generateOutreach, OutreachOutput } from "@/ai/flows/generate-outreach-flow";

export default function PropertyDetailsClient({ id }: { id: string }) {
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [isSubmittingOffer, setIsSubmittingOffer] = useState(false);
  const [isStartingChat, setIsStartingChat] = useState(false);
  const [isClosingDeal, setIsClosingDeal] = useState(false);
  const [isGeneratingOutreach, setIsGeneratingOutreach] = useState(false);
  const [outreachResult, setOutreachResult] = useState<any>(null);
  const [targetPlatform, setTargetPlatform] = useState<string>("Facebook");

  const { data: property, loading } = useDoc<any>("public_property_listings", id);
  const { data: receivedOffers, loading: loadingOffers } = useCollection<any>(
    "offers",
    user?.uid ? { where: [["propertyId", "==", id]] } : null
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Property Not Found</h1>
        <Button onClick={() => router.push("/properties")}>Back to Listings</Button>
      </div>
    );
  }

  const isOwner = user?.uid === property.homeownerId;

  const handleSubmitOffer = async () => {
    if (!user) {
      toast({ title: "Sign In Required", description: "You must be signed in to submit an offer.", variant: "destructive" });
      router.push("/auth");
      return;
    }

    if (!offerAmount || isNaN(Number(offerAmount))) {
      toast({ title: "Invalid Amount", description: "Please enter a valid offer amount.", variant: "destructive" });
      return;
    }

    setIsSubmittingOffer(true);
    try {
      await addDoc(collection(db, "offers"), {
        propertyId: id,
        homeownerId: property.homeownerId,
        proposingUserId: user.uid,
        offerAmount: Number(offerAmount),
        status: "pending",
        createdAt: serverTimestamp(),
      });

      toast({ title: "Offer Submitted!", description: "The homeowner has been notified." });
      setIsOfferDialogOpen(false);
      setOfferAmount("");
    } catch (err) {
      toast({ title: "Error", description: "Failed to submit offer. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmittingOffer(false);
    }
  };

  const handleStartConversation = async () => {
    if (!user) {
      router.push("/auth");
      return;
    }

    setIsStartingChat(true);
    try {
      // Find existing chat or create new one
      const chatRef = collection(db, "chats");
      const newChat = await addDoc(chatRef, {
        participants: [user.uid, property.homeownerId],
        propertyId: id,
        lastMessage: "Interested in your property at " + property.addressStreet,
        lastMessageAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      router.push(`/messages?id=${newChat.id}`);
    } catch (err) {
      toast({ title: "Error", description: "Could not start conversation.", variant: "destructive" });
    } finally {
      setIsStartingChat(false);
    }
  };

  const handleAcceptOffer = async (offer: any) => {
    setIsClosingDeal(true);
    try {
      // 1. Update offer status
      await updateDoc(doc(db, "offers", offer.id), { status: "accepted" });

      // 2. Mark property as sold
      await updateDoc(doc(db, "public_property_listings", id), {
        status: "sold",
        soldPrice: offer.offerAmount,
        closedAt: serverTimestamp()
      });

      toast({
        title: "Deal Closed!",
        description: "Congratulations! The property has been marked as sold.",
        className: "bg-green-600 text-white"
      });
    } catch (err) {
      toast({ title: "Error", description: "Failed to close the deal.", variant: "destructive" });
    } finally {
      setIsClosingDeal(false);
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/properties/${id}?ref=${user?.uid || ''}`;

    try {
      if (typeof window !== 'undefined' && (window as any).Capacitor) {
        await Share.share({
          title: property.title,
          text: `Check out this property on EquityArc: ${property.addressStreet}`,
          url: shareUrl,
          dialogTitle: 'Share Property',
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link Copied",
          description: "Viral sharing text and link copied to clipboard.",
          className: "bg-primary text-white border-none",
        });
      }
    } catch (err) {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied",
        description: "Viral sharing text and link copied to clipboard.",
        className: "bg-primary text-white border-none",
      });
    }
  };

  const handleGenerateOutreach = async () => {
    if (!property) return;
    setIsGeneratingOutreach(true);
    try {
      const response = await fetch('/api/ai/outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyAddress: property.addressStreet,
          askingPrice: property.askingPrice,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          foreclosureStatus: property.foreclosureStatus,
          targetPlatform: targetPlatform,
        })
      });
      const result = await response.json();
      setOutreachResult(result);
    } catch (err) {
      toast({ title: "AI Error", description: "Failed to generate marketing content.", variant: "destructive" });
    } finally {
      setIsGeneratingOutreach(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <header>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                <span className="hover:text-primary cursor-pointer" onClick={() => router.push('/properties')}>Properties</span>
                <ChevronRight className="h-4 w-4" />
                <span className="font-medium text-foreground truncate">{property.addressStreet}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4">{property.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {property.addressStreet}, {property.addressCity}, {property.addressState} {property.addressZip}</div>
                <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Built in {property.yearBuilt}</div>
              </div>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                <Bed className="h-6 w-6 text-primary" />
                <div className="text-xl font-bold">{property.bedrooms}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Beds</div>
              </Card>
              <Card className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                <Bath className="h-6 w-6 text-primary" />
                <div className="text-xl font-bold">{property.bathrooms}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Baths</div>
              </Card>
              <Card className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                <Square className="h-6 w-6 text-primary" />
                <div className="text-xl font-bold">{property.squareFootage.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Sq Ft</div>
              </Card>
              <Card className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <div className="text-sm font-bold uppercase text-accent">{property.foreclosureStatus}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Status</div>
              </Card>
            </div>

            <section>
              <h2 className="text-2xl font-bold font-headline mb-4">Location</h2>
              <div className="rounded-2xl overflow-hidden h-[300px] border shadow-inner relative bg-muted">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps?q=${encodeURIComponent(property.addressStreet + ' ' + property.addressCity)}&output=embed`}
                />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-headline mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {property.description}
              </p>
            </section>

            {isOwner && (
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold font-headline">Offers Received</h2>
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent">{receivedOffers?.length || 0} Total</Badge>
                </div>

                {loadingOffers ? (
                  <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>
                ) : receivedOffers?.length === 0 ? (
                  <Card className="border-dashed p-12 text-center text-muted-foreground">
                    <DollarSign className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    No offers received yet.
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {receivedOffers?.map((offer) => (
                      <Card key={offer.id} className={`border-2 ${offer.status === 'accepted' ? 'border-green-500' : 'border-border'}`}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="text-2xl font-bold text-primary">${offer.offerAmount?.toLocaleString()}</div>
                            <Badge variant={offer.status === 'accepted' ? 'default' : 'outline'}>{offer.status}</Badge>
                          </div>
                          <CardDescription>Submitted by Investor ID: {offer.proposingUserId.substring(0,6)}</CardDescription>
                        </CardHeader>
                        <CardFooter className="pt-4 flex gap-2">
                          {offer.status === 'pending' && property.status === 'active' && (
                            <Button
                              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                              disabled={isClosingDeal}
                              onClick={() => handleAcceptOffer(offer)}
                            >
                              {isClosingDeal ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
                              Accept & Close
                            </Button>
                          )}
                          <Button variant="outline" className="flex-1" asChild>
                            <a href={`/messages?id=new`}>Message Buyer</a>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </section>
            )}

            <Card className="border-accent/30 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <ShieldCheck className="h-6 w-6" /> AI-Driven Opportunity Analysis
                </CardTitle>
                <CardDescription>Generated by EquityArc AI based on local market data and foreclosure timelines.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex justify-between items-center p-4 bg-white rounded-xl border">
                    <span className="font-medium text-sm">AI Estimated Value</span>
                    <span className="text-2xl font-bold text-primary">${property.aiQuickSaleValuation?.toLocaleString()}</span>
                 </div>
                 <p className="text-xs text-muted-foreground leading-relaxed italic">
                   This valuation is a real-time estimate optimized for a 21-day closing window. It factors in current foreclosure risk and distressed asset demand in {property.addressCity}.
                 </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-xl border-2 border-primary/20 sticky top-24">
              <CardHeader>
                <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">Asking Price</div>
                <div className="text-4xl font-bold text-primary flex items-center">
                  <DollarSign className="h-8 w-8 -ml-1 text-primary/50" />
                  {property.askingPrice?.toLocaleString()}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Home Type</span>
                    <span className="font-semibold">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant={property.status === 'sold' ? 'destructive' : 'outline'} className="text-accent border-accent bg-accent/5">
                      {property.status}
                    </Badge>
                  </div>
                </div>

                <div className="pt-6 border-t space-y-3">
                  {property.status === 'active' ? (
                    <>
                      <Dialog open={isOfferDialogOpen} onOpenChange={setIsOfferDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full h-12 rounded-full text-lg shadow-lg" disabled={isOwner}>
                            {isOwner ? "Your Listing" : "Submit Cash Offer"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Submit a Cash Offer</DialogTitle>
                            <DialogDescription>
                              Make a direct offer for {property.addressStreet}. The homeowner will be notified immediately.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="offerAmount">Offer Amount (USD)</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="offerAmount"
                                  type="number"
                                  className="pl-9 h-12 text-lg font-bold"
                                  placeholder="e.g. 250000"
                                  value={offerAmount}
                                  onChange={(e) => setOfferAmount(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="p-4 bg-muted rounded-xl flex items-start gap-3">
                              <Gavel className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                By submitting this offer, you represent that you have the proof of funds necessary for a cash transaction. Closing is targeted for 14-21 business days.
                              </p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsOfferDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleSubmitOffer} disabled={isSubmittingOffer}>
                              {isSubmittingOffer ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                              Send Final Offer
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" className="w-full h-12 rounded-full" onClick={handleStartConversation} disabled={isStartingChat || isOwner}>
                        {isStartingChat ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <MessageCircle className="mr-2 h-4 w-4" />}
                        Message Homeowner
                      </Button>
                    </>
                  ) : (
                    <div className="p-6 text-center space-y-4 bg-muted/50 rounded-2xl border border-dashed">
                      <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                      <h3 className="font-bold text-xl uppercase">SOLD</h3>
                      <p className="text-xs text-muted-foreground">This transaction is finalized and closed on the EquityArc platform.</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 p-4 border-t">
                 <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                     <ShieldCheck className="h-6 w-6" />
                   </div>
                   <div className="text-xs">
                     <p className="font-bold">Verified Listing</p>
                     <p className="text-muted-foreground">ID: {property.id.substring(0, 8)}</p>
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
