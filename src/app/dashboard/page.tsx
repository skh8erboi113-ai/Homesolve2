"use client";

import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Home, ArrowUpRight, MessageSquare, List, DollarSign, TrendingUp, Loader2, CheckCircle2, CreditCard } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { useCollection, useFirestore, useMemoFirebase, useUser } from "@/firebase";
import { collection, query, where, orderBy, limit } from "firebase/firestore";

const COMMISSION_DATA = [
  { month: "Jan", earnings: 2400 },
  { month: "Feb", earnings: 1800 },
  { month: "Mar", earnings: 3200 },
  { month: "Apr", earnings: 4500 },
  { month: "May", earnings: 2800 },
  { month: "Jun", earnings: 4250 },
];

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();

  const userListingsQuery = useMemoFirebase(() => {
    if (!user || !db) return null;
    return query(
      collection(db, "public_property_listings"),
      where("homeownerId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
  }, [db, user]);

  const { data: listings, isLoading: loadingListings } = useCollection(userListingsQuery);

  const receivedOffersQuery = useMemoFirebase(() => {
    if (!user || !db) return null;
    return query(
      collection(db, "offers"),
      where("receivingUserId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(5)
    );
  }, [db, user]);

  const { data: recentOffers, isLoading: loadingOffers } = useCollection(receivedOffersQuery);

  if (isUserLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view your dashboard</h2>
          <Button asChild><Link href="/auth">Sign In</Link></Button>
        </main>
      </div>
    );
  }

  const activeListingsCount = listings?.length || 0;
  const pendingOffersCount = recentOffers?.length || 0;

  const STATS = [
    { label: "Your Listings", value: activeListingsCount.toString(), icon: List, color: "text-blue-500" },
    { label: "New Offers", value: pendingOffersCount.toString(), icon: ArrowUpRight, color: "text-accent" },
    { label: "Conversations", value: "Real-time", icon: MessageSquare, color: "text-primary" },
    { label: "Est. Savings", value: "$4,250", icon: DollarSign, color: "text-green-600" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <header className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-headline text-primary">Nationwide Dashboard</h1>
            <p className="text-muted-foreground">Managing your property portfolio at lethomesolveit.com.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild className="rounded-full px-6">
              <Link href="/messages">Messages</Link>
            </Button>
            <Button asChild className="rounded-full px-6 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/list-property">
                <Home className="mr-2 h-4 w-4" /> New Listing
              </Link>
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {STATS.map((stat, i) => (
            <Card key={i} className="border-none shadow-sm">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl bg-gray-100 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-8">
              <div>
                <CardTitle>Market Activity</CardTitle>
                <CardDescription>Estimated equity preservation trends across all markets.</CardDescription>
              </div>
              <Badge variant="outline" className="h-8 px-3 rounded-full border-accent text-accent">
                <TrendingUp className="h-3 w-3 mr-1" /> AI Insights Active
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={COMMISSION_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} tickFormatter={(value) => `$${value}`} />
                    <Tooltip cursor={{fill: '#F1F5F9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                    <Bar dataKey="earnings" radius={[4, 4, 0, 0]} barSize={40}>
                      {COMMISSION_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === COMMISSION_DATA.length - 1 ? '#2EE69D' : '#1F9BA6'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-sm border-primary/20 bg-primary/5">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center mb-1">
                  <CardTitle className="text-lg">AI Power User</CardTitle>
                  <Badge className="bg-primary text-primary-foreground">Verified</Badge>
                </div>
                <CardDescription>Nationwide access enabled</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span>Valuation Usage</span>
                    <span>{activeListingsCount} / 50</span>
                  </div>
                  <Progress value={(activeListingsCount / 50) * 100} className="h-1.5" />
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="outline" className="w-full text-xs h-9 rounded-full bg-white" asChild>
                  <Link href="/pricing">
                    <CreditCard className="mr-2 h-3.5 w-3.5" /> Plan Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
           <Card className="lg:col-span-2 shadow-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Real-time updates on your listings and offers.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {loadingOffers || loadingListings ? (
                  <div className="p-8 text-center"><Loader2 className="animate-spin h-6 w-6 mx-auto" /></div>
                ) : (recentOffers?.length === 0 && listings?.length === 0) ? (
                  <div className="p-8 text-center text-muted-foreground text-sm">No recent activity.</div>
                ) : (
                  <>
                    {recentOffers?.map((offer) => (
                      <div key={offer.id} className="p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                        <div className="h-10 w-10 rounded-full shrink-0 flex items-center justify-center bg-accent/10 text-accent">
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm leading-tight font-bold text-primary">
                            New offer of ${offer.offerAmount?.toLocaleString()} received!
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Status: {offer.status}</p>
                        </div>
                        <Button size="sm" variant="ghost" asChild><Link href={`/properties/${offer.propertyListingId}`}>View</Link></Button>
                      </div>
                    ))}
                    {listings?.map((listing) => (
                      <div key={listing.id} className="p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                        <div className="h-10 w-10 rounded-full shrink-0 flex items-center justify-center bg-primary/10 text-primary">
                          <Home className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm leading-tight text-muted-foreground">
                            Listing "{listing.addressStreet}" is {listing.status}.
                          </p>
                        </div>
                        <Button size="sm" variant="ghost" asChild><Link href={`/properties/${listing.id}`}>Manage</Link></Button>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-xl font-bold font-headline mb-6 text-primary flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" /> Closing Status
            </h2>
            <Card className="border-l-4 border-l-primary shadow-sm">
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-1">{activeListingsCount} Total Listings</h4>
                <p className="text-sm text-muted-foreground">Properties currently active nationwide.</p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
