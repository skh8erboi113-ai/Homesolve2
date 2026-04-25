"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Home, ArrowUpRight, MessageSquare, List, DollarSign, TrendingUp, Loader2, CheckCircle2, CreditCard, History, Building2, PieChart } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { useCollection, useFirestore, useMemoFirebase, useUser } from "@/firebase";
import { collection, query, where, orderBy, limit } from "firebase/firestore";
import { format } from "date-fns";

const CHART_DATA = [
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
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

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

  const transactionsQuery = useMemoFirebase(() => {
    if (!user || !db) return null;
    return query(
      collection(db, "transactions"),
      where("homeownerId", "==", user.uid),
      orderBy("saleDate", "desc"),
      limit(10)
    );
  }, [db, user]);

  const { data: transactions, isLoading: loadingTransactions } = useCollection(transactionsQuery);

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
  const transactionTotal = transactions?.reduce((acc, curr) => acc + (curr.finalSalePrice || 0), 0) || 0;
  const projectedCommission = transactionTotal * 0.015; // 1.5% platform fee

  const STATS = [
    { label: "Your Listings", value: activeListingsCount.toString(), icon: List, color: "text-blue-500" },
    { label: "New Offers", value: pendingOffersCount.toString(), icon: ArrowUpRight, color: "text-accent" },
    { label: "Platform Earnings", value: `$${projectedCommission.toLocaleString()}`, icon: PieChart, color: "text-primary" },
    { label: "Closed Equity", value: `$${transactionTotal.toLocaleString()}`, icon: DollarSign, color: "text-green-600" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <header className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-headline text-primary">Nationwide Dashboard</h1>
            <p className="text-muted-foreground">Managing your property portfolio and transaction settlements.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild className="rounded-full px-6">
              <Link href="/messages">Messages</Link>
            </Button>
            <Button asChild className="rounded-full px-6 bg-accent text-accent-foreground">
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Market Activity</CardTitle>
                <CardDescription>Equity preservation trends across the platform.</CardDescription>
              </div>
              <Badge variant="outline" className="border-accent text-accent">
                <TrendingUp className="h-3 w-3 mr-1" /> AI Active
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {hasMounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={CHART_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                      <Tooltip />
                      <Bar dataKey="earnings" radius={[4, 4, 0, 0]} barSize={40}>
                        {CHART_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === CHART_DATA.length - 1 ? '#2EE69D' : '#1F9BA6'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full bg-muted animate-pulse rounded-md" />
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-sm bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">AI Power User</CardTitle>
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
                <Button variant="outline" className="w-full h-9 rounded-full bg-white" asChild>
                  <Link href="/pricing">Plan Details</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-l-4 border-l-accent">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <History className="h-4 w-4 text-accent" /> Platform Fees (1.5%)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${projectedCommission.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Projected revenue from successful settlements.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
           <Card className="lg:col-span-2 shadow-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
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
                        <DollarSign className="h-5 w-5 text-accent" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate">New offer of ${offer.offerAmount?.toLocaleString()} received!</p>
                          <p className="text-xs text-muted-foreground mt-1">Status: {offer.status}</p>
                        </div>
                        <Button size="sm" variant="ghost" asChild><Link href={`/properties/${offer.propertyListingId}`}>View</Link></Button>
                      </div>
                    ))}
                    {listings?.map((listing) => (
                      <div key={listing.id} className="p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                        <Home className="h-5 w-5 text-primary" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">Listing "{listing.addressStreet}" is {listing.status}.</p>
                        </div>
                        <Button size="sm" variant="ghost" asChild><Link href={`/properties/${listing.id}`}>Manage</Link></Button>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" /> Transaction History
              </CardTitle>
              <CardDescription>Verified cash transactions.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {loadingTransactions ? (
                  <div className="p-4 text-center"><Loader2 className="animate-spin h-4 w-4 mx-auto" /></div>
                ) : transactions?.length === 0 ? (
                  <div className="p-6 text-center text-xs text-muted-foreground">No transactions recorded yet.</div>
                ) : (
                  transactions?.map((tx) => (
                    <div key={tx.id} className="p-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm text-green-600">+${tx.finalSalePrice?.toLocaleString()}</span>
                        <Badge variant="outline" className="text-[10px] h-4">SOLD</Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        {tx.saleDate ? format(new Date(tx.saleDate.seconds * 1000), "MMM d, yyyy") : "Processing..."}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}